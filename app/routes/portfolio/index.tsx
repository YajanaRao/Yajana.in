import { LoaderFunctionArgs, MetaFunction, useLoaderData } from "react-router";
import { supabase } from "@/lib/supabase.server";
import { xirr, cagr } from "@/lib/xirr";
import {
  CumulativeReturnsChart,
  AssetAllocationChart,
  AssetReturnsChart,
  GrowthChart,
  type Snapshot,
} from "./charts";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio | Yajana Rao" },
    {
      name: "description",
      content:
        "Portfolio performance tracker — XIRR, asset allocation, and benchmark comparison with Nifty 50.",
    },
  ];
};

interface MonthlyExpense {
  month: string;
  salary: number;
  total: number;
}

interface PortfolioMetrics {
  xirrPct: number | null;
  niftyCagrPct: number;
  alphaPct: number | null;
  periodGrowthPct: number;
}

interface FireMetrics {
  progressPct: number;
  yearsToFire: number | null;
  coastFireAchieved: boolean;
  coastFireYearsAway: number | null;
  savingsRatePct: number | null;
  latestExpenseMonth: string | null;
}

function computeMetrics(snapshots: Snapshot[]): PortfolioMetrics {
  if (snapshots.length < 2) {
    return {
      xirrPct: null,
      niftyCagrPct: 0,
      alphaPct: null,
      periodGrowthPct: 0,
    };
  }

  const first = snapshots[0];
  const latest = snapshots[snapshots.length - 1];
  const previous = snapshots[snapshots.length - 2];

  // Build XIRR cash flows.
  // The first snapshot is the baseline — we use its total_val as starting capital
  // since we don't know when the money before tracking started was invested.
  // From snapshot 2 onward, new_inv represents actual new inflows.
  const flows: Array<{ date: Date; amount: number }> = [];

  flows.push({
    date: new Date(first.snapshot_date),
    amount: -first.total_val,
  });

  for (let i = 1; i < snapshots.length; i++) {
    const s = snapshots[i];
    if (s.new_inv > 0) {
      flows.push({
        date: new Date(s.snapshot_date),
        amount: -s.new_inv,
      });
    }
  }

  flows.push({
    date: new Date(latest.snapshot_date),
    amount: latest.total_val,
  });

  const xirrRate = xirr(flows);
  const xirrPct = xirrRate !== null ? xirrRate * 100 : null;

  // Nifty 50 CAGR over the same period (same start date as baseline)
  const niftyCagrRate = cagr(
    first.nifty50_value,
    latest.nifty50_value,
    new Date(first.snapshot_date),
    new Date(latest.snapshot_date),
  );
  const niftyCagrPct = niftyCagrRate * 100;

  const alphaPct = xirrPct !== null ? xirrPct - niftyCagrPct : null;

  const periodGrowthPct =
    previous.total_val > 0
      ? ((latest.total_val - previous.total_val) / previous.total_val) * 100
      : 0;

  return { xirrPct, niftyCagrPct, alphaPct, periodGrowthPct };
}

const FIRE_CONFIG = {
  currentAge: 28,
  coastFireTargetAge: 60,
  expectedAnnualReturn: 0.1,
  inflationRate: 0.06,
  fireMultiplier: 25,
  // Target future lifestyle expense, not current conservative spending
  targetMonthlyExpense: 100_000,
} as const;

function computeFireMetrics(
  snapshots: Snapshot[],
  expenses: MonthlyExpense[],
): FireMetrics {
  const noData: FireMetrics = {
    progressPct: 0,
    yearsToFire: null,
    coastFireAchieved: false,
    coastFireYearsAway: null,
    savingsRatePct: null,
    latestExpenseMonth: null,
  };

  if (snapshots.length === 0 || expenses.length === 0) return noData;

  const latest = snapshots[snapshots.length - 1];
  const currentPortfolio = latest.total_val;

  const annualExpense = FIRE_CONFIG.targetMonthlyExpense * 12;
  const fireNumber = annualExpense * FIRE_CONFIG.fireMultiplier;

  if (fireNumber <= 0) return noData;

  // FIRE progress
  const progressPct = (currentPortfolio / fireNumber) * 100;

  // Years to FIRE using real return (nominal - inflation) with monthly contributions
  const realReturn =
    FIRE_CONFIG.expectedAnnualReturn - FIRE_CONFIG.inflationRate;
  const monthlyRealReturn = realReturn / 12;

  // Average monthly investment from snapshots
  const investmentSnapshots = snapshots.filter((s) => s.new_inv > 0);
  const avgMonthlyInvestment =
    investmentSnapshots.length > 0
      ? investmentSnapshots.reduce((sum, s) => sum + s.new_inv, 0) /
        investmentSnapshots.length
      : 0;

  // Solve: FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r = fireNumber
  // Using iterative approach since there's no closed-form solution for n with both PV and PMT
  let yearsToFire: number | null = null;
  if (monthlyRealReturn > 0 && avgMonthlyInvestment > 0) {
    let months = 0;
    let fv = currentPortfolio;
    while (fv < fireNumber && months < 600) {
      fv = fv * (1 + monthlyRealReturn) + avgMonthlyInvestment;
      months++;
    }
    yearsToFire = months < 600 ? months / 12 : null;
  }

  // Coast FIRE: would current portfolio compound to FIRE number by target age?
  const yearsToCoastTarget =
    FIRE_CONFIG.coastFireTargetAge - FIRE_CONFIG.currentAge;
  const coastFireNumber =
    fireNumber / Math.pow(1 + realReturn, yearsToCoastTarget);
  const coastFireAchieved = currentPortfolio >= coastFireNumber;

  let coastFireYearsAway: number | null = null;
  if (!coastFireAchieved && monthlyRealReturn > 0 && avgMonthlyInvestment > 0) {
    let months = 0;
    let fv = currentPortfolio;
    while (fv < coastFireNumber && months < 600) {
      fv = fv * (1 + monthlyRealReturn) + avgMonthlyInvestment;
      months++;
    }
    coastFireYearsAway = months < 600 ? months / 12 : null;
  }

  // Savings rate from latest month
  const latestExpense = expenses[expenses.length - 1];
  const savingsRatePct =
    latestExpense.salary > 0
      ? ((latestExpense.salary - latestExpense.total) / latestExpense.salary) *
        100
      : null;

  const latestExpenseMonth = latestExpense
    ? new Date(latestExpense.month).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return {
    progressPct,
    yearsToFire,
    coastFireAchieved,
    coastFireYearsAway,
    savingsRatePct,
    latestExpenseMonth,
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [snapshotResult, expenseResult] = await Promise.all([
    supabase
      .from("portfolio_snapshots")
      .select("*")
      .order("snapshot_date", { ascending: true }),
    supabase
      .from("monthly_expenses")
      .select("month, salary, total")
      .order("month", { ascending: true }),
  ]);

  if (snapshotResult.error) {
    throw new Response("Failed to load portfolio data", { status: 500 });
  }

  const snapshots = (snapshotResult.data ?? []) as Snapshot[];
  const expenses = (expenseResult.data ?? []) as MonthlyExpense[];
  const metrics = computeMetrics(snapshots);
  const fireMetrics = computeFireMetrics(snapshots, expenses);

  return { snapshots, metrics, fireMetrics };
};

// --- Stat card ---

function StatCard({
  label,
  value,
  subtitle,
  trend,
}: {
  label: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
        ? "text-red-500 dark:text-red-400"
        : "text-neutral-900 dark:text-neutral-50";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${trendColor}`}>
        {value}
      </p>
      {subtitle && (
        <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function FireForecastCard({ fire }: { fire: FireMetrics }) {
  if (fire.progressPct === 0 && fire.yearsToFire === null) return null;

  const progressClamped = Math.min(fire.progressPct, 100);
  const progressBarWidth = `${progressClamped.toFixed(0)}%`;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          FIRE Forecast
        </h3>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
          {FIRE_CONFIG.expectedAnnualReturn * 100}% return ·{" "}
          {FIRE_CONFIG.inflationRate * 100}% inflation · 4% rule ·{" "}
          {(FIRE_CONFIG.targetMonthlyExpense / 1000).toFixed(0)}K/mo lifestyle
        </span>
      </div>

      <div className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Progress
            </span>
            <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
              {fire.progressPct.toFixed(1)}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 dark:bg-emerald-400"
              style={{ width: progressBarWidth }}
            />
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Years to FIRE
            </p>
            <p className="mt-0.5 text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
              {fire.yearsToFire !== null
                ? `~${fire.yearsToFire.toFixed(1)}`
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Coast FIRE
            </p>
            <p
              className={`mt-0.5 text-lg font-bold ${fire.coastFireAchieved ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-900 dark:text-neutral-50"}`}
            >
              {fire.coastFireAchieved
                ? "Achieved"
                : fire.coastFireYearsAway !== null
                  ? `~${fire.coastFireYearsAway.toFixed(1)}y away`
                  : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Savings Rate
            </p>
            <p
              className={`mt-0.5 text-lg font-bold tabular-nums ${
                fire.savingsRatePct !== null && fire.savingsRatePct >= 50
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-neutral-900 dark:text-neutral-50"
              }`}
            >
              {fire.savingsRatePct !== null
                ? `${fire.savingsRatePct.toFixed(0)}%`
                : "—"}
            </p>
            {fire.latestExpenseMonth && (
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                {fire.latestExpenseMonth}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function pctString(val: number): string {
  const sign = val >= 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}

export default function PortfolioPage() {
  const { snapshots, metrics, fireMetrics } = useLoaderData<typeof loader>();

  if (!snapshots.length) {
    return (
      <div className="py-16 text-center text-neutral-500">
        No portfolio data available yet.
      </div>
    );
  }

  const latest = snapshots[snapshots.length - 1];
  const first = snapshots[0];
  const previous =
    snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;

  const fmt = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const lastUpdated = fmt(latest.snapshot_date);
  const trackingSince = fmt(first.snapshot_date);
  const previousDate = previous ? fmt(previous.snapshot_date) : null;

  return (
    <div className="not-prose">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Portfolio
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="XIRR"
          value={metrics.xirrPct !== null ? pctString(metrics.xirrPct) : "—"}
          subtitle={`since ${trackingSince}`}
          trend={
            metrics.xirrPct !== null
              ? metrics.xirrPct >= 0
                ? "up"
                : "down"
              : "neutral"
          }
        />
        <StatCard
          label="Since Last Snapshot"
          value={pctString(metrics.periodGrowthPct)}
          subtitle={previousDate ? `since ${previousDate}` : undefined}
          trend={metrics.periodGrowthPct >= 0 ? "up" : "down"}
        />
        <StatCard
          label="Nifty 50 CAGR"
          value={pctString(metrics.niftyCagrPct)}
          subtitle={`${trackingSince} — ${lastUpdated}`}
          trend={metrics.niftyCagrPct >= 0 ? "up" : "down"}
        />
        <StatCard
          label="Alpha"
          value={metrics.alphaPct !== null ? pctString(metrics.alphaPct) : "—"}
          subtitle="XIRR − Nifty CAGR"
          trend={
            metrics.alphaPct !== null
              ? metrics.alphaPct >= 0
                ? "up"
                : "down"
              : "neutral"
          }
        />
      </div>

      {/* FIRE Forecast */}
      <div className="mb-10">
        <FireForecastCard fire={fireMetrics} />
      </div>

      {/* Charts */}
      <div className="space-y-10">
        <div className="rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60 sm:p-6">
          <CumulativeReturnsChart data={snapshots} />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60 sm:p-6">
          <AssetAllocationChart snapshot={latest} />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60 sm:p-6">
          <AssetReturnsChart snapshot={latest} />
        </div>

        {snapshots.length > 1 && (
          <div className="rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/60 sm:p-6">
            <GrowthChart data={snapshots} />
          </div>
        )}

        {/* Methodology note */}
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          XIRR accounts for the timing and size of each investment. Nifty 50
          CAGR is the compound annual growth over the same date range. Alpha =
          XIRR − Nifty CAGR. The cumulative returns chart uses simple % change
          from the first snapshot (not XIRR), so it may differ from the headline
          number.
        </p>
      </div>
    </div>
  );
}
