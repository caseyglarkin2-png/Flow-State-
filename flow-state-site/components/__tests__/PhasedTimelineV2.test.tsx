/**
 * Tests for PhasedTimelineV2 Component
 * Sprint 2.3: Unit Tests for Visual Timeline
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  PhasedTimelineV2, 
  PhasedTimelineSummary 
} from '../PhasedTimelineV2';
import { PHASED_FRAMEWORK, type RolloutPhase } from '@/lib/content';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, onClick, onKeyDown, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article 
        {...props} 
        onClick={onClick as React.MouseEventHandler}
        onKeyDown={onKeyDown as React.KeyboardEventHandler}
      >
        {children}
      </article>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => true,
}));

describe('PhasedTimelineV2 Component', () => {
  const mockPhases: RolloutPhase[] = PHASED_FRAMEWORK;

  describe('Rendering', () => {
    it('should render with test ID', () => {
      render(<PhasedTimelineV2 />);
      expect(screen.getByTestId('phased-timeline')).toBeInTheDocument();
    });

    it('should render all 5 phases', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      expect(screen.getByTestId('phase-1')).toBeInTheDocument();
      expect(screen.getByTestId('phase-2')).toBeInTheDocument();
      expect(screen.getByTestId('phase-3')).toBeInTheDocument();
      expect(screen.getByTestId('phase-4')).toBeInTheDocument();
      expect(screen.getByTestId('phase-5')).toBeInTheDocument();
    });

    it('should display phase labels', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      expect(screen.getByText('Proof of Concept')).toBeInTheDocument();
      expect(screen.getByText('Pilot')).toBeInTheDocument();
      expect(screen.getByText('Scale Pilot')).toBeInTheDocument();
      expect(screen.getByText('Full Rollout')).toBeInTheDocument();
      expect(screen.getByText('Innovation 2.0')).toBeInTheDocument();
    });

    it('should display timeframes', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      expect(screen.getByText('30 days')).toBeInTheDocument();
      expect(screen.getByText('60 days')).toBeInTheDocument();
      expect(screen.getByText('90 days')).toBeInTheDocument();
      expect(screen.getByText('6-12 months')).toBeInTheDocument();
      expect(screen.getByText('Ongoing')).toBeInTheDocument();
    });

    it('should have accessible aria-label', () => {
      render(<PhasedTimelineV2 />);
      expect(screen.getByLabelText('Implementation timeline')).toBeInTheDocument();
    });
  });

  describe('Phase Expansion', () => {
    it('should start with no phase expanded by default', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      const phase1 = screen.getByTestId('phase-1');
      expect(phase1).toHaveAttribute('aria-expanded', 'false');
    });

    it('should respect defaultExpandedPhase prop', () => {
      render(<PhasedTimelineV2 phases={mockPhases} defaultExpandedPhase={2} />);
      
      const phase2 = screen.getByTestId('phase-2');
      expect(phase2).toHaveAttribute('aria-expanded', 'true');
    });

    it('should expand phase on click', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      const phase1 = screen.getByTestId('phase-1');
      fireEvent.click(phase1);
      
      expect(phase1).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse phase when clicked again', () => {
      render(<PhasedTimelineV2 phases={mockPhases} defaultExpandedPhase={1} />);
      
      const phase1 = screen.getByTestId('phase-1');
      expect(phase1).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(phase1);
      expect(phase1).toHaveAttribute('aria-expanded', 'false');
    });

    it('should show outcomes when expanded', () => {
      render(<PhasedTimelineV2 phases={mockPhases} defaultExpandedPhase={1} />);
      
      // Check for outcomes header
      expect(screen.getByText('Outcomes')).toBeInTheDocument();
      // Check for specific outcome from Phase 1
      expect(screen.getByText('Digital twin of yard operations')).toBeInTheDocument();
    });

    it('should handle keyboard navigation with Enter', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      const phase1 = screen.getByTestId('phase-1');
      fireEvent.keyDown(phase1, { key: 'Enter' });
      
      expect(phase1).toHaveAttribute('aria-expanded', 'true');
    });

    it('should handle keyboard navigation with Space', () => {
      render(<PhasedTimelineV2 phases={mockPhases} />);
      
      const phase1 = screen.getByTestId('phase-1');
      fireEvent.keyDown(phase1, { key: ' ' });
      
      expect(phase1).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Current Phase Highlighting', () => {
    it('should highlight current phase', () => {
      render(<PhasedTimelineV2 phases={mockPhases} currentPhase={2} />);
      
      const phase2 = screen.getByTestId('phase-2');
      expect(phase2.className).toContain('border-flow');
    });

    it('should not highlight non-current phases', () => {
      render(<PhasedTimelineV2 phases={mockPhases} currentPhase={2} />);
      
      const phase1 = screen.getByTestId('phase-1');
      expect(phase1.className).not.toContain('border-flow');
    });
  });

  describe('Callback', () => {
    it('should call onPhaseSelect when phase is clicked', () => {
      const onPhaseSelect = vi.fn();
      render(
        <PhasedTimelineV2 
          phases={mockPhases} 
          onPhaseSelect={onPhaseSelect} 
        />
      );
      
      const phase3 = screen.getByTestId('phase-3');
      fireEvent.click(phase3);
      
      expect(onPhaseSelect).toHaveBeenCalledTimes(1);
      expect(onPhaseSelect.mock.calls[0][0]).toHaveProperty('phase', 3);
    });
  });

  describe('Compact Mode', () => {
    it('should render compact version with test ID', () => {
      render(<PhasedTimelineV2 compact />);
      expect(screen.getByTestId('phased-timeline-compact')).toBeInTheDocument();
    });

    it('should display short labels in compact mode', () => {
      render(<PhasedTimelineV2 phases={mockPhases} compact />);
      
      expect(screen.getByText('POC')).toBeInTheDocument();
      expect(screen.getByText('Pilot')).toBeInTheDocument();
      expect(screen.getByText('Scale')).toBeInTheDocument();
      expect(screen.getByText('Rollout')).toBeInTheDocument();
      expect(screen.getByText('Innovate')).toBeInTheDocument();
    });

    it('should show Current badge for current phase', () => {
      render(<PhasedTimelineV2 phases={mockPhases} compact currentPhase={2} />);
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should have list role in compact mode', () => {
      render(<PhasedTimelineV2 compact />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<PhasedTimelineV2 testId="custom-timeline" />);
      expect(screen.getByTestId('custom-timeline')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<PhasedTimelineV2 className="custom-class" />);
      const timeline = screen.getByTestId('phased-timeline');
      expect(timeline.className).toContain('custom-class');
    });
  });
});

describe('PhasedTimelineSummary Component', () => {
  describe('Rendering', () => {
    it('should render with test ID', () => {
      render(<PhasedTimelineSummary />);
      expect(screen.getByTestId('phased-timeline-summary')).toBeInTheDocument();
    });

    it('should display current phase info', () => {
      render(<PhasedTimelineSummary currentPhase={1} />);
      expect(screen.getByText('Proof of Concept')).toBeInTheDocument();
      expect(screen.getByText('30 days')).toBeInTheDocument();
    });

    it('should show progress percentage', () => {
      render(<PhasedTimelineSummary currentPhase={3} />);
      // Phase 3 of 5 = 2/4 = 50%
      expect(screen.getByText('50% Complete')).toBeInTheDocument();
    });

    it('should show phase count', () => {
      render(<PhasedTimelineSummary currentPhase={2} />);
      expect(screen.getByText('Phase 2 of 5')).toBeInTheDocument();
    });
  });

  describe('Phase Selection', () => {
    it('should update display for different phases', () => {
      const { rerender } = render(<PhasedTimelineSummary currentPhase={1} />);
      expect(screen.getByText('Proof of Concept')).toBeInTheDocument();
      
      rerender(<PhasedTimelineSummary currentPhase={4} />);
      expect(screen.getByText('Full Rollout')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<PhasedTimelineSummary testId="custom-summary" />);
      expect(screen.getByTestId('custom-summary')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<PhasedTimelineSummary className="custom-class" />);
      const summary = screen.getByTestId('phased-timeline-summary');
      expect(summary.className).toContain('custom-class');
    });
  });
});
