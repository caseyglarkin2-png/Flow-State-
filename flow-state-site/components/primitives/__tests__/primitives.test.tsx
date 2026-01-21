import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section, Card, Stat, Callout } from '../index';

describe('Primitives', () => {
  describe('Section', () => {
    it('should render children', () => {
      render(<Section>Test content</Section>);
      expect(screen.getByText('Test content')).toBeTruthy();
    });

    it('should render title and subtitle', () => {
      render(
        <Section title="Test Title" subtitle="Test Subtitle">
          Content
        </Section>
      );
      expect(screen.getByText('Test Title')).toBeTruthy();
      expect(screen.getByText('Test Subtitle')).toBeTruthy();
    });

    it('should apply light variant styling', () => {
      const { container } = render(<Section variant="light">Content</Section>);
      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-gray-50');
    });

    it('should apply dark variant styling (default)', () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-void');
    });

    it('should accept custom className', () => {
      const { container } = render(<Section className="custom-class">Content</Section>);
      const section = container.querySelector('section');
      expect(section?.className).toContain('custom-class');
    });

    it('should set id for anchor links', () => {
      const { container } = render(<Section id="test-section">Content</Section>);
      const section = container.querySelector('#test-section');
      expect(section).toBeTruthy();
    });
  });

  describe('Card', () => {
    it('should render children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeTruthy();
    });

    it('should apply default variant', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('bg-void-light');
    });

    it('should apply bordered variant', () => {
      const { container } = render(<Card variant="bordered">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('border-2');
    });

    it('should apply elevated variant', () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('shadow-lg');
    });

    it('should apply hover effect when enabled', () => {
      const { container } = render(<Card hover>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('hover:scale-105');
    });

    it('should be clickable when onClick provided', () => {
      let clicked = false;
      const { container } = render(
        <Card onClick={() => { clicked = true; }}>Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('role')).toBe('button');
      expect(card.getAttribute('tabIndex')).toBe('0');
    });
  });

  describe('Stat', () => {
    it('should render value and label', () => {
      render(<Stat value="42" label="Test Metric" />);
      expect(screen.getByText('42')).toBeTruthy();
      expect(screen.getByText('Test Metric')).toBeTruthy();
    });

    it('should render unit', () => {
      render(<Stat value="63" label="Reduction" unit="%" />);
      expect(screen.getByText('%')).toBeTruthy();
    });

    it('should accept numeric value', () => {
      render(<Stat value={100} label="Count" />);
      expect(screen.getByText('100')).toBeTruthy();
    });

    it('should apply default variant (flow color)', () => {
      const { container } = render(<Stat value="50" label="Test" />);
      const value = container.querySelector('.text-flow');
      expect(value).toBeTruthy();
    });

    it('should apply success variant', () => {
      const { container } = render(<Stat value="50" label="Test" variant="success" />);
      const value = container.querySelector('.text-green-400');
      expect(value).toBeTruthy();
    });

    it('should apply error variant', () => {
      const { container } = render(<Stat value="50" label="Test" variant="error" />);
      const value = container.querySelector('.text-neon');
      expect(value).toBeTruthy();
    });
  });

  describe('Callout', () => {
    it('should render children', () => {
      render(<Callout variant="info">Info message</Callout>);
      expect(screen.getByText('Info message')).toBeTruthy();
    });

    it('should render title', () => {
      render(
        <Callout variant="info" title="Important">
          Message
        </Callout>
      );
      expect(screen.getByText('Important')).toBeTruthy();
    });

    it('should apply info variant styling', () => {
      const { container } = render(<Callout variant="info">Message</Callout>);
      const callout = container.firstChild as HTMLElement;
      expect(callout.className).toContain('border-flow');
    });

    it('should apply warning variant styling', () => {
      const { container } = render(<Callout variant="warning">Message</Callout>);
      const callout = container.firstChild as HTMLElement;
      expect(callout.className).toContain('border-yellow-500');
    });

    it('should apply success variant styling', () => {
      const { container } = render(<Callout variant="success">Message</Callout>);
      const callout = container.firstChild as HTMLElement;
      expect(callout.className).toContain('border-green-500');
    });

    it('should apply error variant styling', () => {
      const { container } = render(<Callout variant="error">Message</Callout>);
      const callout = container.firstChild as HTMLElement;
      expect(callout.className).toContain('border-neon');
    });

    it('should have alert role for accessibility', () => {
      const { container } = render(<Callout variant="info">Message</Callout>);
      const callout = container.firstChild as HTMLElement;
      expect(callout.getAttribute('role')).toBe('alert');
    });
  });
});
