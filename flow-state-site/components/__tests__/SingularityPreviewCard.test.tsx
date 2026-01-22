import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SingularityPreviewCard from '../cards/SingularityPreviewCard';

vi.mock('@/lib/ssr-safe-motion', () => ({
  useSSRSafeReducedMotion: vi.fn(() => false),
}));

import { useSSRSafeReducedMotion } from '@/lib/ssr-safe-motion';
const mockUseSSRSafeReducedMotion = useSSRSafeReducedMotion as ReturnType<typeof vi.fn>;

describe('SingularityPreviewCard', () => {
  beforeEach(() => {
    mockUseSSRSafeReducedMotion.mockReturnValue(false);
  });

  it('renders headline, badge, and CTA', () => {
    render(<SingularityPreviewCard />);

    expect(screen.getByText(/variance tax protocol/i)).toBeInTheDocument();
    expect(screen.getByText(/re\* = 0\.72/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /launch the singularity variance tax simulation/i })).toHaveAttribute('href', '/singularity');
    expect(screen.getByText(/launch singularity simulation/i)).toBeInTheDocument();
  });

  it('renders particle grid with 32 nodes', () => {
    render(<SingularityPreviewCard />);
    const nodes = screen.getAllByTestId('particle-node');
    expect(nodes).toHaveLength(32);
  });

  it('marks svg as animated when motion allowed', () => {
    render(<SingularityPreviewCard />);
    const svg = document.querySelector('svg[data-animated]');
    expect(svg?.getAttribute('data-animated')).toBe('true');
  });

  it('disables animation when prefers-reduced-motion', () => {
    mockUseSSRSafeReducedMotion.mockReturnValue(true);
    render(<SingularityPreviewCard />);

    const animatedAttr = document.querySelector('svg[data-animated]')?.getAttribute('data-animated');
    expect(animatedAttr).toBe('false');
  });
});
