import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";

// --- Types ---

export interface Snapshot {
  snapshot_date: string;
  inv_stocks_india: number;
  curr_stocks_india: number;
  inv_stocks_us: number;
  curr_stocks_us: number;
  inv_etfs_india: number;
  curr_etfs_india: number;
  inv_etfs_us: number;
  curr_etfs_us: number;
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
}

// --- Helpers ---

const ASSET_COLORS: Record<string, string> = {
  "Stocks - India": "hsl(var(--chart-1))",
  "Stocks - US": "hsl(var(--chart-2))",
  "ETFs - India": "hsl(var(--chart-3))",
  "ETFs - US": "hsl(var(--chart-4))",
  "Mutual Funds": "hsl(var(--chart-5))",
  "Gold & Silver": "hsl(var(--chart-3))",
  Crypto: "hsl(var(--chart-4))",
  "Emergency Fund": "hsl(var(--chart-2))",
  Savings: "hsl(var(--chart-5))",
  "Fixed Deposits": "hsl(var(--chart-1))",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-card px-3 py-2">
      <p className="mb-1 text-xs text-muted-foreground">
        {label}
      </p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-sm font-medium text-card-foreground"
          style={{ color: entry.color }}
        >
          {entry.name}: {Number(entry.value).toFixed(1)}%
        </p>
      ))}
    </div>
  );
}

// --- Cumulative Returns vs Nifty 50 ---
// Shows portfolio % return and Nifty 50 % return since the first snapshot (rebased to 0%)

export function CumulativeReturnsChart({ data }: { data: Snapshot[] }) {
  if (data.length < 2) return null;

  const baseVal = data[0].total_val;
  const baseNifty = data[0].nifty50_value;

  // Build Nifty series with carry-forward for missing/zero values
  let lastKnownNifty = baseNifty;
  const chartData = data.map((s) => {
    const nifty = s.nifty50_value > 0 ? s.nifty50_value : lastKnownNifty;
    if (s.nifty50_value > 0) lastKnownNifty = s.nifty50_value;
    return {
      date: formatDate(s.snapshot_date),
      Portfolio: baseVal > 0 ? ((s.total_val - baseVal) / baseVal) * 100 : 0,
      "Nifty 50": baseNifty > 0 ? ((nifty - baseNifty) / baseNifty) * 100 : 0,
    };
  });

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Portfolio vs Nifty 50
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Cumulative % return since {formatDate(data[0].snapshot_date)}
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gradNifty" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(0)}%`}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="Portfolio"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2.5}
            fill="url(#gradPortfolio)"
          />
          <Area
            type="monotone"
            dataKey="Nifty 50"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#gradNifty)"
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: "hsl(var(--foreground))" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Asset Class Performance Comparison ---
// Rebases each asset class, portfolio total, and Nifty 50 to 0% at the first snapshot

const PERFORMANCE_COLORS: Record<string, string> = {
  Portfolio: "hsl(var(--chart-1))",
  "Stocks - India": "hsl(var(--chart-2))",
  "Stocks - US": "hsl(var(--chart-5))",
  "ETFs - India": "hsl(var(--chart-3))",
  "ETFs - US": "hsl(var(--chart-4))",
  "Mutual Funds": "hsl(var(--chart-5))",
  "Gold & Silver": "hsl(var(--chart-3))",
  Crypto: "hsl(var(--chart-4))",
};

export function AssetClassPerformanceChart({ data }: { data: Snapshot[] }) {
  if (data.length < 2) return null;

  const currentReturnPct = (currentValue: number, investedValue: number) =>
    investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0;

  const chartData = data.map((s) => {
    return {
      date: formatDate(s.snapshot_date),
      Portfolio: currentReturnPct(s.total_val, s.total_inv),
      "Stocks - India": currentReturnPct(s.curr_stocks_india, s.inv_stocks_india),
      "Stocks - US": currentReturnPct(s.curr_stocks_us, s.inv_stocks_us),
      "ETFs - India": currentReturnPct(s.curr_etfs_india, s.inv_etfs_india),
      "ETFs - US": currentReturnPct(s.curr_etfs_us, s.inv_etfs_us),
      "Mutual Funds": currentReturnPct(
        s.curr_mutual_funds,
        s.inv_mutual_funds,
      ),
      "Gold & Silver": currentReturnPct(
        s.curr_gold_silver,
        s.inv_gold_silver,
      ),
      Crypto: currentReturnPct(s.curr_crypto, s.inv_crypto),
    };
  });

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Asset Class Performance
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Current return % at each snapshot. The last point shows how much each
        asset class is up or down right now.
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(0)}%`}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />
          {Object.entries(PERFORMANCE_COLORS).map(([key, color]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={key === "Portfolio" ? 2.5 : 1.5}
              strokeDasharray={key === "Nifty 50" ? "6 3" : undefined}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: "hsl(var(--foreground))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Asset Allocation Pie (percentages) ---

export function AssetAllocationChart({ snapshot }: { snapshot: Snapshot }) {
  const assets = [
    { name: "Stocks - India", value: snapshot.curr_stocks_india },
    { name: "Stocks - US", value: snapshot.curr_stocks_us },
    { name: "ETFs - India", value: snapshot.curr_etfs_india },
    { name: "ETFs - US", value: snapshot.curr_etfs_us },
    { name: "Mutual Funds", value: snapshot.curr_mutual_funds },
    { name: "Gold & Silver", value: snapshot.curr_gold_silver },
    { name: "Crypto", value: snapshot.curr_crypto },
    { name: "Emergency Fund", value: snapshot.curr_emergency_fund },
    { name: "Savings", value: snapshot.curr_savings_account },
    { name: "Fixed Deposits", value: snapshot.curr_fixed_deposits },
  ].filter((a) => a.value > 0);

  const total = assets.reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Asset Allocation
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={assets}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {assets.map((entry) => (
              <Cell
                key={entry.name}
                fill={ASSET_COLORS[entry.name] ?? "hsl(var(--muted-foreground))"}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const { name, value } = payload[0].payload;
              const pct = ((value / total) * 100).toFixed(1);
              return (
                <div className="rounded-lg bg-card px-3 py-2">
                  <p className="text-sm font-medium text-card-foreground">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {pct}% of portfolio
                  </p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {assets.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: ASSET_COLORS[a.name] ?? "hsl(var(--muted-foreground))" }}
            />
            {a.name}{" "}
            <span className="font-medium text-foreground">
              {((a.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Asset-wise Returns (%) Bar Chart ---

export function AssetReturnsChart({ snapshot }: { snapshot: Snapshot }) {
  const returnPct = (curr: number, inv: number) =>
    inv > 0 ? ((curr - inv) / inv) * 100 : 0;

  const assets = [
    {
      name: "Stocks IN",
      returnPct: returnPct(snapshot.curr_stocks_india, snapshot.inv_stocks_india),
    },
    {
      name: "Stocks US",
      returnPct: returnPct(snapshot.curr_stocks_us, snapshot.inv_stocks_us),
    },
    {
      name: "ETFs IN",
      returnPct: returnPct(snapshot.curr_etfs_india, snapshot.inv_etfs_india),
    },
    {
      name: "ETFs US",
      returnPct: returnPct(snapshot.curr_etfs_us, snapshot.inv_etfs_us),
    },
    {
      name: "MFs",
      returnPct: returnPct(snapshot.curr_mutual_funds, snapshot.inv_mutual_funds),
    },
    {
      name: "Gold",
      returnPct: returnPct(snapshot.curr_gold_silver, snapshot.inv_gold_silver),
    },
    {
      name: "Crypto",
      returnPct: returnPct(snapshot.curr_crypto, snapshot.inv_crypto),
    },
    {
      name: "Emergency",
      returnPct: 6.5, // IDFC First Bank savings rate
    },
    {
      name: "Savings",
      returnPct: 2.5, // SBI savings rate
    },
    {
      name: "FDs",
      returnPct: returnPct(snapshot.curr_fixed_deposits, snapshot.inv_fixed_deposits),
    },
  ].filter((a) => a.returnPct !== 0 || a.name === "Emergency" || a.name === "Savings");

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Returns by Asset Class
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={assets}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            width={50}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(1)}%`, "Return"]}
          />
          <Bar dataKey="returnPct" name="Return %">
            {assets.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.returnPct >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                radius={[4, 4, 0, 0] as unknown as number}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Period-over-Period Growth (Portfolio vs Nifty) ---

export function GrowthChart({ data }: { data: Snapshot[] }) {
  if (data.length < 2) return null;

  // Carry forward zero nifty values so period-over-period calc isn't distorted
  let prevNifty = data[0].nifty50_value;
  const chartData = data.slice(1).map((s, i) => {
    const prev = data[i];
    const prevNiftyEffective = prev.nifty50_value > 0 ? prev.nifty50_value : prevNifty;
    const currNifty = s.nifty50_value > 0 ? s.nifty50_value : prevNiftyEffective;

    const portfolioGrowth =
      prev.total_val > 0
        ? ((s.total_val - prev.total_val) / prev.total_val) * 100
        : 0;
    const niftyGrowth =
      prevNiftyEffective > 0
        ? ((currNifty - prevNiftyEffective) / prevNiftyEffective) * 100
        : 0;

    if (s.nifty50_value > 0) prevNifty = s.nifty50_value;

    return {
      date: formatDate(s.snapshot_date),
      Portfolio: Number(portfolioGrowth.toFixed(2)),
      "Nifty 50": Number(niftyGrowth.toFixed(2)),
    };
  });

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Period-over-Period Growth
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        % change between consecutive snapshots
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="Portfolio"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
          />
          <Line
            type="monotone"
            dataKey="Nifty 50"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: "hsl(var(--chart-3))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Income Allocation Chart ---
// Expense = Salary - Δ(investment assets) - Δ(savings + emergency fund)
// Investment assets = stocks, MFs, gold, crypto, FDs
// Savings pool = savings account + emergency fund (where salary lands)
// Skips first snapshot (baseline) and the latest if same-day (no change).

export function IncomeAllocationChart({ data }: { data: Snapshot[] }) {
  const chartData: Array<{
    date: string;
    Invested: number;
    Expenses: number;
    "Cash Δ": number;
  }> = [];

  for (let i = 1; i < data.length; i++) {
    const curr = data[i];
    const prev = data[i - 1];

    if (curr.inc_month <= 0) continue;

    // Change in pure investment assets (stocks, ETFs, MFs, gold, crypto, FDs)
    const investDelta =
      curr.inv_stocks -
      prev.inv_stocks +
      (curr.inv_etfs_india - prev.inv_etfs_india) +
      (curr.inv_etfs_us - prev.inv_etfs_us) +
      (curr.inv_mutual_funds - prev.inv_mutual_funds) +
      (curr.inv_gold_silver - prev.inv_gold_silver) +
      (curr.inv_crypto - prev.inv_crypto) +
      (curr.inv_fixed_deposits - prev.inv_fixed_deposits);

    // Change in cash pool (savings + emergency fund)
    const cashDelta =
      curr.inv_savings_account -
      prev.inv_savings_account +
      (curr.inv_emergency_fund - prev.inv_emergency_fund);

    const expense = curr.inc_month - investDelta - cashDelta;

    // Skip if no meaningful change (same-day duplicate)
    if (investDelta === 0 && cashDelta === 0) continue;

    const salary = curr.inc_month;
    chartData.push({
      date: formatDate(curr.snapshot_date),
      Invested: Number(((investDelta / salary) * 100).toFixed(0)),
      Expenses: Number(((expense / salary) * 100).toFixed(0)),
      "Cash Δ": Number(((cashDelta / salary) * 100).toFixed(0)),
    });
  }

  if (chartData.length === 0) return null;

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        Income Allocation
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Where each month's salary went — investments, expenses, or cash reserves
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: "hsl(var(--foreground))" }}
          />
          <ReferenceLine y={0} stroke="hsl(var(--border))" />
          <Bar dataKey="Invested" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Cash Δ" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
