export function money(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${Math.round(amount).toLocaleString()}`;
}

export function percent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function truckloads(n: number): string {
  const v = Math.round(n);
  return v.toLocaleString();
}

export function paybackLabel(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return 'N/A';
  if (months < 1) return '< 1 month';
  return `${months.toFixed(1)} months`;
}
