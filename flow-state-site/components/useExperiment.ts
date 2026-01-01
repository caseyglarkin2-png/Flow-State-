'use client';

import { useMemo } from 'react';
import { defaultExperiments, getExperimentFromQuery, type ExperimentConfig } from '@/lib/experiments';

export function useExperiments(): ExperimentConfig {
  return useMemo(() => {
    if (typeof window === 'undefined') return defaultExperiments;
    const params = new URLSearchParams(window.location.search);
    return { ...defaultExperiments, ...getExperimentFromQuery(params) };
  }, []);
}
