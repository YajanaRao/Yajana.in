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

interface PortfolioMetrics {
  xirrPct: number | null;
  niftyCagrPct: number;
  alphaPct: number | null;
  periodGrowthPct: number;
}

function computeMetrics(snapshots: Snapshot[]): PortfolioMetrics {
  if (snapshots.length < 2) {
    return { xirrPct: null, niftyCagrPct: 0, alphaPct: null, periodGrowthPct: 0 };
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data, error } = await supabase
    .from("portfolio_snapshots")
    .select("*")
    .order("snapshot_date", { ascending: true });

  if (error) {
    throw new Response("Failed to load portfolio data", { status: 500 });
  }

  const snapshots = (data ?? []) as Snapshot[];
  const metrics = computeMetrics(snapshots);

  return { snapshots, metrics };
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

function pctString(val: number): string {
  const sign = val >= 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}

export default function PortfolioPage() {
  const { snapshots, metrics } = useLoaderData<typeof loader>();

  if (!snapshots.length) {
    return (
      <div className="py-16 text-center text-neutral-500">
        No portfolio data available yet.
      </div>
    );
  }

  const latest = snapshots[snapshots.length - 1];
  const first = snapshots[0];
  const previous = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;

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
          value={
            metrics.xirrPct !== null ? pctString(metrics.xirrPct) : "—"
          }
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
          value={
            metrics.alphaPct !== null ? pctString(metrics.alphaPct) : "—"
          }
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
          XIRR accounts for the timing and size of each investment.
          Nifty 50 CAGR is the compound annual growth over the same date range.
          Alpha = XIRR − Nifty CAGR.
          The cumulative returns chart uses simple % change from the first snapshot (not XIRR),
          so it may differ from the headline number.
        </p>
      </div>
    </div>
  );
}
