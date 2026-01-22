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
});
