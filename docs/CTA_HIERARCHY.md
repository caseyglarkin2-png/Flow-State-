# CTA Hierarchy & Standards

**Purpose:** Define consistent call-to-action structure across all pages.  
**Last Updated:** January 21, 2026  
**Owner:** Visualist + Product Lead

---

## CTA Ladder (Priority Order)

### Primary CTA
**Goal:** Book a Network Audit (revenue-generating action)

| Label | Color | Emphasis | Placement |
|-------|-------|----------|-----------|
| **"Book a Network Audit"** | Neon (#00FFC2) | High | Hero, above fold |
| Alt: "Schedule Audit" | Neon (#00FFC2) | High | Product pages |
| Alt: "Book Audit Call" | Neon (#00FFC2) | High | ROI result page |

**Styling:**
```typescript
className="bg-neon text-void px-6 py-3 rounded font-bold hover:bg-neon/90"
```

**Use When:**
- User has validated problem (viewed ROI, ran diagnostic)
- Product/solution page (ready to engage)
- Footer (persistent access)

---

### Secondary CTA
**Goal:** Apply for Co-Development Program (qualification step)

| Label | Color | Emphasis | Placement |
|-------|-------|----------|-----------|
| **"Apply for Co-Development"** | Outline (neon border) | Medium | Co-dev page, footer |
| Alt: "Join Co-Development Program" | Outline | Medium | Product pages |
| Alt: "Apply to Co-Develop" | Outline | Medium | Case study pages |

**Styling:**
```typescript
className="border-2 border-neon text-neon px-6 py-3 rounded font-bold hover:bg-neon/10"
```

**Use When:**
- User exploring partnership model
- Post-diagnostic (qualified lead)
- Solution pages (context established)

---

### Tertiary CTA
**Goal:** Explore / Learn More (low-commitment actions)

| Label | Color | Emphasis | Placement |
|-------|-------|----------|-----------|
| **"Run ROI Calculator"** | Text link or muted button | Low | Home, product pages |
| **"Run Diagnostic"** | Text link or muted button | Low | Home, ROI page |
| **"Learn More"** | Text link | Low | Feature cards |
| **"View Case Study"** | Text link | Low | Solutions pages |
| **"Explore Product"** | Text link | Low | Hero (secondary link) |

**Styling:**
```typescript
// Text link
className="text-neon underline hover:text-neon/80"

// Muted button
className="bg-carbon text-steel px-4 py-2 rounded hover:bg-carbon/80"
```

**Use When:**
- User needs more context (early journey)
- Supporting action (not primary goal)
- Navigation (explore site structure)

---

## CTA Component Implementation

### Shared Component: `components/CTAButton.tsx`

```typescript
import { BRAND_NAMES } from '@/src/lib/brand';

interface CTAButtonProps {
  /** CTA priority tier */
  tier: 'primary' | 'secondary' | 'tertiary';
  
  /** Button text */
  label: string;
  
  /** Link destination (optional; use onClick for actions) */
  href?: string;
  
  /** Click handler (optional; use href for navigation) */
  onClick?: () => void;
  
  /** Disable button */
  disabled?: boolean;
  
  /** Additional classes */
  className?: string;
}

export function CTAButton({ 
  tier, 
  label, 
  href, 
  onClick, 
  disabled, 
  className 
}: CTAButtonProps) {
  const baseClasses = 'font-bold rounded transition-all';
  
  const tierClasses = {
    primary: 'bg-neon text-void px-6 py-3 hover:bg-neon/90 shadow-lg',
    secondary: 'border-2 border-neon text-neon px-6 py-3 hover:bg-neon/10',
    tertiary: 'text-neon underline hover:text-neon/80',
  };
  
  const classes = `${baseClasses} ${tierClasses[tier]} ${className || ''}`;
  
  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled}>
        {label}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={classes}
      aria-label={label}
    >
      {label}
    </button>
  );
}
```

---

## CTA Placement Guidelines

### Hero Section (Above Fold)
```typescript
<div className="flex gap-4">
  <CTAButton tier="primary" label="Book a Network Audit" href="/contact" />
  <CTAButton tier="tertiary" label="Run ROI Calculator" href="/roi" />
</div>
```

**Rationale:** Primary CTA (revenue) + tertiary (explore) gives user choice without conflicting messages.

---

### ROI Result Page
```typescript
<div className="flex gap-4">
  <CTAButton tier="primary" label="Book Audit Call" href="/contact?source=roi" />
  <CTAButton tier="secondary" label="Apply for Co-Development" href="/co-development" />
</div>
```

**Rationale:** User validated ROI; ready for high-intent action (audit) or partnership (co-dev).

---

### Footer (Persistent)
```typescript
<div className="flex flex-col gap-2">
  <CTAButton tier="primary" label="Book a Network Audit" href="/contact" />
  <CTAButton tier="secondary" label="Apply for Co-Development" href="/co-development" />
</div>
```

**Rationale:** Always accessible; user can engage regardless of page.

---

### Product/Solution Pages
```typescript
<div className="flex gap-4">
  <CTAButton tier="primary" label="Schedule Audit" href="/contact?source=product" />
  <CTAButton tier="tertiary" label="Run Diagnostic" href="/diagnostic" />
</div>
```

**Rationale:** Context established (product understood); primary CTA (audit) + exploration (diagnostic).

---

## CTA Audit Results (January 21, 2026)

### Files to Update

| Page | Current CTAs | Proposed CTAs | Status |
|------|--------------|---------------|--------|
| **Home** | TBD | Primary: "Book Audit", Tertiary: "Run ROI" | ⏳ Pending |
| **ROI** | TBD | Primary: "Book Audit", Secondary: "Co-Dev" | ⏳ Pending |
| **Diagnostic** | TBD | Primary: "Book Audit", Tertiary: "View ROI" | ⏳ Pending |
| **Product** | TBD | Primary: "Schedule Audit", Tertiary: "Diagnostic" | ⏳ Pending |
| **Footer** | TBD | Primary + Secondary (persistent) | ⏳ Pending |

**Note:** Full audit pending; requires review of all page CTAs.

---

## Anti-Patterns (Avoid These)

### ❌ Conflicting CTAs
**Bad:** Two primary CTAs competing for attention
```typescript
<CTAButton tier="primary" label="Book Audit" />
<CTAButton tier="primary" label="Apply Now" />
```

**Why:** User confused; which action is more important?

**Fix:** Use primary + secondary or primary + tertiary
```typescript
<CTAButton tier="primary" label="Book Audit" />
<CTAButton tier="secondary" label="Apply for Co-Dev" />
```

---

### ❌ Vague Labels
**Bad:** Generic "Learn More" without context
```typescript
<CTAButton tier="tertiary" label="Learn More" />
```

**Why:** User doesn't know what they'll learn about.

**Fix:** Specific label referencing content
```typescript
<CTAButton tier="tertiary" label="Learn About Yard Orchestration" />
```

---

### ❌ Too Many CTAs
**Bad:** 5+ CTAs in one section
```typescript
<CTAButton tier="primary" label="Book Audit" />
<CTAButton tier="secondary" label="Apply for Co-Dev" />
<CTAButton tier="tertiary" label="Run ROI" />
<CTAButton tier="tertiary" label="Run Diagnostic" />
<CTAButton tier="tertiary" label="View Case Studies" />
```

**Why:** Analysis paralysis; user overwhelmed.

**Fix:** Limit to 2-3 CTAs per section (1 primary, 1-2 tertiary)
```typescript
<CTAButton tier="primary" label="Book Audit" />
<CTAButton tier="tertiary" label="Run ROI Calculator" />
```

---

## Accessibility

### ARIA Labels
All CTAs must have clear, descriptive ARIA labels:
```typescript
<CTAButton 
  tier="primary" 
  label="Book Audit" 
  aria-label="Book a network audit call with FreightRoll team"
/>
```

### Keyboard Navigation
- All CTAs focusable via Tab key
- Enter/Space activates CTA
- Focus indicator visible (outline)

### Color Contrast
- Primary CTA: Neon (#00FFC2) on Void (#050505) → WCAG AAA
- Secondary CTA: Neon (#00FFC2) border on Void (#050505) → WCAG AA
- Tertiary CTA: Neon (#00FFC2) text on Void (#050505) → WCAG AAA

---

## Testing

### Playwright Test: CTA Audit
```typescript
// e2e/cta-audit.spec.ts
test('All CTAs use CTAButton component', async ({ page }) => {
  const pages = ['/', '/roi', '/diagnostic', '/product'];
  
  for (const path of pages) {
    await page.goto(path);
    
    // Check for hardcoded buttons (anti-pattern)
    const hardcodedButtons = await page.locator('button:not([data-cta])').count();
    expect(hardcodedButtons).toBe(0); // All buttons should use CTAButton
    
    // Verify CTA hierarchy
    const primaryCTAs = await page.locator('[data-cta="primary"]').count();
    expect(primaryCTAs).toBeGreaterThan(0); // At least one primary CTA
    expect(primaryCTAs).toBeLessThan(3); // Max 2 primary CTAs
  }
});
```

---

## Ownership

- **Visualist Agent:** Design CTA styling, placement, spacing
- **Architect Agent:** Implement CTAButton component, refactor existing CTAs
- **Product Lead:** Define CTA hierarchy, approve labels

---

**Next Steps:**
1. ✅ CTA hierarchy defined (this document)
2. ⏳ Create `components/CTAButton.tsx`
3. ⏳ Audit all pages for existing CTAs
4. ⏳ Refactor to use CTAButton component
5. ⏳ Add Playwright CTA audit test
