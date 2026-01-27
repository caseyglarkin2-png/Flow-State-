/**
 * Tests for CoDevTrackSelector Component
 * Sprint 2.2: Unit Tests for Tabbed Co-Dev Selector
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  CoDevTrackSelector, 
  CoDevTrackSelectorCompact 
} from '../CoDevTrackSelector';
import { FLATBED_TRACK, REEFER_TRACK, type CoDevTrack } from '@/lib/content';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    article: ({ children, onClick, onKeyDown, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article 
        {...props} 
        onClick={onClick as React.MouseEventHandler}
        onKeyDown={onKeyDown as React.KeyboardEventHandler}
      >
        {children}
      </article>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => true,
}));

describe('CoDevTrackSelector Component', () => {
  const mockTracks: CoDevTrack[] = [FLATBED_TRACK, REEFER_TRACK];

  describe('Rendering', () => {
    it('should render with test ID', () => {
      render(<CoDevTrackSelector />);
      expect(screen.getByTestId('codev-track-selector')).toBeInTheDocument();
    });

    it('should render track tabs', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      expect(screen.getByTestId('tab-flatbed')).toBeInTheDocument();
      expect(screen.getByTestId('tab-reefer')).toBeInTheDocument();
    });

    it('should display track names', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // displayName is "Flatbed Track" but we strip " Track"
      expect(screen.getByText('Flatbed')).toBeInTheDocument();
      expect(screen.getByText('Reefer')).toBeInTheDocument();
    });

    it('should show opportunity count in tabs', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // Both tracks have 4 opportunities
      const countBadges = screen.getAllByText('(4)');
      expect(countBadges.length).toBe(2);
    });

    it('should have accessible aria-label', () => {
      render(<CoDevTrackSelector />);
      expect(screen.getByLabelText('Co-development track selector')).toBeInTheDocument();
    });
  });

  describe('Tab Interaction', () => {
    it('should start with flatbed selected by default', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      const flatbedTab = screen.getByTestId('tab-flatbed');
      expect(flatbedTab).toHaveAttribute('aria-selected', 'true');
    });

    it('should respect defaultTrack prop', () => {
      render(<CoDevTrackSelector tracks={mockTracks} defaultTrack="reefer" />);
      
      const reeferTab = screen.getByTestId('tab-reefer');
      expect(reeferTab).toHaveAttribute('aria-selected', 'true');
    });

    it('should switch tabs on click', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      const reeferTab = screen.getByTestId('tab-reefer');
      fireEvent.click(reeferTab);
      
      expect(reeferTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('tab-flatbed')).toHaveAttribute('aria-selected', 'false');
    });

    it('should call onTrackChange when switching tabs', () => {
      const onTrackChange = vi.fn();
      render(
        <CoDevTrackSelector 
          tracks={mockTracks} 
          onTrackChange={onTrackChange} 
        />
      );
      
      const reeferTab = screen.getByTestId('tab-reefer');
      fireEvent.click(reeferTab);
      
      expect(onTrackChange).toHaveBeenCalledWith('reefer');
    });
  });

  describe('Opportunities Display', () => {
    it('should display flatbed opportunities by default', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // Check for flatbed opportunity IDs from content model
      expect(screen.getByTestId('opportunity-flatbed-tarping')).toBeInTheDocument();
      expect(screen.getByTestId('opportunity-flatbed-gate-workflow')).toBeInTheDocument();
    });

    it('should display reefer opportunities when reefer tab selected', () => {
      render(<CoDevTrackSelector tracks={mockTracks} defaultTrack="reefer" />);
      
      // Check for reefer opportunity IDs from content model
      expect(screen.getByTestId('opportunity-reefer-cold-chain')).toBeInTheDocument();
      expect(screen.getByTestId('opportunity-reefer-compliance')).toBeInTheDocument();
    });

    it('should display priority badges', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // Flatbed has high and medium priorities
      expect(screen.getAllByText('high').length).toBeGreaterThan(0);
    });

    it('should display benefit text', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // Check for benefit prefix
      expect(screen.getAllByText('Benefit:').length).toBeGreaterThan(0);
    });
  });

  describe('Opportunity Interaction', () => {
    it('should call onOpportunitySelect when opportunity clicked', () => {
      const onOpportunitySelect = vi.fn();
      render(
        <CoDevTrackSelector 
          tracks={mockTracks} 
          onOpportunitySelect={onOpportunitySelect} 
        />
      );
      
      const firstOpportunity = screen.getByTestId('opportunity-flatbed-tarping');
      fireEvent.click(firstOpportunity);
      
      expect(onOpportunitySelect).toHaveBeenCalledTimes(1);
      expect(onOpportunitySelect.mock.calls[0][0]).toHaveProperty('id', 'flatbed-tarping');
    });

    it('should handle keyboard selection with Enter key', () => {
      const onOpportunitySelect = vi.fn();
      render(
        <CoDevTrackSelector 
          tracks={mockTracks} 
          onOpportunitySelect={onOpportunitySelect} 
        />
      );
      
      const firstOpportunity = screen.getByTestId('opportunity-flatbed-tarping');
      fireEvent.keyDown(firstOpportunity, { key: 'Enter' });
      
      expect(onOpportunitySelect).toHaveBeenCalledTimes(1);
    });

    it('should handle keyboard selection with Space key', () => {
      const onOpportunitySelect = vi.fn();
      render(
        <CoDevTrackSelector 
          tracks={mockTracks} 
          onOpportunitySelect={onOpportunitySelect} 
        />
      );
      
      const firstOpportunity = screen.getByTestId('opportunity-flatbed-tarping');
      fireEvent.keyDown(firstOpportunity, { key: ' ' });
      
      expect(onOpportunitySelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('Track CTA', () => {
    it('should display track CTA', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      expect(screen.getByTestId('track-cta')).toBeInTheDocument();
    });

    it('should show correct CTA label for active track', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      // Flatbed CTA (generated from displayName)
      expect(screen.getByText('Apply for Flatbed Co-Dev')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom testId', () => {
      render(<CoDevTrackSelector testId="custom-selector" />);
      expect(screen.getByTestId('custom-selector')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<CoDevTrackSelector className="custom-class" />);
      const selector = screen.getByTestId('codev-track-selector');
      expect(selector.className).toContain('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should have tablist role on tabs container', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('should have tab role on each tab', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(2);
    });

    it('should have tabpanel role on opportunities grid', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should have button role on opportunity cards', () => {
      render(<CoDevTrackSelector tracks={mockTracks} />);
      
      const buttons = screen.getAllByRole('button');
      // 2 tabs + 4 opportunity cards + 1 CTA = 7
      expect(buttons.length).toBeGreaterThanOrEqual(4);
    });
  });
});

describe('CoDevTrackSelectorCompact Component', () => {
  describe('Rendering', () => {
    it('should render compact variant with test ID', () => {
      render(<CoDevTrackSelectorCompact />);
      expect(screen.getByTestId('codev-selector-compact')).toBeInTheDocument();
    });

    it('should display track name', () => {
      render(<CoDevTrackSelectorCompact trackId="flatbed" />);
      expect(screen.getByText('Flatbed')).toBeInTheDocument();
    });

    it('should show limited opportunities by default', () => {
      render(<CoDevTrackSelectorCompact maxOpportunities={2} />);
      
      // Should show "2 of 4" opportunities
      expect(screen.getByText('(2 of 4)')).toBeInTheDocument();
    });

    it('should respect maxOpportunities prop', () => {
      render(<CoDevTrackSelectorCompact maxOpportunities={1} />);
      expect(screen.getByText('(1 of 4)')).toBeInTheDocument();
    });

    it('should accept custom testId', () => {
      render(<CoDevTrackSelectorCompact testId="compact-custom" />);
      expect(screen.getByTestId('compact-custom')).toBeInTheDocument();
    });
  });

  describe('Track Selection', () => {
    it('should display flatbed by default', () => {
      render(<CoDevTrackSelectorCompact />);
      expect(screen.getByText('Flatbed')).toBeInTheDocument();
    });

    it('should display reefer when specified', () => {
      render(<CoDevTrackSelectorCompact trackId="reefer" />);
      expect(screen.getByText('Reefer')).toBeInTheDocument();
    });
  });
});
