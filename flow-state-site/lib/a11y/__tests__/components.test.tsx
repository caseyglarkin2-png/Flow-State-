/**
 * Tests for Accessibility Components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  VisuallyHidden,
  SkipLink,
  LiveRegion,
  LoadingSpinner,
  ProgressBar,
  ErrorMessage,
} from '../components';

describe('VisuallyHidden', () => {
  it('renders content with sr-only class', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    const element = screen.getByText('Hidden text');
    expect(element).toHaveClass('sr-only');
  });

  it('renders as custom element', () => {
    render(<VisuallyHidden as="div">Hidden div</VisuallyHidden>);
    const element = screen.getByText('Hidden div');
    expect(element.tagName).toBe('DIV');
  });
});

describe('SkipLink', () => {
  it('renders with correct href', () => {
    render(<SkipLink targetId="main-content" />);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders custom text', () => {
    render(<SkipLink targetId="nav">Skip navigation</SkipLink>);
    expect(screen.getByText('Skip navigation')).toBeInTheDocument();
  });

  it('has sr-only class initially', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('sr-only');
  });
});

describe('LiveRegion', () => {
  it('renders with aria-live polite by default', () => {
    render(<LiveRegion>Update</LiveRegion>);
    const region = screen.getByText('Update').closest('div');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('renders with aria-live assertive when specified', () => {
    render(<LiveRegion mode="assertive">Alert!</LiveRegion>);
    const region = screen.getByText('Alert!').closest('div');
    expect(region).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders with aria-atomic true by default', () => {
    render(<LiveRegion>Content</LiveRegion>);
    const region = screen.getByText('Content').closest('div');
    expect(region).toHaveAttribute('aria-atomic', 'true');
  });
});

describe('LoadingSpinner', () => {
  it('renders with status role', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default Loading label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts custom label', () => {
    render(<LoadingSpinner label="Calculating..." />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Calculating...');
  });
});

describe('ProgressBar', () => {
  it('renders with progressbar role', () => {
    render(<ProgressBar value={50} label="Progress" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets correct aria values', () => {
    render(<ProgressBar value={30} max={100} label="Loading" />);
    const progressbar = screen.getByRole('progressbar');
    
    expect(progressbar).toHaveAttribute('aria-valuenow', '30');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows value when showValue is true', () => {
    render(<ProgressBar value={75} label="Progress" showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides value by default', () => {
    render(<ProgressBar value={75} label="Progress" />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });
});

describe('ErrorMessage', () => {
  it('renders with alert role', () => {
    render(<ErrorMessage id="error-1">Error occurred</ErrorMessage>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has correct id', () => {
    render(<ErrorMessage id="field-error">Invalid input</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'field-error');
  });

  it('has aria-live polite', () => {
    render(<ErrorMessage id="err">Error</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
  });
});
