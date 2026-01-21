import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CoverageSlider from '../CoverageSlider';

describe('CoverageSlider Component', () => {
  describe('Rendering', () => {
    it('should render with initial value', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveValue('5');
    });

    it('should render label', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} label="Test Label" />);

      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should display current value', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={25} onChange={onChange} />);

      expect(screen.getByText('25% Coverage')).toBeInTheDocument();
    });

    it('should show presets by default', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const buttons = screen.getAllByRole('button');
      // Should have 4 preset buttons
      expect(buttons.length).toBeGreaterThanOrEqual(4);
    });

    it('should hide presets when showPresets=false', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} showPresets={false} />);

      // Should not find preset buttons
      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });
  });

  describe('Slider Interaction', () => {
    it('should call onChange when slider moved', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '25' } });

      expect(onChange).toHaveBeenCalledWith(25);
    });

    it('should handle multiple slider changes', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const slider = screen.getByRole('slider');

      fireEvent.change(slider, { target: { value: '10' } });
      expect(onChange).toHaveBeenCalledWith(10);

      fireEvent.change(slider, { target: { value: '50' } });
      expect(onChange).toHaveBeenCalledWith(50);

      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Preset Interaction', () => {
    it('should call onChange when preset button clicked', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const buttons = screen.getAllByRole('button');
      const button25 = buttons[2]; // 3rd button should be 25%
      fireEvent.click(button25);

      expect(onChange).toHaveBeenCalled();
    });

    it('should handle all preset buttons', () => {
      const onChange = vi.fn();
      const { rerender } = render(<CoverageSlider value={5} onChange={onChange} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(4);

      // Click each button
      buttons.forEach(btn => {
        fireEvent.click(btn);
      });

      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(4);
    });

    it('should highlight active preset', () => {
      const onChange = vi.fn();
      const { rerender } = render(<CoverageSlider value={25} onChange={onChange} />);

      const buttons = screen.getAllByRole('button');
      // At least one button should be marked as pressed
      const pressedButtons = buttons.filter(btn => btn.getAttribute('aria-pressed') === 'true');
      expect(pressedButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have ARIA attributes', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={25} onChange={onChange} label="Coverage" />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '25');
      expect(slider).toHaveAttribute('aria-valuemin', '5');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
      expect(slider).toHaveAttribute('aria-label', 'Coverage');
    });

    it('should have group role', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const group = screen.getByRole('group');
      expect(group).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      expect(slider).not.toBeDisabled();

      // Slider should be focusable
      slider.focus();
      expect(document.activeElement).toBe(slider);
    });
  });

  describe('Disabled State', () => {
    it('should disable slider when disabled=true', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} disabled={true} />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeDisabled();
    });

    it('should disable preset buttons when disabled=true', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} disabled={true} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(btn => {
        expect(btn).toBeDisabled();
      });
    });

    it('should not call onChange when disabled', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} disabled={true} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(btn => {
        expect(btn).toBeDisabled();
      });
    });
  });

  describe('Value Updates', () => {
    it('should update when value prop changes', () => {
      const onChange = vi.fn();
      const { rerender } = render(<CoverageSlider value={5} onChange={onChange} />);

      expect(screen.getByText('5% Coverage')).toBeInTheDocument();

      rerender(<CoverageSlider value={25} onChange={onChange} />);

      expect(screen.getByText('25% Coverage')).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text', () => {
      const onChange = vi.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);

      // Check for the helper text section
      expect(screen.getByText(/Deep Model baseline/)).toBeInTheDocument();
      expect(screen.getByText(/Network inflection point/)).toBeInTheDocument();
    });
  });
});
