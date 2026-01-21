/**
 * Industrial Input Components Tests
 * 
 * Accessibility and functionality tests for industrial UI components.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IndustrialSlider from '../IndustrialSlider';
import IndustrialSwitch from '../IndustrialSwitch';
import IndustrialNumericInput from '../IndustrialNumericInput';

describe('IndustrialSlider', () => {
  const defaultProps = {
    label: 'Volume',
    value: 50,
    onChange: vi.fn(),
    min: 0,
    max: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and value', () => {
    render(<IndustrialSlider {...defaultProps} />);
    
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('displays unit when provided', () => {
    render(<IndustrialSlider {...defaultProps} unit="min" />);
    
    expect(screen.getByText('50 min')).toBeInTheDocument();
    expect(screen.getByText('0 min')).toBeInTheDocument();
    expect(screen.getByText('100 min')).toBeInTheDocument();
  });

  it('displays hint when provided', () => {
    render(<IndustrialSlider {...defaultProps} hint="Adjust trailer volume" />);
    
    expect(screen.getByText('Adjust trailer volume')).toBeInTheDocument();
  });

  it('calls onChange with new value', () => {
    render(<IndustrialSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(75);
  });

  it('supports decimal step values', () => {
    render(<IndustrialSlider {...defaultProps} value={0.5} step={0.1} />);
    
    expect(screen.getByText('0.50')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<IndustrialSlider {...defaultProps} disabled />);
    
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('has proper aria-describedby when hint is provided', () => {
    render(<IndustrialSlider {...defaultProps} hint="A hint" />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-describedby');
  });
});

describe('IndustrialSwitch', () => {
  const defaultProps = {
    label: 'Enable feature',
    checked: false,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label', () => {
    render(<IndustrialSwitch {...defaultProps} />);
    
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('has correct role and aria-checked', () => {
    render(<IndustrialSwitch {...defaultProps} />);
    
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  it('updates aria-checked when checked', () => {
    render(<IndustrialSwitch {...defaultProps} checked={true} />);
    
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  it('displays description when provided', () => {
    render(<IndustrialSwitch {...defaultProps} description="Toggle this setting" />);
    
    expect(screen.getByText('Toggle this setting')).toBeInTheDocument();
  });

  it('calls onChange on click', () => {
    render(<IndustrialSwitch {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('switch'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('toggles off when clicked while checked', () => {
    render(<IndustrialSwitch {...defaultProps} checked={true} />);
    
    fireEvent.click(screen.getByRole('switch'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(false);
  });

  it('responds to Space key', () => {
    render(<IndustrialSwitch {...defaultProps} />);
    
    const switchEl = screen.getByRole('switch');
    fireEvent.keyDown(switchEl, { key: ' ' });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('responds to Enter key', () => {
    render(<IndustrialSwitch {...defaultProps} />);
    
    const switchEl = screen.getByRole('switch');
    fireEvent.keyDown(switchEl, { key: 'Enter' });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    render(<IndustrialSwitch {...defaultProps} disabled />);
    
    fireEvent.click(screen.getByRole('switch'));
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });
});

describe('IndustrialNumericInput', () => {
  const defaultProps = {
    label: 'Count',
    value: 10,
    onChange: vi.fn(),
    min: 0,
    max: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and value', () => {
    render(<IndustrialNumericInput {...defaultProps} />);
    
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('displays prefix when provided', () => {
    render(<IndustrialNumericInput {...defaultProps} prefix="$" />);
    
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('displays unit when provided', () => {
    render(<IndustrialNumericInput {...defaultProps} unit="min" />);
    
    expect(screen.getByText('min')).toBeInTheDocument();
  });

  it('has increment and decrement buttons', () => {
    render(<IndustrialNumericInput {...defaultProps} />);
    
    expect(screen.getByLabelText('Decrease Count')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Count')).toBeInTheDocument();
  });

  it('increments value when increment button clicked', () => {
    render(<IndustrialNumericInput {...defaultProps} step={1} />);
    
    fireEvent.click(screen.getByLabelText('Increase Count'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(11);
  });

  it('decrements value when decrement button clicked', () => {
    render(<IndustrialNumericInput {...defaultProps} step={1} />);
    
    fireEvent.click(screen.getByLabelText('Decrease Count'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(9);
  });

  it('clamps value to min on blur', () => {
    render(<IndustrialNumericInput {...defaultProps} value={5} min={0} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '-10' } });
    fireEvent.blur(input);
    
    // On blur, value is clamped to min
    expect(defaultProps.onChange).toHaveBeenCalledWith(0);
  });

  it('clamps value to max on change', () => {
    render(<IndustrialNumericInput {...defaultProps} value={50} max={100} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '150' } });
    
    // Value is clamped to max
    expect(defaultProps.onChange).toHaveBeenCalledWith(100);
  });

  it('disables decrement button at min', () => {
    render(<IndustrialNumericInput {...defaultProps} value={0} />);
    
    expect(screen.getByLabelText('Decrease Count')).toBeDisabled();
  });

  it('disables increment button at max', () => {
    render(<IndustrialNumericInput {...defaultProps} value={100} />);
    
    expect(screen.getByLabelText('Increase Count')).toBeDisabled();
  });

  it('displays hint when provided', () => {
    render(<IndustrialNumericInput {...defaultProps} hint="Enter a count" />);
    
    expect(screen.getByText('Enter a count')).toBeInTheDocument();
  });

  it('supports ArrowUp/ArrowDown keys', () => {
    render(<IndustrialNumericInput {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(defaultProps.onChange).toHaveBeenCalledWith(11);
    
    vi.clearAllMocks();
    
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(defaultProps.onChange).toHaveBeenCalledWith(9);
  });

  it('formats decimal values correctly', () => {
    render(<IndustrialNumericInput {...defaultProps} value={0.5} step={0.01} />);
    
    expect(screen.getByDisplayValue('0.50')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<IndustrialNumericInput {...defaultProps} disabled />);
    
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByLabelText('Decrease Count')).toBeDisabled();
    expect(screen.getByLabelText('Increase Count')).toBeDisabled();
  });
});
