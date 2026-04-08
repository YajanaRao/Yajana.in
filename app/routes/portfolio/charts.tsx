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
  Stocks: "#10b981",
  "Mutual Funds": "#3b82f6",
  "Gold & Silver": "#eab308",
  Crypto: "#f97316",
  "Emergency Fund": "#8b5cf6",
  Savings: "#06b6d4",
  "Fixed Deposits": "#ec4899",
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
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
      <p className="mb-1 text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-sm font-medium"
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

  const chartData = data.map((s) => ({
    date: formatDate(s.snapshot_date),
    "Portfolio": baseVal > 0
      ? ((s.total_val - baseVal) / baseVal) * 100
      : 0,
    "Nifty 50": baseNifty > 0
      ? ((s.nifty50_value - baseNifty) / baseNifty) * 100
      : 0,
  }));

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Portfolio vs Nifty 50
      </h3>
      <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">
        Cumulative % return since {formatDate(data[0].snapshot_date)}
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="gradPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradNifty" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(0)}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="Portfolio"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#gradPortfolio)"
          />
          <Area
            type="monotone"
            dataKey="Nifty 50"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#gradNifty)"
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Asset Allocation Pie (percentages) ---

export function AssetAllocationChart({ snapshot }: { snapshot: Snapshot }) {
  const assets = [
    { name: "Stocks", value: snapshot.curr_stocks },
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
      <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
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
                fill={ASSET_COLORS[entry.name] ?? "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const { name, value } = payload[0].payload;
              const pct = ((value / total) * 100).toFixed(1);
              return (
                <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {name}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
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
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: ASSET_COLORS[a.name] ?? "#94a3b8" }}
            />
            {a.name}{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
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
  const assets = [
    {
      name: "Stocks",
      returnPct:
        snapshot.inv_stocks > 0
          ? ((snapshot.curr_stocks - snapshot.inv_stocks) / snapshot.inv_stocks) *
            100
          : 0,
    },
    {
      name: "MFs",
      returnPct:
        snapshot.inv_mutual_funds > 0
          ? ((snapshot.curr_mutual_funds - snapshot.inv_mutual_funds) /
              snapshot.inv_mutual_funds) *
            100
          : 0,
    },
    {
      name: "Gold",
      returnPct:
        snapshot.inv_gold_silver > 0
          ? ((snapshot.curr_gold_silver - snapshot.inv_gold_silver) /
              snapshot.inv_gold_silver) *
            100
          : 0,
    },
    {
      name: "Crypto",
      returnPct:
        snapshot.inv_crypto > 0
          ? ((snapshot.curr_crypto - snapshot.inv_crypto) / snapshot.inv_crypto) *
            100
          : 0,
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
      returnPct:
        snapshot.inv_fixed_deposits > 0
          ? ((snapshot.curr_fixed_deposits - snapshot.inv_fixed_deposits) /
              snapshot.inv_fixed_deposits) *
            100
          : 0,
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Returns by Asset Class
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={assets}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={50}
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(1)}%`,
              "Return",
            ]}
          />
          <Bar dataKey="returnPct" name="Return %">
            {assets.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.returnPct >= 0 ? "#10b981" : "#ef4444"}
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

  const chartData = data.slice(1).map((s, i) => {
    const prev = data[i];
    const portfolioGrowth =
      prev.total_val > 0
        ? ((s.total_val - prev.total_val) / prev.total_val) * 100
        : 0;
    const niftyGrowth =
      prev.nifty50_value > 0
        ? ((s.nifty50_value - prev.nifty50_value) / prev.nifty50_value) * 100
        : 0;
    return {
      date: formatDate(s.snapshot_date),
      "Portfolio": Number(portfolioGrowth.toFixed(2)),
      "Nifty 50": Number(niftyGrowth.toFixed(2)),
    };
  });

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Period-over-Period Growth
      </h3>
      <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">
        % change between consecutive snapshots
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="Portfolio"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="Nifty 50"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: "#f59e0b" }}
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
    "Invested": number;
    "Expenses": number;
    "Cash Δ": number;
  }> = [];

  for (let i = 1; i < data.length; i++) {
    const curr = data[i];
    const prev = data[i - 1];

    if (curr.inc_month <= 0) continue;

    // Change in pure investment assets (stocks, MFs, gold, crypto, FDs)
    const investDelta =
      (curr.inv_stocks - prev.inv_stocks) +
      (curr.inv_mutual_funds - prev.inv_mutual_funds) +
      (curr.inv_gold_silver - prev.inv_gold_silver) +
      (curr.inv_crypto - prev.inv_crypto) +
      (curr.inv_fixed_deposits - prev.inv_fixed_deposits);

    // Change in cash pool (savings + emergency fund)
    const cashDelta =
      (curr.inv_savings_account - prev.inv_savings_account) +
      (curr.inv_emergency_fund - prev.inv_emergency_fund);

    const expense = curr.inc_month - investDelta - cashDelta;

    // Skip if no meaningful change (same-day duplicate)
    if (investDelta === 0 && cashDelta === 0) continue;

    const salary = curr.inc_month;
    chartData.push({
      date: formatDate(curr.snapshot_date),
      "Invested": Number(((investDelta / salary) * 100).toFixed(0)),
      "Expenses": Number(((expense / salary) * 100).toFixed(0)),
      "Cash Δ": Number(((cashDelta / salary) * 100).toFixed(0)),
    });
  }

  if (chartData.length === 0) return null;

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Income Allocation
      </h3>
      <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">
        Where each month's salary went — investments, expenses, or cash reserves
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
          />
          <ReferenceLine
            y={0}
            stroke="#94a3b8"
            strokeOpacity={0.4}
          />
          <Bar dataKey="Invested" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Cash Δ" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
