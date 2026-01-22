import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ProtocolGuardIcon,
  ProtocolCommsIcon,
  ProtocolBOLIcon,
  ProtocolYMSIcon,
} from '../icons/ProtocolIcons';

describe('Protocol Icon Components', () => {
  describe('ProtocolGuardIcon', () => {
    it('renders SVG element', () => {
      render(<ProtocolGuardIcon />);
      const icon = screen.getByRole('img', { name: /digital guard/i });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('applies size prop correctly', () => {
      const { rerender } = render(<ProtocolGuardIcon size={24} />);
      let icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');

      rerender(<ProtocolGuardIcon size={64} />);
      icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '64');
      expect(icon).toHaveAttribute('height', '64');
    });

    it('applies color prop to stroke', () => {
      const { container } = render(<ProtocolGuardIcon color="#FF0000" />);
      const paths = container.querySelectorAll('path, rect, circle');
      const hasRedStroke = Array.from(paths).some(
        (el) => el.getAttribute('stroke') === '#FF0000' || el.getAttribute('fill') === '#FF0000'
      );
      expect(hasRedStroke).toBe(true);
    });

    it('uses default neon color when color not provided', () => {
      const { container } = render(<ProtocolGuardIcon />);
      const paths = container.querySelectorAll('path, rect, circle');
      const hasNeonStroke = Array.from(paths).some(
        (el) => el.getAttribute('stroke') === '#00B4FF' || el.getAttribute('fill') === '#00B4FF'
      );
      expect(hasNeonStroke).toBe(true);
    });

    it('applies aria-label for accessibility', () => {
      render(<ProtocolGuardIcon aria-label="Custom guard label" />);
      expect(screen.getByRole('img', { name: 'Custom guard label' })).toBeInTheDocument();
    });

    it('uses default size of 48', () => {
      render(<ProtocolGuardIcon />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '48');
      expect(icon).toHaveAttribute('height', '48');
    });
  });

  describe('ProtocolCommsIcon', () => {
    it('renders SVG element', () => {
      render(<ProtocolCommsIcon />);
      const icon = screen.getByRole('img', { name: /digital comms/i });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('applies size prop correctly', () => {
      render(<ProtocolCommsIcon size={32} />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('height', '32');
    });

    it('applies custom aria-label', () => {
      render(<ProtocolCommsIcon aria-label="Communication module" />);
      expect(screen.getByRole('img', { name: 'Communication module' })).toBeInTheDocument();
    });
  });

  describe('ProtocolBOLIcon', () => {
    it('renders SVG element', () => {
      render(<ProtocolBOLIcon />);
      const icon = screen.getByRole('img', { name: /digital bol/i });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('applies size prop correctly', () => {
      render(<ProtocolBOLIcon size={48} />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '48');
      expect(icon).toHaveAttribute('height', '48');
    });

    it('applies className', () => {
      render(<ProtocolBOLIcon className="custom-class" />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveClass('custom-class');
    });
  });

  describe('ProtocolYMSIcon', () => {
    it('renders SVG element', () => {
      render(<ProtocolYMSIcon />);
      const icon = screen.getByRole('img', { name: /digital yms/i });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('applies size prop correctly', () => {
      render(<ProtocolYMSIcon size={64} />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('width', '64');
      expect(icon).toHaveAttribute('height', '64');
    });

    it('applies color prop', () => {
      const { container } = render(<ProtocolYMSIcon color="#00FF00" />);
      const elements = container.querySelectorAll('[stroke], [fill]');
      const hasGreenColor = Array.from(elements).some(
        (el) => el.getAttribute('stroke') === '#00FF00' || el.getAttribute('fill') === '#00FF00'
      );
      expect(hasGreenColor).toBe(true);
    });
  });

  describe('Icon size constraints', () => {
    it('all icons should be <2KB when rendered', () => {
      const { container: guardContainer } = render(<ProtocolGuardIcon />);
      const { container: commsContainer } = render(<ProtocolCommsIcon />);
      const { container: bolContainer } = render(<ProtocolBOLIcon />);
      const { container: ymsContainer } = render(<ProtocolYMSIcon />);

      // Serialize SVG and check approximate size
      const guardSize = guardContainer.innerHTML.length;
      const commsSize = commsContainer.innerHTML.length;
      const bolSize = bolContainer.innerHTML.length;
      const ymsSize = ymsContainer.innerHTML.length;

      // Each should be under 2048 bytes (2KB) as HTML string
      expect(guardSize).toBeLessThan(2048);
      expect(commsSize).toBeLessThan(2048);
      expect(bolSize).toBeLessThan(2048);
      expect(ymsSize).toBeLessThan(2048);
    });
  });

  describe('Brand aesthetic compliance', () => {
    it('Guard icon has crosshair lines (not shield)', () => {
      const { container } = render(<ProtocolGuardIcon />);
      // Should have crosshair path pattern
      const crosshairPath = container.querySelector('path[d*="M24 4v8"]');
      expect(crosshairPath).toBeInTheDocument();
      // Should NOT have shield path (old design)
      const shieldPath = container.querySelector('path[d*="L10 10v10c0"]');
      expect(shieldPath).not.toBeInTheDocument();
    });

    it('Comms icon has bidirectional pulse arcs (not chat bubble)', () => {
      const { container } = render(<ProtocolCommsIcon />);
      // Should have arc paths for signal pulses
      const leftPulse = container.querySelector('path[d*="M8 16a12"]');
      const rightPulse = container.querySelector('path[d*="M40 16a12"]');
      expect(leftPulse).toBeInTheDocument();
      expect(rightPulse).toBeInTheDocument();
      // Should NOT have chat bubble path (old design)
      const bubblePath = container.querySelector('path[d*="M12 8h24a4"]');
      expect(bubblePath).not.toBeInTheDocument();
    });

    it('BOL icon has 3x3 grid (not document shape)', () => {
      const { container } = render(<ProtocolBOLIcon />);
      // Should have 9 grid rectangles
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBe(9);
      // Should NOT have document corner fold (old design)
      const foldPath = container.querySelector('path[d*="M30 6v8h8"]');
      expect(foldPath).not.toBeInTheDocument();
    });

    it('YMS icon has triangular network nodes (not bar chart)', () => {
      const { container } = render(<ProtocolYMSIcon />);
      // Should have 3 outer node circles + 3 inner fill circles + 2 hub circles = 8+
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(8);
      // Should NOT have bar chart rects (old design)
      const chartRects = container.querySelectorAll('rect[x="36"]');
      expect(chartRects.length).toBe(0);
    });

    it('all icons use geometric shapes (circles, lines, paths)', () => {
      const { container: g } = render(<ProtocolGuardIcon />);
      const { container: c } = render(<ProtocolCommsIcon />);
      const { container: b } = render(<ProtocolBOLIcon />);
      const { container: y } = render(<ProtocolYMSIcon />);

      // All should have circles (geometric)
      expect(g.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(c.querySelectorAll('circle').length).toBeGreaterThan(0);
      expect(y.querySelectorAll('circle').length).toBeGreaterThan(0);
      
      // BOL uses rects for grid
      expect(b.querySelectorAll('rect').length).toBe(9);
    });
  });

  describe('Stroke scaling', () => {
    it('stroke widths scale with size prop', () => {
      const { container: small } = render(<ProtocolGuardIcon size={24} />);
      const { container: large } = render(<ProtocolGuardIcon size={64} />);
      
      // Get stroke-width attributes (as numbers)
      const smallStrokes = Array.from(small.querySelectorAll('[stroke-width]'))
        .map(el => parseFloat(el.getAttribute('stroke-width') || '0'));
      const largeStrokes = Array.from(large.querySelectorAll('[stroke-width]'))
        .map(el => parseFloat(el.getAttribute('stroke-width') || '0'));
      
      // Average stroke should be smaller for 24px vs 64px
      const avgSmall = smallStrokes.reduce((a, b) => a + b, 0) / smallStrokes.length;
      const avgLarge = largeStrokes.reduce((a, b) => a + b, 0) / largeStrokes.length;
      
      expect(avgSmall).toBeLessThan(avgLarge);
    });
  });
});
