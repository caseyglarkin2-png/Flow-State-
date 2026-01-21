export const NETWORK_BASELINE_N0 = 10 as const;

export type NetworkModeId = 'conservative' | 'expected' | 'upside';

export interface NetworkEffectParams {
  /**
   * Strength parameter. Higher β increases the network bonus for a given n.
   *
   * Canonical multiplier:
   *   M(n) = 1 + β * (C(n)/C0) * R(n)
   */
  beta: number;

  /**
   * Maturity constant in facilities.
   *
   * Canonical realization curve:
   *   R(n) = 1 - exp(-n/τ)
   */
  tau: number;
}

export interface NetworkEffectResult {
  n: number;
  n0: number;

  /** Potential connectivity: C(n) = n(n-1)/2 */
  connections: number;

  /** Baseline connectivity: C0 = C(n0) */
  baselineConnections: number;

  /** Realization factor R(n) in [0,1] */
  realization: number;

  /** Canonical multiplier M(n) */
  multiplier: number;

  /** Parameters used for realization/multiplier */
  beta: number;
  tau: number;
}

function clampFinite(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export function connectionsPotential(n: number): number {
  const nn = Math.max(0, Math.floor(n));
  return (nn * (nn - 1)) / 2;
}

export function realizationFactor(n: number, tau: number): number {
  const nn = Math.max(0, Math.floor(n));
  const t = Math.max(0.0001, tau);
  // R(n) = 1 - exp(-n/τ)
  return clampFinite(1 - Math.exp(-nn / t), 0, 1);
}

/**
 * Canonical Metcalfe-inspired, realization-adjusted multiplier.
 *
 *   C(n) = n(n-1)/2
 *   R(n) = 1 - exp(-n/τ)
 *   C0   = C(n0) where n0 is fixed to 10
 *   M(n) = 1 + β * (C(n)/C0) * R(n)
 */
export function metcalfeInspiredMultiplier(n: number, params: NetworkEffectParams): NetworkEffectResult {
  const nn = Math.max(1, Math.floor(n));
  const n0 = NETWORK_BASELINE_N0;

  const connections = connectionsPotential(nn);
  const baselineConnections = Math.max(1, connectionsPotential(n0));

  const beta = Math.max(0, params.beta);
  const tau = Math.max(0.0001, params.tau);

  const realization = realizationFactor(nn, tau);

  const multiplier = 1 + beta * (connections / baselineConnections) * realization;

  return {
    n: nn,
    n0,
    connections,
    baselineConnections,
    realization,
    multiplier: Number.isFinite(multiplier) ? multiplier : 1,
    beta,
    tau,
  };
}
