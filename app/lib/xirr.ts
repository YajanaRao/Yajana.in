
interface CashFlow {
  date: Date;
  amount: number;
}

function daysBetween(d1: Date, d2: Date): number {
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

function npv(rate: number, flows: CashFlow[], d0: Date): number {
  return flows.reduce((sum, cf) => {
    const years = daysBetween(d0, cf.date) / 365.0;
    return sum + cf.amount / Math.pow(1 + rate, years);
  }, 0);
}

function npvDerivative(rate: number, flows: CashFlow[], d0: Date): number {
  return flows.reduce((sum, cf) => {
    const years = daysBetween(d0, cf.date) / 365.0;
    if (years === 0) return sum;
    return sum - (years * cf.amount) / Math.pow(1 + rate, years + 1);
  }, 0);
}

export function xirr(flows: CashFlow[], guess = 0.1): number | null {
  if (flows.length < 2) return null;

  const d0 = flows[0].date;

  const hasNeg = flows.some((f) => f.amount < 0);
  const hasPos = flows.some((f) => f.amount > 0);
  if (!hasNeg || !hasPos) return null;

  let rate = guess;
  const maxIter = 200;
  const tolerance = 1e-10;

  for (let i = 0; i < maxIter; i++) {
    const f = npv(rate, flows, d0);
    const df = npvDerivative(rate, flows, d0);

    if (Math.abs(df) < 1e-14) break;

    const newRate = rate - f / df;

    if (newRate < -0.99) {
      rate = -0.99;
    } else {
      rate = newRate;
    }

    if (Math.abs(f) < tolerance) {
      return rate;
    }
  }

  return xirrBisection(flows, d0);
}

function xirrBisection(flows: CashFlow[], d0: Date): number | null {
  let lo = -0.99;
  let hi = 10.0;
  const maxIter = 300;
  const tolerance = 1e-8;

  let fLo = npv(lo, flows, d0);
  let fHi = npv(hi, flows, d0);

  if (fLo * fHi > 0) return null;

  for (let i = 0; i < maxIter; i++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid, flows, d0);

    if (Math.abs(fMid) < tolerance || (hi - lo) / 2 < tolerance) {
      return mid;
    }

    if (fLo * fMid < 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }

  return null;
}

export function cagr(
  startValue: number,
  endValue: number,
  startDate: Date,
  endDate: Date
): number {
  const years = daysBetween(startDate, endDate) / 365.0;
  if (years <= 0 || startValue <= 0) return 0;
  return Math.pow(endValue / startValue, 1 / years) - 1;
}
