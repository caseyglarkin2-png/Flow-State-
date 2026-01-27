/**
 * Tests for ProofStripV2 Component
 * Sprint 2.1: Unit Tests for Animated KPI Ticker
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProofStripV2, ProofStripCompactV2 } from '../ProofStripV2';
import { PROOF_POINTS, type ProofPoint } from '@/lib/content';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: () => true, // Always in view for tests
  useReducedMotion: () => true, // Reduced motion for instant display
}));

describe('ProofStripV2 Component', () => {
  const mockProofPoints: ProofPoint[] = [
    {
      metric: '1M+',
      label: 'Driver Check-Ins',
      sourceType: 'measured',
    },
    {
      metric: '0.2%',
      label: 'Failure Rate',
      sourceType: 'measured',
    },
    {
      metric: '200K',
      label: 'Drivers Onboarded',
      sourceType: 'measured',
    },
    {
      metric: '~70s',
      label: 'Check-In Time',
      sourceType: 'measured',
    },
  ];

  describe('Rendering', () => {
    it('should render proof strip with test ID', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      expect(screen.getByTestId('proof-strip')).toBeInTheDocument();
    });

    it('should render all measured proof points', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      expect(screen.getByText('Driver Check-Ins')).toBeInTheDocument();
      expect(screen.getByText('Failure Rate')).toBeInTheDocument();
      expect(screen.getByText('Drivers Onboarded')).toBeInTheDocument();
      expect(screen.getByText('Check-In Time')).toBeInTheDocument();
    });

    it('should display metric values', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      const metricValues = screen.getAllByTestId('metric-value');
      expect(metricValues.length).toBe(4);
    });

    it('should show source badges for each metric', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      const measuredBadges = screen.getAllByText('Measured');
      expect(measuredBadges.length).toBe(4);
    });

    it('should have accessible aria-label', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      expect(screen.getByLabelText('Scale proof metrics')).toBeInTheDocument();
    });
  });

  describe('Data Filtering', () => {
    const mixedPoints: ProofPoint[] = [
      { metric: '1M+', label: 'Measured Stat', sourceType: 'measured' },
      { metric: '50%', label: 'Modeled Stat', sourceType: 'modeled' },
    ];

    it('should filter to only measured points by default', () => {
      render(<ProofStripV2 proofPoints={mixedPoints} />);
      
      expect(screen.getByText('Measured Stat')).toBeInTheDocument();
      expect(screen.queryByText('Modeled Stat')).not.toBeInTheDocument();
    });

    it('should show all points when showAll is true', () => {
      render(<ProofStripV2 proofPoints={mixedPoints} showAll />);
      
      expect(screen.getByText('Measured Stat')).toBeInTheDocument();
      expect(screen.getByText('Modeled Stat')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} testId="custom-strip" />);
      expect(screen.getByTestId('custom-strip')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} className="custom-class" />);
      const strip = screen.getByTestId('proof-strip');
      expect(strip.className).toContain('custom-class');
    });
  });

  describe('Compact Variant', () => {
    it('should render compact version', () => {
      render(<ProofStripCompactV2 proofPoints={mockProofPoints} />);
      expect(screen.getByTestId('proof-strip-compact')).toBeInTheDocument();
    });

    it('should show only first 3 metrics in compact mode', () => {
      render(<ProofStripCompactV2 proofPoints={mockProofPoints} />);
      
      expect(screen.getByText('Driver Check-Ins')).toBeInTheDocument();
      expect(screen.getByText('Failure Rate')).toBeInTheDocument();
      expect(screen.getByText('Drivers Onboarded')).toBeInTheDocument();
      // Fourth metric should not be shown
      expect(screen.queryByText('Check-In Time')).not.toBeInTheDocument();
    });
  });

  describe('Content Model Integration', () => {
    it('should use content model when no proofPoints provided', () => {
      render(<ProofStripV2 />);
      
      // Should display metrics from PROOF_POINTS
      const measuredPoints = PROOF_POINTS.filter(p => p.sourceType === 'measured');
      measuredPoints.forEach(point => {
        expect(screen.getByText(point.label)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic section element', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      const section = screen.getByTestId('proof-strip');
      expect(section.tagName).toBe('SECTION');
    });

    it('should have aria-labels on source badges', () => {
      render(<ProofStripV2 proofPoints={mockProofPoints} />);
      
      const badges = screen.getAllByLabelText('Measured production data');
      expect(badges.length).toBe(4);
    });
  });

  describe('Qualifier Display', () => {
    it('should display qualifier if present', () => {
      const pointsWithQualifier: ProofPoint[] = [
        {
          metric: '1M+',
          label: 'Check-Ins',
          sourceType: 'measured',
          qualifier: 'Since 2024',
        },
      ];

      render(<ProofStripV2 proofPoints={pointsWithQualifier} />);
      expect(screen.getByText('Since 2024')).toBeInTheDocument();
    });

    it('should not display qualifier element if not present', () => {
      const pointsWithoutQualifier: ProofPoint[] = [
        {
          metric: '1M+',
          label: 'Check-Ins',
          sourceType: 'measured',
        },
      ];

      render(<ProofStripV2 proofPoints={pointsWithoutQualifier} />);
      expect(screen.queryByText('Since')).not.toBeInTheDocument();
    });
  });
});
