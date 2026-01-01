export type ExperimentConfig = {
  homeHeroVariant: 'A' | 'B';
};

export const defaultExperiments: ExperimentConfig = {
  homeHeroVariant: 'A',
};

export function getExperimentFromQuery(searchParams: URLSearchParams): Partial<ExperimentConfig> {
  const v = searchParams.get('hero');
  if (v === 'A' || v === 'B') return { homeHeroVariant: v };
  return {};
}
