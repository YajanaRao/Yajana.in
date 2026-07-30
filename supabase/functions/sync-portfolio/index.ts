import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

const SPREADSHEET_ID = "18BvOiF0X3OmXlGeoFJD7frHSKtXXULB3UX-tqxGgsX4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

function base64url(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function createSignedJwt(serviceAccount: {
  client_email: string;
  private_key: string;
}): Promise<string> {
  const header = base64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  );

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: serviceAccount.client_email,
    scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const payload = base64url(new TextEncoder().encode(JSON.stringify(claims)));
  const signingInput = `${header}.${payload}`;

  const pemBody = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");
  const keyBuffer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      new TextEncoder().encode(signingInput)
    )
  );

  return `${signingInput}.${base64url(signature)}`;
}

async function getAccessToken(serviceAccount: {
  client_email: string;
  private_key: string;
}): Promise<string> {
  const jwt = await createSignedJwt(serviceAccount);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${err}`);
  }

  const { access_token } = await res.json();
  return access_token;
}

// --- Sheets helpers ---

async function fetchSheet(
  accessToken: string,
  sheetName: string
): Promise<unknown[][]> {
  const range = encodeURIComponent(`'${sheetName}'`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueRenderOption=UNFORMATTED_VALUE`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets API error for "${sheetName}": ${err}`);
  }

  const { values } = await res.json();
  return values ?? [];
}

function parseNumber(val: unknown): number {
  if (val === null || val === undefined || val === "") return 0;
  if (typeof val === "number") return val;
  // Strip currency symbols (₹), commas, whitespace
  return Number(String(val).replace(/[₹,\s]/g, "")) || 0;
}

// --- Read Portfolio tab ---
// Format: Investment Type | Invested Amount | Current Amount | Total Return | Total Return % | Platform
// Rows: Stocks - India, Stocks - US, ETFs - India, ETFs - US, Mutual Funds, Gold & Silver, Crypto, Emergency Fund, Savings account, Fixed Deposits, Total

interface AssetValues {
  invested: number;
  current: number;
}

// Canonical name mapping from sheet "Investment Type" → our DB column prefix
const ASSET_NAME_MAP: Record<string, string> = {
  "stocks - india": "stocks_india",
  "stocks - us": "stocks_us",
  "etfs - india": "etfs_india",
  "etfs - us": "etfs_us",
  "mutual funds": "mutual_funds",
  "gold & silver": "gold_silver",
  crypto: "crypto",
  "emergency fund": "emergency_fund",
  "savings account": "savings_account",
  "fixed deposits": "fixed_deposits",
};

function parsePortfolioTab(rows: unknown[][]): Record<string, AssetValues> {
  if (rows.length < 2) throw new Error("Portfolio tab is empty");

  const header = rows[0].map((h) => String(h).trim().toLowerCase());
  const colType = header.findIndex(
    (h) => h.includes("investment") || h.includes("type")
  );
  const colInvested = header.findIndex((h) => h.includes("invested"));
  const colCurrent = header.findIndex(
    (h) => h.includes("current") || h.includes("market")
  );

  if (colType < 0 || colInvested < 0 || colCurrent < 0) {
    throw new Error(
      `Could not find required columns in Portfolio tab. Headers: ${header.join(
        ", "
      )}`
    );
  }

  const assets: Record<string, AssetValues> = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rawName = String(row[colType] ?? "")
      .trim()
      .toLowerCase();
    if (!rawName || rawName === "total") continue;

    const key = ASSET_NAME_MAP[rawName];
    if (!key) {
      console.warn(
        `Unknown asset type in Portfolio tab: "${rawName}", skipping`
      );
      continue;
    }

    assets[key] = {
      invested: parseNumber(row[colInvested]),
      current: parseNumber(row[colCurrent]),
    };
  }

  return assets;
}

// --- Read Income tab ---
// Format: Month | Net Salary | Total | Extras | Gross Salary | Package
// We want the latest row's Net Salary

function parseIncomeTab(rows: unknown[][]): number {
  if (rows.length < 2) return 0;

  const header = rows[0].map((h) => String(h).trim().toLowerCase());
  const colMonth = header.findIndex((h) => h.includes("month"));
  const colNetSalary = header.findIndex(
    (h) => h.includes("net salary") || h.includes("net")
  );

  if (colNetSalary < 0) return 0;

  // Walk backwards, skip rows where "Month" is empty (totals row)
  for (let i = rows.length - 1; i >= 1; i--) {
    const monthVal = colMonth >= 0 ? rows[i][colMonth] : true;
    if (!monthVal && monthVal !== 0) continue; // skip totals row
    const val = parseNumber(rows[i][colNetSalary]);
    if (val > 0) return val;
  }

  return 0;
}

// --- CoinDCX API: fetch live crypto portfolio value in INR ---

interface CoinDCXBalance {
  currency: string;
  balance: number;
  locked_balance: number;
}

interface TickerEntry {
  market: string;
  last_price: string;
}

async function signCoinDCXPayload(
  body: Record<string, unknown>,
  apiSecret: string
): Promise<string> {
  const payload = JSON.stringify(body);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(apiSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function fetchCoinDCXBalances(
  apiKey: string,
  apiSecret: string
): Promise<CoinDCXBalance[]> {
  const body = { timestamp: Date.now() };
  const signature = await signCoinDCXPayload(body, apiSecret);

  const res = await fetch(
    "https://api.coindcx.com/exchange/v1/users/balances",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-APIKEY": apiKey,
        "X-AUTH-SIGNATURE": signature,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`CoinDCX balances API failed (${res.status}): ${err}`);
  }

  return await res.json();
}

async function fetchCoinDCXTicker(): Promise<TickerEntry[]> {
  const res = await fetch("https://api.coindcx.com/exchange/ticker");
  if (!res.ok) {
    throw new Error(`CoinDCX ticker API failed: ${res.status}`);
  }
  return await res.json();
}

/**
 * Fetches all non-zero balances from CoinDCX, prices them against INR
 * using the ticker, and returns the total portfolio value in INR.
 * Falls back to 0 on failure so the rest of the sync still works.
 */
async function fetchCoinDCXPortfolioINR(): Promise<number> {
  const apiKey = Deno.env.get("COINDCX_API_KEY");
  const apiSecret = Deno.env.get("COINDCX_API_SECRET");

  if (!apiKey || !apiSecret) {
    console.warn("CoinDCX API keys not set, skipping live crypto valuation");
    return 0;
  }

  try {
    const [balances, tickers] = await Promise.all([
      fetchCoinDCXBalances(apiKey, apiSecret),
      fetchCoinDCXTicker(),
    ]);

    // Build a lookup: market → last_price (e.g. "BTCINR" → 5500000)
    const priceMap = new Map<string, number>();
    for (const t of tickers) {
      priceMap.set(t.market, parseFloat(t.last_price));
    }

    let totalINR = 0;

    for (const b of balances) {
      const total = (b.balance ?? 0) + (b.locked_balance ?? 0);
      if (total <= 0) continue;

      const currency = b.currency.toUpperCase();

      // INR balance counts directly
      if (currency === "INR") {
        totalINR += total;
        continue;
      }

      // Try direct INR pair first (e.g. BTCINR)
      const inrMarket = `${currency}INR`;
      if (priceMap.has(inrMarket)) {
        totalINR += total * priceMap.get(inrMarket)!;
        continue;
      }

      // Fallback: price via USDT then convert USDT→INR
      const usdtMarket = `${currency}USDT`;
      const usdtToInr = priceMap.get("USDTINR") ?? 0;
      if (priceMap.has(usdtMarket) && usdtToInr > 0) {
        totalINR += total * priceMap.get(usdtMarket)! * usdtToInr;
        continue;
      }

      console.warn(
        `No INR or USDT pair found for ${currency}, skipping ${total} units`
      );
    }

    console.log(`CoinDCX portfolio value: ₹${totalINR.toFixed(2)}`);
    return totalINR;
  } catch (err) {
    console.error("CoinDCX fetch failed, falling back to sheet value:", err);
    return 0;
  }
}

// --- Fetch Nifty 50 value from Google Finance ---

async function fetchNifty50Value(): Promise<number> {
  try {
    const res = await fetch(
      "https://www.google.com/finance/quote/NIFTY_50:INDEXNSE",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioSync/1.0)",
        },
      }
    );
    const html = await res.text();
    const match = html.match(/data-last-price="([^"]+)"/);
    if (match) {
      return parseFloat(match[1]);
    }
    console.warn("Could not parse Nifty 50 value from Google Finance");
    return 0;
  } catch (err) {
    console.warn("Failed to fetch Nifty 50:", err);
    return 0;
  }
}

// --- Build snapshot ---

interface SnapshotRow {
  snapshot_date: string;
  // Granular asset columns
  inv_stocks_india: number;
  curr_stocks_india: number;
  inv_stocks_us: number;
  curr_stocks_us: number;
  inv_etfs_india: number;
  curr_etfs_india: number;
  inv_etfs_us: number;
  curr_etfs_us: number;
  // Aggregate stocks = stocks_india + stocks_us (backward compat)
  inv_stocks: number;
  curr_stocks: number;
  inv_mutual_funds: number;
  curr_mutual_funds: number;
  inv_gold_silver: number;
  curr_gold_silver: number;
  inv_crypto: number;
  curr_crypto: number;
  inv_emergency_fund: number;
  curr_emergency_fund: number;
  inv_savings_account: number;
  curr_savings_account: number;
  inv_fixed_deposits: number;
  curr_fixed_deposits: number;
  total_inv: number;
  total_val: number;
  new_inv: number;
  returns: number;
  growth_pct: number;
  inc_month: number;
  inc_year: number;
  save_rate_pct: number;
  nifty50_value: number;
  notes: string | null;
}

type PreviousSnapshot = Pick<
  SnapshotRow,
  | "total_inv"
  | "total_val"
  | "nifty50_value"
  | "curr_stocks_india"
  | "curr_stocks_us"
  | "curr_etfs_india"
  | "curr_etfs_us"
  | "curr_stocks"
  | "curr_mutual_funds"
  | "curr_gold_silver"
  | "curr_crypto"
  | "curr_emergency_fund"
  | "curr_savings_account"
  | "curr_fixed_deposits"
>;

function fillMissingCurrentValues(
  assets: Record<string, AssetValues>,
  previousSnapshot: PreviousSnapshot | null
): void {
  if (!previousSnapshot) return;

  const previousCurrents: Record<string, number> = {
    stocks_india: previousSnapshot.curr_stocks_india,
    stocks_us: previousSnapshot.curr_stocks_us,
    etfs_india: previousSnapshot.curr_etfs_india,
    etfs_us: previousSnapshot.curr_etfs_us,
    mutual_funds: previousSnapshot.curr_mutual_funds,
    gold_silver: previousSnapshot.curr_gold_silver,
    crypto: previousSnapshot.curr_crypto,
    emergency_fund: previousSnapshot.curr_emergency_fund,
    savings_account: previousSnapshot.curr_savings_account,
    fixed_deposits: previousSnapshot.curr_fixed_deposits,
  };

  for (const [assetKey, asset] of Object.entries(assets)) {
    const previousCurrent = previousCurrents[assetKey] ?? 0;

    // Sheets formulas can yield zero for missing quotes on weekends/holidays.
    if (asset.invested > 0 && asset.current === 0 && previousCurrent > 0) {
      asset.current = previousCurrent;
    }
  }
}

function buildSnapshot(
  assets: Record<string, AssetValues>,
  monthlyIncome: number,
  prevTotalInv: number,
  prevTotalVal: number,
  nifty50Value: number
): SnapshotRow {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const get = (key: string): AssetValues =>
    assets[key] ?? { invested: 0, current: 0 };

  const totalInv = Object.values(assets).reduce(
    (sum, a) => sum + a.invested,
    0
  );
  const totalVal = Object.values(assets).reduce((sum, a) => sum + a.current, 0);

  const newInv = totalInv - prevTotalInv;
  const returns = totalVal - prevTotalVal - newInv;
  const growthPct =
    prevTotalVal > 0 ? (totalVal - prevTotalVal) / prevTotalVal : 0;
  const saveRatePct = monthlyIncome > 0 ? newInv / monthlyIncome : 0;

  // Aggregate stocks = stocks_india + stocks_us
  const invStocks = get("stocks_india").invested + get("stocks_us").invested;
  const currStocks = get("stocks_india").current + get("stocks_us").current;

  return {
    snapshot_date: today,
    // Granular columns
    inv_stocks_india: get("stocks_india").invested,
    curr_stocks_india: get("stocks_india").current,
    inv_stocks_us: get("stocks_us").invested,
    curr_stocks_us: get("stocks_us").current,
    inv_etfs_india: get("etfs_india").invested,
    curr_etfs_india: get("etfs_india").current,
    inv_etfs_us: get("etfs_us").invested,
    curr_etfs_us: get("etfs_us").current,
    // Aggregate stocks for backward compatibility
    inv_stocks: invStocks,
    curr_stocks: currStocks,
    inv_mutual_funds: get("mutual_funds").invested,
    curr_mutual_funds: get("mutual_funds").current,
    inv_gold_silver: get("gold_silver").invested,
    curr_gold_silver: get("gold_silver").current,
    inv_crypto: get("crypto").invested,
    curr_crypto: get("crypto").current,
    inv_emergency_fund: get("emergency_fund").invested,
    curr_emergency_fund: get("emergency_fund").current,
    inv_savings_account: get("savings_account").invested,
    curr_savings_account: get("savings_account").current,
    inv_fixed_deposits: get("fixed_deposits").invested,
    curr_fixed_deposits: get("fixed_deposits").current,
    total_inv: totalInv,
    total_val: totalVal,
    new_inv: newInv,
    returns: returns,
    growth_pct: growthPct,
    inc_month: monthlyIncome,
    inc_year: monthlyIncome * 12,
    save_rate_pct: saveRatePct,
    nifty50_value: nifty50Value,
    notes: null,
  };
}

// --- Main handler ---

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed. Use POST.", { status: 405 });
    }

    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!serviceAccountJson) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env var is not set");
    }
    const serviceAccount = JSON.parse(serviceAccountJson);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Authenticate with Google
    const accessToken = await getAccessToken(serviceAccount);

    // 2. Fetch source sheets, Nifty 50, and CoinDCX balances in parallel
    const [portfolioRows, incomeRows, nifty50Value, coinDCXValueINR] =
      await Promise.all([
        fetchSheet(accessToken, "Portfolio"),
        fetchSheet(accessToken, "Income"),
        fetchNifty50Value(),
        fetchCoinDCXPortfolioINR(),
      ]);

    // 3. Parse source data
    const assets = parsePortfolioTab(portfolioRows);
    const monthlyIncome = parseIncomeTab(incomeRows);

    // Override crypto current value with live CoinDCX data when available
    if (coinDCXValueINR > 0 && assets["crypto"]) {
      assets["crypto"].current = coinDCXValueINR;
    }

    // 4. Get previous snapshot from Supabase for delta calculations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: prevRows } = await supabase
      .from("portfolio_snapshots")
      .select(
        "total_inv, total_val, nifty50_value, curr_stocks_india, curr_stocks_us, curr_etfs_india, curr_etfs_us, curr_stocks, curr_mutual_funds, curr_gold_silver, curr_crypto, curr_emergency_fund, curr_savings_account, curr_fixed_deposits"
      )
      .order("snapshot_date", { ascending: false })
      .limit(1);

    const previousSnapshot =
      (prevRows?.[0] as PreviousSnapshot | undefined) ?? null;
    const prevTotalInv = previousSnapshot?.total_inv ?? 0;
    const prevTotalVal = previousSnapshot?.total_val ?? 0;

    fillMissingCurrentValues(assets, previousSnapshot);

    // Carry forward last known Nifty 50 value when the scrape fails
    const effectiveNifty =
      nifty50Value > 0 ? nifty50Value : previousSnapshot?.nifty50_value ?? 0;

    // 5. Build and upsert snapshot
    const snapshot = buildSnapshot(
      assets,
      monthlyIncome,
      prevTotalInv,
      prevTotalVal,
      effectiveNifty
    );

    const { data, error } = await supabase
      .from("portfolio_snapshots")
      .upsert(snapshot, { onConflict: "snapshot_date" })
      .select("snapshot_date");

    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }

    return Response.json({
      message: `Snapshot saved for ${snapshot.snapshot_date}`,
      snapshot_date: data[0].snapshot_date,
      total_inv: snapshot.total_inv,
      total_val: snapshot.total_val,
      assets_found: Object.keys(assets),
      crypto_source: coinDCXValueINR > 0 ? "coindcx_live" : "google_sheet",
      crypto_value_inr:
        coinDCXValueINR > 0 ? coinDCXValueINR : assets["crypto"]?.current ?? 0,
    });
  } catch (err) {
    console.error("sync-portfolio error:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
});
