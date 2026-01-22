import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { RoiSummaryPdf, type RoiPdfPayload } from '../roiPdf';

// Mock @react-pdf/renderer to allow unit testing without full PDF rendering
vi.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => React.createElement('Document', {}, children),
  Page: ({ children, style }: { children: React.ReactNode; style?: unknown }) => 
    React.createElement('Page', { style }, children),
  View: ({ children, style }: { children: React.ReactNode; style?: unknown }) => 
    React.createElement('View', { style }, children),
  Text: ({ children, style }: { children: React.ReactNode; style?: unknown }) => 
    React.createElement('Text', { style }, children),
  StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => styles,
  },
}));

const mockPayload: RoiPdfPayload = {
  lead: {
    name: 'John Smith',
    email: 'john@acmecorp.com',
    company: 'ACME Corp',
  },
  inputs: { facilities: 10 },
  results: {
    totalAnnualSavings: 500000,
    baseSavings: 400000,
    networkBonusSavings: 100000,
    yearOneRampShare: 0.6,
    yearOneGrossSavings: 300000,
    yearOneNetGain: 200000,
    yearOneRoiPercent: 150,
    paybackMonths: 8,
    fiveYearValue: 2000000,
    annualSubscription: 50000,
    implementationCost: 25000,
  },
  assumptions: ['Assumption 1', 'Assumption 2'],
  disclaimer: 'This is a modeled estimate.',
};

describe('RoiSummaryPdf', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-22'));
  });

  it('renders without crashing', () => {
    const element = React.createElement(RoiSummaryPdf, { payload: mockPayload });
    expect(element).toBeDefined();
  });

  it('includes company name in the output', () => {
    const element = RoiSummaryPdf({ payload: mockPayload });
    
    // Traverse the React element tree to find text content
    function findTextContent(node: React.ReactNode): string[] {
      const texts: string[] = [];
      
      if (typeof node === 'string') {
        texts.push(node);
      } else if (React.isValidElement(node)) {
        const children = (node.props as { children?: React.ReactNode }).children;
        if (children) {
          if (Array.isArray(children)) {
            children.forEach(child => texts.push(...findTextContent(child)));
          } else {
            texts.push(...findTextContent(children));
          }
        }
      }
      
      return texts;
    }
    
    const allText = findTextContent(element).join(' ');
    expect(allText).toContain('ACME Corp');
  });

  it('includes brand name in header', () => {
    const element = RoiSummaryPdf({ payload: mockPayload });
    
    function findTextContent(node: React.ReactNode): string[] {
      const texts: string[] = [];
      if (typeof node === 'string') texts.push(node);
      else if (React.isValidElement(node)) {
        const children = (node.props as { children?: React.ReactNode }).children;
        if (children) {
          if (Array.isArray(children)) {
            children.forEach(child => texts.push(...findTextContent(child)));
          } else {
            texts.push(...findTextContent(children));
          }
        }
      }
      return texts;
    }
    
    const allText = findTextContent(element).join(' ');
    expect(allText).toContain('YARDFLOW BY FREIGHTROLL');
  });

  it('includes generated date', () => {
    const element = RoiSummaryPdf({ payload: mockPayload });
    
    function findTextContent(node: React.ReactNode): string[] {
      const texts: string[] = [];
      if (typeof node === 'string') texts.push(node);
      else if (React.isValidElement(node)) {
        const children = (node.props as { children?: React.ReactNode }).children;
        if (children) {
          if (Array.isArray(children)) {
            children.forEach(child => texts.push(...findTextContent(child)));
          } else {
            texts.push(...findTextContent(children));
          }
        }
      }
      return texts;
    }
    
    const allText = findTextContent(element).join(' ');
    expect(allText).toContain('Generated:');
    expect(allText).toContain('January 22, 2026');
  });

  it('includes lead name and email', () => {
    const element = RoiSummaryPdf({ payload: mockPayload });
    
    function findTextContent(node: React.ReactNode): string[] {
      const texts: string[] = [];
      if (typeof node === 'string') texts.push(node);
      else if (React.isValidElement(node)) {
        const children = (node.props as { children?: React.ReactNode }).children;
        if (children) {
          if (Array.isArray(children)) {
            children.forEach(child => texts.push(...findTextContent(child)));
          } else {
            texts.push(...findTextContent(children));
          }
        }
      }
      return texts;
    }
    
    const allText = findTextContent(element).join(' ');
    expect(allText).toContain('John Smith');
    expect(allText).toContain('john@acmecorp.com');
  });
});
