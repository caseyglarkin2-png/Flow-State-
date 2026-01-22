import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NetworkMap from '../index';
import FacilityNode from '../FacilityNode';
import Connections from '../Connections';
import Tooltip from '../Tooltip';
import { Facility, Connection, ARCHETYPE_COLORS, ARCHETYPE_LABELS } from '../types';

const mockFacilities: Facility[] = [
  { id: 'f1', name: 'Facility 1', archetype: 'gated', x: 100, y: 100 },
  { id: 'f2', name: 'Facility 2', archetype: 'open', x: 200, y: 200 },
  { id: 'f3', name: 'Facility 3', archetype: 'cross-dock', x: 300, y: 150 },
];

const mockConnections: Connection[] = [
  { from: 'f1', to: 'f2', strength: 5 },
  { from: 'f2', to: 'f3', strength: 8, type: 'primary' },
];

describe('NetworkMap', () => {
  describe('index component', () => {
    it('renders SVG with accessible role and label', () => {
      render(<NetworkMap facilities={mockFacilities} />);
      
      const svg = screen.getByRole('img');
      expect(svg).toHaveAttribute('aria-label', 'Facility network map showing connected locations');
    });

    it('renders all facility nodes', () => {
      render(<NetworkMap facilities={mockFacilities} />);
      
      expect(screen.getByText('Facility 1')).toBeInTheDocument();
      expect(screen.getByText('Facility 2')).toBeInTheDocument();
      expect(screen.getByText('Facility 3')).toBeInTheDocument();
    });

    it('calls onFacilityClick when node is clicked', () => {
      const onClick = vi.fn();
      render(<NetworkMap facilities={mockFacilities} onFacilityClick={onClick} />);
      
      const node = screen.getByRole('button', { name: /Facility 1/i });
      fireEvent.click(node);
      
      expect(onClick).toHaveBeenCalledWith(mockFacilities[0]);
    });
  });

  describe('FacilityNode', () => {
    const mockFacility: Facility = { 
      id: 'test', 
      name: 'Test Facility', 
      archetype: 'gated', 
      x: 100, 
      y: 100 
    };

    it('renders with correct color for archetype', () => {
      const { container } = render(
        <svg>
          <FacilityNode 
            facility={mockFacility}
            isHovered={false}
            onClick={() => {}}
            onHover={() => {}}
          />
        </svg>
      );
      
      const circle = container.querySelector('circle[r="20"]');
      expect(circle).toHaveAttribute('fill', ARCHETYPE_COLORS.gated);
    });

    it('has accessible name with facility name and type', () => {
      render(
        <svg>
          <FacilityNode 
            facility={mockFacility}
            isHovered={false}
            onClick={() => {}}
            onHover={() => {}}
          />
        </svg>
      );
      
      const node = screen.getByRole('button');
      expect(node).toHaveAttribute('aria-label', `Test Facility, ${ARCHETYPE_LABELS.gated}`);
    });

    it('responds to Enter key press', () => {
      const onClick = vi.fn();
      render(
        <svg>
          <FacilityNode 
            facility={mockFacility}
            isHovered={false}
            onClick={onClick}
            onHover={() => {}}
          />
        </svg>
      );
      
      const node = screen.getByRole('button');
      fireEvent.keyDown(node, { key: 'Enter' });
      
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Connections', () => {
    it('renders connection lines between facilities', () => {
      const { container } = render(
        <svg>
          <Connections connections={mockConnections} facilities={mockFacilities} />
        </svg>
      );
      
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(2);
    });

    it('applies correct stroke width based on strength', () => {
      const { container } = render(
        <svg>
          <Connections connections={mockConnections} facilities={mockFacilities} />
        </svg>
      );
      
      const lines = container.querySelectorAll('line');
      // strength 5 → 2px, strength 8 → 3.2px
      expect(parseFloat(lines[0].getAttribute('stroke-width') || '0')).toBeCloseTo(2, 0);
      expect(parseFloat(lines[1].getAttribute('stroke-width') || '0')).toBeCloseTo(3.2, 0);
    });

    it('skips connections with missing facilities', () => {
      const badConnection: Connection[] = [
        { from: 'f1', to: 'nonexistent', strength: 5 },
      ];
      
      const { container } = render(
        <svg>
          <Connections connections={badConnection} facilities={mockFacilities} />
        </svg>
      );
      
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(0);
    });
  });

  describe('Tooltip', () => {
    const mockFacility: Facility = {
      id: 'test',
      name: 'Test Hub',
      archetype: 'manufacturing',
      x: 100,
      y: 100,
      location: 'Test City, ST',
      metrics: { movesPerDay: 500, dwellTime: 45, drivers: 800 },
    };

    it('renders facility name and type', () => {
      render(<Tooltip facility={mockFacility} x={50} y={50} />);
      
      expect(screen.getByText('Test Hub')).toBeInTheDocument();
      expect(screen.getByText('Manufacturing')).toBeInTheDocument();
    });

    it('shows location when provided', () => {
      render(<Tooltip facility={mockFacility} x={50} y={50} />);
      
      expect(screen.getByText(/Test City, ST/)).toBeInTheDocument();
    });

    it('shows metrics when provided', () => {
      render(<Tooltip facility={mockFacility} x={50} y={50} />);
      
      expect(screen.getByText('500')).toBeInTheDocument(); // movesPerDay
      expect(screen.getByText('45min')).toBeInTheDocument(); // dwellTime
      expect(screen.getByText('800')).toBeInTheDocument(); // drivers
    });
  });

  describe('types', () => {
    it('has colors for all archetypes', () => {
      expect(ARCHETYPE_COLORS.gated).toBeDefined();
      expect(ARCHETYPE_COLORS.open).toBeDefined();
      expect(ARCHETYPE_COLORS['cross-dock']).toBeDefined();
      expect(ARCHETYPE_COLORS.manufacturing).toBeDefined();
    });

    it('has labels for all archetypes', () => {
      expect(ARCHETYPE_LABELS.gated).toBe('Gated Facility');
      expect(ARCHETYPE_LABELS.open).toBe('Open Yard');
      expect(ARCHETYPE_LABELS['cross-dock']).toBe('Cross-Dock');
      expect(ARCHETYPE_LABELS.manufacturing).toBe('Manufacturing');
    });
  });
});
