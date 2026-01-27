/**
 * Tests for ScalePitfallsAccordion Component
 * Sprint 2.4: Unit Tests for Scale Anti-Patterns Accordion
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  ScalePitfallsAccordion, 
  ScalePitfallsSummary 
} from '../ScalePitfallsAccordion';
import { SCALE_PITFALLS, type ScalePitfall } from '@/lib/content';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => true,
}));

describe('ScalePitfallsAccordion Component', () => {
  const mockPitfalls: ScalePitfall[] = SCALE_PITFALLS;

  describe('Rendering', () => {
    it('should render with test ID', () => {
      render(<ScalePitfallsAccordion />);
      expect(screen.getByTestId('scale-pitfalls')).toBeInTheDocument();
    });

    it('should render all pitfalls', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      // Should render pitfalls by ID
      expect(screen.getByTestId('pitfall-pilot-trap')).toBeInTheDocument();
      expect(screen.getByTestId('pitfall-vision-lock')).toBeInTheDocument();
      expect(screen.getByTestId('pitfall-vendor-lock')).toBeInTheDocument();
    });

    it('should display pitfall antiPattern titles', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      // ScalePitfall uses 'antiPattern' as the title field
      expect(screen.getByText('Treating It Like a Pilot Forever')).toBeInTheDocument();
      expect(screen.getByText('Waiting for the Perfect Vision')).toBeInTheDocument();
    });

    it('should display severity badges', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      const criticalBadges = screen.getAllByText('critical');
      expect(criticalBadges.length).toBeGreaterThan(0);
    });

    it('should have accessible aria-label', () => {
      render(<ScalePitfallsAccordion />);
      expect(screen.getByLabelText('Common scaling pitfalls')).toBeInTheDocument();
    });

    it('should display header with title', () => {
      render(<ScalePitfallsAccordion />);
      expect(screen.getByText('Common Scaling Pitfalls')).toBeInTheDocument();
    });

    it('should display different header for criticalOnly', () => {
      render(<ScalePitfallsAccordion criticalOnly />);
      expect(screen.getByText('Critical Pitfalls')).toBeInTheDocument();
    });
  });

  describe('Accordion Interaction', () => {
    it('should start with no pitfall expanded by default', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      // Content should not be visible
      expect(screen.queryByText('Why It Fails')).not.toBeInTheDocument();
    });

    it('should respect defaultExpandedId prop', () => {
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          defaultExpandedId="pilot-trap" 
        />
      );
      
      expect(screen.getByText('Why It Fails')).toBeInTheDocument();
      expect(screen.getByText('YardFlow Approach')).toBeInTheDocument();
    });

    it('should expand pitfall on click', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      const firstPitfall = screen.getByText('Treating It Like a Pilot Forever');
      fireEvent.click(firstPitfall);
      
      expect(screen.getByText('Why It Fails')).toBeInTheDocument();
    });

    it('should collapse pitfall when clicked again', () => {
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          defaultExpandedId="pilot-trap" 
        />
      );
      
      expect(screen.getByText('Why It Fails')).toBeInTheDocument();
      
      const expandedPitfall = screen.getByText('Treating It Like a Pilot Forever');
      fireEvent.click(expandedPitfall);
      
      // After collapsing, content should not be visible
      expect(screen.queryByText('Why It Fails')).not.toBeInTheDocument();
    });

    it('should show whyItFails when expanded', () => {
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          defaultExpandedId="pilot-trap" 
        />
      );
      
      // Check for the whyItFails content (partial match)
      expect(screen.getByText(/Pilots are designed to prove/)).toBeInTheDocument();
    });

    it('should show yardFlowApproach when expanded', () => {
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          defaultExpandedId="pilot-trap" 
        />
      );
      
      expect(screen.getByText('YardFlow Approach')).toBeInTheDocument();
      expect(screen.getByText(/YardFlow deploys a production-grade/)).toBeInTheDocument();
    });
  });

  describe('Callback', () => {
    it('should call onExpand when pitfall is expanded', () => {
      const onExpand = vi.fn();
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          onExpand={onExpand} 
        />
      );
      
      const firstPitfall = screen.getByText('Treating It Like a Pilot Forever');
      fireEvent.click(firstPitfall);
      
      expect(onExpand).toHaveBeenCalledTimes(1);
      expect(onExpand.mock.calls[0][0]).toHaveProperty('id', 'pilot-trap');
    });

    it('should not call onExpand when collapsing', () => {
      const onExpand = vi.fn();
      render(
        <ScalePitfallsAccordion 
          pitfalls={mockPitfalls} 
          onExpand={onExpand}
          defaultExpandedId="pilot-trap"
        />
      );
      
      const expandedPitfall = screen.getByText('Treating It Like a Pilot Forever');
      fireEvent.click(expandedPitfall);
      
      // onExpand should not be called when collapsing
      expect(onExpand).not.toHaveBeenCalled();
    });
  });

  describe('CriticalOnly Mode', () => {
    it('should show only critical pitfalls when criticalOnly is true', () => {
      render(<ScalePitfallsAccordion criticalOnly />);
      
      // Should only show critical severity badges
      const criticalBadges = screen.getAllByText('critical');
      const highBadges = screen.queryAllByText('high');
      const mediumBadges = screen.queryAllByText('medium');
      
      expect(criticalBadges.length).toBeGreaterThan(0);
      expect(highBadges.length).toBe(0);
      expect(mediumBadges.length).toBe(0);
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no pitfalls', () => {
      render(<ScalePitfallsAccordion pitfalls={[]} />);
      
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText('No pitfalls to display.')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<ScalePitfallsAccordion testId="custom-accordion" />);
      expect(screen.getByTestId('custom-accordion')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<ScalePitfallsAccordion className="custom-class" />);
      const accordion = screen.getByTestId('scale-pitfalls');
      expect(accordion.className).toContain('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-expanded on buttons', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('should have aria-controls linking to content', () => {
      render(<ScalePitfallsAccordion pitfalls={mockPitfalls} />);
      
      const firstButton = screen.getAllByRole('button')[0];
      expect(firstButton).toHaveAttribute('aria-controls');
    });
  });
});

describe('ScalePitfallsSummary Component', () => {
  describe('Rendering', () => {
    it('should render with test ID', () => {
      render(<ScalePitfallsSummary />);
      expect(screen.getByTestId('scale-pitfalls-summary')).toBeInTheDocument();
    });

    it('should display limited number of pitfalls', () => {
      render(<ScalePitfallsSummary count={2} />);
      
      // Should only show 2 items
      const summaryItems = screen.getAllByTestId(/^summary-/);
      expect(summaryItems.length).toBe(2);
    });

    it('should respect count prop', () => {
      render(<ScalePitfallsSummary count={1} />);
      
      const summaryItems = screen.getAllByTestId(/^summary-/);
      expect(summaryItems.length).toBe(1);
    });

    it('should show severity badges', () => {
      render(<ScalePitfallsSummary />);
      
      const criticalBadges = screen.getAllByText('critical');
      expect(criticalBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<ScalePitfallsSummary testId="custom-summary" />);
      expect(screen.getByTestId('custom-summary')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<ScalePitfallsSummary className="custom-class" />);
      const summary = screen.getByTestId('scale-pitfalls-summary');
      expect(summary.className).toContain('custom-class');
    });
  });
});
