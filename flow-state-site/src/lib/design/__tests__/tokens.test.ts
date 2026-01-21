import { describe, it, expect } from 'vitest';
import { SPACING, TYPOGRAPHY, COLORS, SHADOWS, BORDERS, TRANSITIONS, BREAKPOINTS, Z_INDEX } from '../tokens';

describe('Design Tokens', () => {
  describe('SPACING', () => {
    it('should have all spacing values defined', () => {
      expect(SPACING).toHaveProperty('xs');
      expect(SPACING).toHaveProperty('sm');
      expect(SPACING).toHaveProperty('md');
      expect(SPACING).toHaveProperty('lg');
      expect(SPACING).toHaveProperty('xl');
      expect(SPACING).toHaveProperty('xxl');
      expect(SPACING).toHaveProperty('xxxl');
    });

    it('should use rem units', () => {
      Object.values(SPACING).forEach((value) => {
        expect(value).toMatch(/rem$/);
      });
    });

    it('should have increasing values', () => {
      const values = Object.values(SPACING).map((v) => parseFloat(v));
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe('TYPOGRAPHY', () => {
    it('should have all typography scales', () => {
      expect(TYPOGRAPHY).toHaveProperty('Display');
      expect(TYPOGRAPHY).toHaveProperty('H1');
      expect(TYPOGRAPHY).toHaveProperty('H2');
      expect(TYPOGRAPHY).toHaveProperty('H3');
      expect(TYPOGRAPHY).toHaveProperty('H4');
      expect(TYPOGRAPHY).toHaveProperty('Body');
      expect(TYPOGRAPHY).toHaveProperty('Small');
      expect(TYPOGRAPHY).toHaveProperty('Tiny');
    });

    it('should have size, weight, and lineHeight for each scale', () => {
      Object.values(TYPOGRAPHY).forEach((scale) => {
        expect(scale).toHaveProperty('size');
        expect(scale).toHaveProperty('weight');
        expect(scale).toHaveProperty('lineHeight');
      });
    });

    it('should have valid font weights (100-900)', () => {
      Object.values(TYPOGRAPHY).forEach((scale) => {
        expect(scale.weight).toBeGreaterThanOrEqual(100);
        expect(scale.weight).toBeLessThanOrEqual(900);
      });
    });

    it('should have decreasing font sizes from Display to Tiny', () => {
      const sizes = Object.values(TYPOGRAPHY).map((s) => parseFloat(s.size));
      for (let i = 1; i < sizes.length; i++) {
        expect(sizes[i]).toBeLessThanOrEqual(sizes[i - 1]);
      }
    });
  });

  describe('COLORS', () => {
    it('should have primary colors', () => {
      expect(COLORS).toHaveProperty('Void');
      expect(COLORS).toHaveProperty('Neon');
      expect(COLORS).toHaveProperty('Flow');
      expect(COLORS).toHaveProperty('Steel');
      expect(COLORS).toHaveProperty('White');
      expect(COLORS).toHaveProperty('Black');
    });

    it('should have extended palette', () => {
      expect(COLORS).toHaveProperty('VoidLight');
      expect(COLORS).toHaveProperty('VoidDark');
      expect(COLORS).toHaveProperty('NeonDark');
      expect(COLORS).toHaveProperty('FlowDark');
    });

    it('should use hex color format', () => {
      Object.values(COLORS).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have White as #FFFFFF', () => {
      expect(COLORS.White).toBe('#FFFFFF');
    });

    it('should have Black as #000000', () => {
      expect(COLORS.Black).toBe('#000000');
    });
  });

  describe('SHADOWS', () => {
    it('should have all shadow sizes', () => {
      expect(SHADOWS).toHaveProperty('none');
      expect(SHADOWS).toHaveProperty('sm');
      expect(SHADOWS).toHaveProperty('md');
      expect(SHADOWS).toHaveProperty('lg');
      expect(SHADOWS).toHaveProperty('xl');
    });

    it('should have none as "none"', () => {
      expect(SHADOWS.none).toBe('none');
    });

    it('should use box-shadow syntax', () => {
      const shadowValues = Object.entries(SHADOWS).filter(([key]) => key !== 'none');
      shadowValues.forEach(([_, value]) => {
        expect(value).toMatch(/^\d+\s+\d+/); // Starts with offset values
      });
    });
  });

  describe('BORDERS', () => {
    it('should have width and radius properties', () => {
      expect(BORDERS).toHaveProperty('width');
      expect(BORDERS).toHaveProperty('radius');
    });

    it('should have border widths', () => {
      expect(BORDERS.width).toHaveProperty('thin');
      expect(BORDERS.width).toHaveProperty('medium');
      expect(BORDERS.width).toHaveProperty('thick');
    });

    it('should have border radii', () => {
      expect(BORDERS.radius).toHaveProperty('none');
      expect(BORDERS.radius).toHaveProperty('sm');
      expect(BORDERS.radius).toHaveProperty('md');
      expect(BORDERS.radius).toHaveProperty('lg');
      expect(BORDERS.radius).toHaveProperty('full');
    });
  });

  describe('TRANSITIONS', () => {
    it('should have timing values', () => {
      expect(TRANSITIONS).toHaveProperty('fast');
      expect(TRANSITIONS).toHaveProperty('medium');
      expect(TRANSITIONS).toHaveProperty('slow');
    });

    it('should use ms units', () => {
      Object.values(TRANSITIONS).forEach((value) => {
        expect(value).toMatch(/ms$/);
      });
    });

    it('should have increasing durations', () => {
      const fast = parseInt(TRANSITIONS.fast);
      const medium = parseInt(TRANSITIONS.medium);
      const slow = parseInt(TRANSITIONS.slow);
      
      expect(medium).toBeGreaterThan(fast);
      expect(slow).toBeGreaterThan(medium);
    });
  });

  describe('BREAKPOINTS', () => {
    it('should have all breakpoints', () => {
      expect(BREAKPOINTS).toHaveProperty('sm');
      expect(BREAKPOINTS).toHaveProperty('md');
      expect(BREAKPOINTS).toHaveProperty('lg');
      expect(BREAKPOINTS).toHaveProperty('xl');
      expect(BREAKPOINTS).toHaveProperty('xxl');
    });

    it('should use px units', () => {
      Object.values(BREAKPOINTS).forEach((value) => {
        expect(value).toMatch(/px$/);
      });
    });

    it('should have increasing breakpoints', () => {
      const values = Object.values(BREAKPOINTS).map((v) => parseInt(v));
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe('Z_INDEX', () => {
    it('should have z-index layers', () => {
      expect(Z_INDEX).toHaveProperty('base');
      expect(Z_INDEX).toHaveProperty('dropdown');
      expect(Z_INDEX).toHaveProperty('modal');
      expect(Z_INDEX).toHaveProperty('toast');
      expect(Z_INDEX).toHaveProperty('tooltip');
    });

    it('should have increasing z-index values', () => {
      expect(Z_INDEX.dropdown).toBeGreaterThan(Z_INDEX.base);
      expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.dropdown);
      expect(Z_INDEX.toast).toBeGreaterThan(Z_INDEX.modal);
      expect(Z_INDEX.tooltip).toBeGreaterThan(Z_INDEX.toast);
    });

    it('should use multiples of 100 for layering', () => {
      const values = Object.values(Z_INDEX).filter((v) => v !== 0);
      values.forEach((value) => {
        expect(value % 100).toBe(0);
      });
    });
  });
});
