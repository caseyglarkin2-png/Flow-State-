import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NetworkMap, { FacilityNode, NetworkConnection } from './NetworkMap';

// Mock the reduced motion hook
vi.mock('@/lib/ssr-safe-motion', () => ({
  useSSRSafeReducedMotion: () => false,
}));

const mockFacilities: FacilityNode[] = [
  { id: 'hub-1', name: 'Chicago Hub', x: 50, y: 30, type: 'hub', size: 'lg' },
  { id: 'spoke-1', name: 'Detroit', x: 70, y: 25, type: 'spoke' },
  { id: 'spoke-2', name: 'St. Louis', x: 45, y: 55, type: 'spoke' },
  { id: 'spoke-3', name: 'Indianapolis', x: 60, y: 45, type: 'spoke' },
];

const mockConnections: NetworkConnection[] = [
  { from: 'hub-1', to: 'spoke-1', strength: 0.8 },
  { from: 'hub-1', to: 'spoke-2', strength: 0.6 },
  { from: 'hub-1', to: 'spoke-3', strength: 0.9 },
];

describe('NetworkMap', () => {
  it('renders without crashing', () => {
    render(<NetworkMap facilities={mockFacilities} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders all facility nodes', () => {
    render(<NetworkMap facilities={mockFacilities} showLabels={true} />);
    expect(screen.getByText('Chicago Hub')).toBeInTheDocument();
    expect(screen.getByText('Detroit')).toBeInTheDocument();
    expect(screen.getByText('St. Louis')).toBeInTheDocument();
    expect(screen.getByText('Indianapolis')).toBeInTheDocument();
  });

  it('has correct aria label for accessibility', () => {
    render(<NetworkMap facilities={mockFacilities} />);
    expect(screen.getByLabelText(/Network map showing facility connections/i)).toBeInTheDocument();
  });

  it('calls onNodeClick when a node is clicked', () => {
    const handleClick = vi.fn();
    render(
      <NetworkMap 
        facilities={mockFacilities} 
        onNodeClick={handleClick} 
        interactive={true}
      />
    );
    
    const chicagoNode = screen.getByRole('button', { name: /Chicago Hub/i });
    fireEvent.click(chicagoNode);
    
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'hub-1', name: 'Chicago Hub' })
    );
  });

  it('calls onNodeHover when hovering over a node', () => {
    const handleHover = vi.fn();
    render(
      <NetworkMap 
        facilities={mockFacilities} 
        onNodeHover={handleHover}
        interactive={true}
      />
    );
    
    const detroitNode = screen.getByRole('button', { name: /Detroit/i });
    fireEvent.mouseEnter(detroitNode);
    
    expect(handleHover).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'spoke-1', name: 'Detroit' })
    );
  });

  it('renders connections when provided', () => {
    const { container } = render(
      <NetworkMap facilities={mockFacilities} connections={mockConnections} />
    );
    
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(3);
  });

  it('auto-generates connections when none provided', () => {
    const { container } = render(
      <NetworkMap facilities={mockFacilities} />
    );
    
    const lines = container.querySelectorAll('line');
    // Should have some auto-generated connections based on proximity
    expect(lines.length).toBeGreaterThan(0);
  });

  it('hides labels when showLabels is false', () => {
    render(<NetworkMap facilities={mockFacilities} showLabels={false} />);
    expect(screen.queryByText('Chicago Hub')).not.toBeInTheDocument();
  });

  it('disables interactivity when interactive is false', () => {
    const handleClick = vi.fn();
    render(
      <NetworkMap 
        facilities={mockFacilities} 
        onNodeClick={handleClick}
        interactive={false}
      />
    );
    
    // Nodes should not have button role when not interactive
    const nodes = screen.queryAllByRole('button');
    expect(nodes.length).toBe(0);
  });

  it('displays facility metrics in tooltip aria-label', () => {
    const facilitiesWithMetrics: FacilityNode[] = [
      { 
        id: 'test-1', 
        name: 'Test Facility', 
        x: 50, 
        y: 50,
        metrics: { turnsPerDay: 120, dwellTime: 45, efficiency: 92 }
      },
    ];
    
    render(<NetworkMap facilities={facilitiesWithMetrics} />);
    expect(screen.getByRole('button', { name: /Test Facility: 120 turns\/day/i })).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    render(
      <NetworkMap 
        facilities={mockFacilities} 
        onNodeClick={handleClick}
        interactive={true}
      />
    );
    
    const chicagoNode = screen.getByRole('button', { name: /Chicago Hub/i });
    chicagoNode.focus();
    fireEvent.keyDown(chicagoNode, { key: 'Enter' });
    
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders with custom dimensions', () => {
    const { container } = render(
      <NetworkMap 
        facilities={mockFacilities} 
        width={800}
        height={600}
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 800 600');
  });
});
