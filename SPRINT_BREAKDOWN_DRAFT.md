# Sprint Breakdown: Homepage Animation & Card Aesthetic Refinement

**Project:** Flow-State Homepage Refinement  
**Objective:** Replace redundant Digital Guard animation with Protocol Sequence cycle + align module cards with destination page aesthetics  
**Duration:** 3 Sprints (Sprint 1, Sprint 2, Sprint 3)  
**Total Estimated Tasks:** 26 atomic, testable tasks across 3 sprints

---

## Project Scope Overview

**Problem Statement:**
1. Homepage shows `DigitalGuardAnimation` → then "Digital Guard" as first module card (visual redundancy)
2. Singularity card uses generic network SVG that doesn't match 32-node map on destination page
3. Other module cards don't visually preview their destinations

**Solution:**
- Replace `DigitalGuardAnimation` with `ProtocolSequenceAnimation` (cycles Guard → Comms → BOL → YMS)
- Update Singularity card to show 32-node particle grid matching destination
- Audit & update remaining module cards (Product, ROI, Network Effect)

**Success Criteria:**
- ✅ Congruence check: 22/22 passing (no regressions)
- ✅ ProtocolSequenceAnimation: Renders 4 states, cycles every 14 seconds, respects prefers-reduced-motion
- ✅ Singularity card: Shows 32-node grid, <50KB bundle, matches destination aesthetic
- ✅ All cards: Pass alignment rubric (≥70% score)
- ✅ E2E tests: 89/89 passing (visual regression + functionality)
- ✅ Lighthouse: ≥90 (performance maintained)
- ✅ WCAG 2.1 Level AA: Zero accessibility violations

---

## Sprint 1: ProtocolSequenceAnimation Implementation

**Goal:** Build `ProtocolSequenceAnimation` component with full test coverage  
**Demoable Output:** Animated hero section cycling Guard → Comms → BOL → YMS  
**Success Metrics:** Component renders, cycles correctly, tests pass (unit + E2E + visual)  
**Duration:** 5-7 days

### **T1-001: Create Icon Components for Protocol Modules**

**Objective:** Build 4 reusable icon components (Guard, Comms, BOL, YMS) with consistent styling.

**Acceptance Criteria:**
- [ ] Create `components/icons/ProtocolGuardIcon.tsx` (shield with lock, neon color, SVG-based)
- [ ] Create `components/icons/ProtocolCommsIcon.tsx` (speech bubble + signal waves)
- [ ] Create `components/icons/ProtocolBOLIcon.tsx` (document + checkmark)
- [ ] Create `components/icons/ProtocolYMSIcon.tsx` (grid + bar chart)
- [ ] All 4 icons: exported from `components/icons/ProtocolIcons.ts` index
- [ ] All 4 icons: 48px base size, configurable size via prop
- [ ] All 4 icons: monochrome neon (#00B4FF) by default, accept color prop
- [ ] All 4 icons: use `<svg>` (not Canvas or image), <2KB each
- [ ] No TypeScript errors: `npm run typecheck` passes
- [ ] No lint errors: `npm run lint` passes

**Testing:**
```typescript
// components/__tests__/ProtocolIcons.test.tsx
describe('ProtocolGuardIcon', () => {
  test('renders SVG element', () => {
    render(<ProtocolGuardIcon />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  test('respects size prop (24, 48, 64)', () => {
    const { container } = render(<ProtocolGuardIcon size={64} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });
  test('respects color prop', () => {
    const { container } = render(<ProtocolGuardIcon color="#FF0000" />);
    expect(container.querySelector('svg')).toHaveStyle('color: #FF0000');
  });
});
// (repeat for Comms, BOL, YMS icons)
```

**Validation:**
- [ ] Run: `npm run test:unit` → All 12 icon tests pass (3 tests × 4 icons)
- [ ] Run: `npm run lint` → 0 errors in icon files
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Manual: Display all 4 icons in Storybook (if configured) or in a test page

**Files Created:**
- `components/icons/ProtocolGuardIcon.tsx` (~30 lines)
- `components/icons/ProtocolCommsIcon.tsx` (~30 lines)
- `components/icons/ProtocolBOLIcon.tsx` (~30 lines)
- `components/icons/ProtocolYMSIcon.tsx` (~30 lines)
- `components/icons/ProtocolIcons.ts` (index, ~10 lines)
- `components/__tests__/ProtocolIcons.test.tsx` (~80 lines)

**Dependencies:** None (icons are pure SVG + React)

---

### **T1-002: Create Protocol Module Data Structure**

**Objective:** Define TypeScript types and data for 4 protocol modules (Guard, Comms, BOL, YMS).

**Acceptance Criteria:**
- [ ] Create `lib/protocol-modules.ts` with exported types:
  - `type ProtocolModuleType = 'Guard' | 'Comms' | 'BOL' | 'YMS'`
  - `interface ProtocolModule { id: ProtocolModuleType; label: string; proof: string; description?: string; }`
  - `const PROTOCOL_MODULES: ProtocolModule[]` (array of 4)
- [ ] Data structure includes:
  ```typescript
  {
    id: 'Guard',
    label: 'Digital Guard',
    proof: 'Verify carrier identity & CDL',
    description: 'Automated identity verification creates cryptographic proof'
  }
  // (repeat for Comms, BOL, YMS with unique copy)
  ```
- [ ] All copy matches animation state machine spec (T0-002)
- [ ] Exported for use in component `import { PROTOCOL_MODULES } from '@/lib/protocol-modules'`
- [ ] TypeScript compiles: `npm run typecheck` passes
- [ ] No lint errors: `npm run lint` passes

**Testing:**
```typescript
// lib/__tests__/protocol-modules.test.ts
describe('PROTOCOL_MODULES', () => {
  test('exports array of 4 modules', () => {
    expect(PROTOCOL_MODULES).toHaveLength(4);
  });
  test('each module has required fields: id, label, proof', () => {
    PROTOCOL_MODULES.forEach(mod => {
      expect(mod).toHaveProperty('id');
      expect(mod).toHaveProperty('label');
      expect(mod).toHaveProperty('proof');
    });
  });
  test('module ids are unique', () => {
    const ids = PROTOCOL_MODULES.map(m => m.id);
    expect(new Set(ids).size).toBe(4);
  });
  test('module types match ProtocolModuleType', () => {
    const validIds: ProtocolModuleType[] = ['Guard', 'Comms', 'BOL', 'YMS'];
    PROTOCOL_MODULES.forEach(mod => {
      expect(validIds).toContain(mod.id);
    });
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- protocol-modules.test.ts` → 4/4 tests pass
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Manual: Verify copy in each module matches spec document (T0-002)

**Files Created:**
- `lib/protocol-modules.ts` (~40 lines)
- `lib/__tests__/protocol-modules.test.ts` (~50 lines)

**Dependencies:** TypeScript types (no external libraries)

---

### **T1-003: Implement ProtocolSequenceAnimation Component (Animated Mode)**

**Objective:** Build the main animation component with state cycling, framer-motion integration, and timing logic.

**Acceptance Criteria:**
- [ ] Create `components/animations/ProtocolSequenceAnimation.tsx`
- [ ] Component accepts props:
  ```typescript
  interface ProtocolSequenceAnimationProps {
    displayDuration?: number;      // Default: 3000ms
    transitionDuration?: number;   // Default: 500ms
    autoPlay?: boolean;            // Default: true
    onStateChange?: (state: ProtocolModuleType) => void; // Analytics callback
  }
  ```
- [ ] State management:
  - [ ] Uses `useState` to track current protocol state ('Guard' | 'Comms' | 'BOL' | 'YMS')
  - [ ] Initializes to 'Guard'
  - [ ] Cycles through all 4 states in order, loops indefinitely
- [ ] Timing logic:
  - [ ] Display per state: 3000ms (configurable via prop)
  - [ ] Transition duration: 500ms (configurable via prop)
  - [ ] Uses `useEffect` with `setInterval` for cycling
  - [ ] Cleans up interval on unmount
  - [ ] Total cycle: 14 seconds (verifiable via tests)
- [ ] Framer Motion integration:
  - [ ] Uses `AnimatePresence` with `mode="wait"` for sequential transitions
  - [ ] Each icon variant has `initial`, `animate`, `exit` properties
  - [ ] Fade + scale transition: opacity 0→1, scale 0.95→1 over 500ms
  - [ ] Easing: `[0.4, 0, 0.2, 1]` (easeInOutQuart)
  - [ ] Exit animation: opacity 1→0, scale 1→0.95
- [ ] Respects `prefersReducedMotion`:
  - [ ] Imports `prefersReducedMotion` from `@/lib/motion-presets`
  - [ ] If true: renders static 4-module grid (no animations, no cycling)
  - [ ] If false: renders animated cycling version
- [ ] Rendering:
  - [ ] 4 conditional blocks: `{state === 'Guard' && <GuardIcon />}` etc.
  - [ ] Wraps icons in `<motion.div>` with animation variants
  - [ ] Displays icon + label + proof text for current state
  - [ ] Container: `w-full aspect-video bg-gradient-to-br from-void via-carbon to-void rounded-lg border border-neon/20`
- [ ] Callbacks:
  - [ ] Calls `onStateChange(newState)` when state changes (for analytics)
  - [ ] Optional: exportable `ref` if parent needs pause/resume control
- [ ] TypeScript: 0 errors in component + tests
- [ ] No lint errors: `npm run lint` passes

**Testing:**
```typescript
// components/__tests__/ProtocolSequenceAnimation.test.tsx
describe('ProtocolSequenceAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Vitest fake timers for setInterval control
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('renders Guard icon initially', () => {
    render(<ProtocolSequenceAnimation />);
    expect(screen.getByTestId('protocol-guard')).toBeInTheDocument();
  });

  test('cycles from Guard → Comms after displayDuration + transitionDuration', () => {
    const onStateChange = vi.fn();
    render(<ProtocolSequenceAnimation onStateChange={onStateChange} />);
    
    // Fast forward 3500ms (3000 display + 500 transition)
    vi.advanceTimersByTime(3500);
    
    expect(onStateChange).toHaveBeenCalledWith('Comms');
  });

  test('completes full cycle in 14 seconds (4 states × 3.5s each)', () => {
    const onStateChange = vi.fn();
    render(<ProtocolSequenceAnimation onStateChange={onStateChange} />);
    
    // Advance 14 seconds
    vi.advanceTimersByTime(14000);
    
    // Should have cycled through all 4 states (plus initial Guard = 5 calls)
    expect(onStateChange).toHaveBeenCalledTimes(4);
    expect(onStateChange).toHaveBeenNthCalledWith(1, 'Comms');
    expect(onStateChange).toHaveBeenNthCalledWith(2, 'BOL');
    expect(onStateChange).toHaveBeenNthCalledWith(3, 'YMS');
    expect(onStateChange).toHaveBeenNthCalledWith(4, 'Guard'); // Loop restarts
  });

  test('respects displayDuration and transitionDuration props', () => {
    const onStateChange = vi.fn();
    render(
      <ProtocolSequenceAnimation 
        displayDuration={1000}
        transitionDuration={200}
        onStateChange={onStateChange}
      />
    );
    
    // Should transition after 1200ms (1000 + 200)
    vi.advanceTimersByTime(1200);
    expect(onStateChange).toHaveBeenCalledWith('Comms');
  });

  test('respects prefers-reduced-motion preference', () => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
      })),
    });

    render(<ProtocolSequenceAnimation />);
    
    // Should render all 4 modules visible (not cycling)
    expect(screen.getByTestId('protocol-guard')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-comms')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-bol')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-yms')).toBeInTheDocument();
    
    // Should NOT have AnimatePresence active
    // (Verify via checking that state doesn't change after time advance)
    const onStateChange = vi.fn();
    render(<ProtocolSequenceAnimation onStateChange={onStateChange} />);
    vi.advanceTimersByTime(5000);
    expect(onStateChange).not.toHaveBeenCalled();
  });

  test('pauses animation when autoPlay=false', () => {
    const onStateChange = vi.fn();
    render(<ProtocolSequenceAnimation autoPlay={false} onStateChange={onStateChange} />);
    
    vi.advanceTimersByTime(5000);
    
    expect(onStateChange).not.toHaveBeenCalled();
  });

  test('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<ProtocolSequenceAnimation />);
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  test('renders with correct motion variants (fade + scale)', () => {
    const { container } = render(<ProtocolSequenceAnimation />);
    const motionDiv = container.querySelector('motion.div');
    
    // Check that motion.div has animation props
    expect(motionDiv).toHaveAttribute('data-testid', 'protocol-animation-wrapper');
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- ProtocolSequenceAnimation.test.ts` → All tests pass (10+)
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Run: `npm run lint` → 0 errors
- [ ] Manual: Open in browser (via storybook or homepage), verify:
  - Icons cycle every ~3.5 seconds (3s display + 0.5s transition)
  - Full loop takes ~14 seconds
  - Fade + scale animation is smooth
  - DevTools: Check reduced-motion emulation (should show static grid)

**Files Created:**
- `components/animations/ProtocolSequenceAnimation.tsx` (~150 lines)
- `components/__tests__/ProtocolSequenceAnimation.test.tsx` (~200 lines)

**Dependencies:** framer-motion (already installed), lib/motion-presets, lib/protocol-modules, protocol icons from T1-001

---

### **T1-004: Create Reduced-Motion Fallback UI**

**Objective:** Build static 4-module grid display for users with prefers-reduced-motion.

**Acceptance Criteria:**
- [ ] Component: `components/animations/ProtocolSequenceAnimation.tsx` already implements this (see T1-003)
- [ ] Static display when `prefersReducedMotion === true`:
  - [ ] Render 2×2 grid on desktop (4 modules visible simultaneously)
  - [ ] Render 1×4 stack on mobile (vertical stack)
  - [ ] No cycling, no animations, all 4 modules equally visible
  - [ ] Each module shows: icon + label + proof text
- [ ] Styling:
  - [ ] Same color/spacing as animated version
  - [ ] Grid gap: consistent with other cards
  - [ ] Responsive: `grid-cols-2 gap-4 md:grid-cols-4`
- [ ] No animations: all opacity=1, no motion.div wrapping
- [ ] Labels accessible: all text visible (not hidden)

**Testing:**
```typescript
// Additional test in ProtocolSequenceAnimation.test.tsx
test('static fallback renders all 4 modules in grid layout', () => {
  // Mock prefers-reduced-motion as true
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
    })),
  });

  render(<ProtocolSequenceAnimation />);
  
  // All 4 modules should be visible
  expect(screen.getByTestId('protocol-guard')).toBeInTheDocument();
  expect(screen.getByTestId('protocol-comms')).toBeInTheDocument();
  expect(screen.getByTestId('protocol-bol')).toBeInTheDocument();
  expect(screen.getByTestId('protocol-yms')).toBeInTheDocument();
  
  // Verify grid layout
  const grid = screen.getByTestId('protocol-grid');
  expect(grid).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-4');
});
```

**Validation:**
- [ ] Run: `npm run test:unit` → All fallback tests pass
- [ ] DevTools: Emulate `prefers-reduced-motion: reduce`, verify static grid renders
- [ ] Mobile view: Verify stack layout on <768px

**Files Modified:**
- `components/animations/ProtocolSequenceAnimation.tsx` (already includes fallback logic)

---

### **T1-005: Integrate ProtocolSequenceAnimation into Homepage**

**Objective:** Replace `DigitalGuardAnimation` with `ProtocolSequenceAnimation` in `app/page.tsx`.

**Acceptance Criteria:**
- [ ] Update `app/page.tsx`:
  - [ ] Remove import: `import DigitalGuardAnimation from ...`
  - [ ] Add import: `import ProtocolSequenceAnimation from '@/components/animations/ProtocolSequenceAnimation'`
  - [ ] Find hero animation section (currently showing `<DigitalGuardAnimation />`)
  - [ ] Replace with: `<ProtocolSequenceAnimation />`
  - [ ] Remove `<DigitalGuardAnimation />` component entirely (no longer used)
- [ ] Verify no other files import `DigitalGuardAnimation`:
  - [ ] Run: `grep -r "DigitalGuardAnimation" components/ app/ --include="*.tsx"` → only matches in component file itself
  - [ ] Safe to leave DigitalGuardAnimation.tsx in place (for reference/backup)
- [ ] Surrounding layout unchanged:
  - [ ] Same hero section container styling
  - [ ] Same max-width constraints
  - [ ] Same margins/padding
- [ ] TypeScript compiles: `npm run typecheck` passes
- [ ] No lint errors: `npm run lint` passes

**Testing:**
```typescript
// e2e/visual-regression/homepage.spec.ts (new or extend existing)
test('homepage renders ProtocolSequenceAnimation instead of DigitalGuardAnimation', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Should NOT find DigitalGuard animation
  const digitalGuardCount = await page.locator('[data-testid="digital-guard-animation"]').count();
  expect(digitalGuardCount).toBe(0);
  
  // SHOULD find ProtocolSequence animation
  const protocolSeqCount = await page.locator('[data-testid="protocol-sequence-animation"]').count();
  expect(protocolSeqCount).toBe(1);
});

test('ProtocolSequenceAnimation is visible in hero section', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  const animation = page.locator('[data-testid="protocol-sequence-animation"]');
  expect(animation).toBeVisible();
});
```

**Validation:**
- [ ] Build locally: `npm run build` → succeeds, no TypeScript errors
- [ ] Run Playwright E2E tests: 1+ new test passes
- [ ] Manual: Visit homepage in browser, verify animation cycles Guard→Comms→BOL→YMS
- [ ] Run congruence check: `npm run congruence:check` → 22/22 passing (no regressions)

**Files Modified:**
- `app/page.tsx` (1 import change, 1 component swap, ~5 lines)

**Files Deleted:**
- None (DigitalGuardAnimation.tsx kept as reference)

---

### **T1-006: Add Analytics Tracking to ProtocolSequenceAnimation**

**Objective:** Track which protocol modules users see (for engagement metrics).

**Acceptance Criteria:**
- [ ] Create analytics event hook: `lib/hooks/useProtocolSequenceAnalytics.ts`
  - [ ] Accepts: `onStateChange?: (state: ProtocolModuleType) => void` callback
  - [ ] Returns: callback function to pass to component
- [ ] Analytics events:
  - [ ] Event name: `protocol_sequence_view`
  - [ ] Properties: `{ module: 'Guard'|'Comms'|'BOL'|'YMS', timestamp: ISO8601 }`
  - [ ] Calls PostHog (or existing analytics client) if configured
  - [ ] Gracefully handles if analytics not available (no crash)
- [ ] Integrate into component:
  - [ ] ProtocolSequenceAnimation accepts `trackingEnabled?: boolean` prop (default: true)
  - [ ] Calls hook if tracking enabled
  - [ ] Passes callback to component's `onStateChange`
- [ ] TypeScript: 0 errors
- [ ] No console warnings or errors

**Testing:**
```typescript
// lib/__tests__/useProtocolSequenceAnalytics.test.ts
describe('useProtocolSequenceAnalytics', () => {
  test('calls analytics client when state changes', () => {
    const mockAnalytics = vi.fn();
    const callback = useProtocolSequenceAnalytics(mockAnalytics);
    
    callback('Guard');
    
    expect(mockAnalytics).toHaveBeenCalledWith({
      event: 'protocol_sequence_view',
      properties: { module: 'Guard' }
    });
  });

  test('handles missing analytics client gracefully', () => {
    // Don't provide analytics client
    const callback = useProtocolSequenceAnalytics();
    
    expect(() => callback('Guard')).not.toThrow();
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- useProtocolSequenceAnalytics.test.ts` → tests pass
- [ ] Manual: Open DevTools network tab, navigate homepage, verify analytics events fire
- [ ] No TypeScript errors: `npm run typecheck` passes

**Files Created:**
- `lib/hooks/useProtocolSequenceAnalytics.ts` (~50 lines)
- `lib/__tests__/useProtocolSequenceAnalytics.test.ts` (~50 lines)

**Files Modified:**
- `components/animations/ProtocolSequenceAnimation.tsx` (+10 lines for analytics integration)

---

### **T1-007: Add E2E Visual Regression Test for ProtocolSequenceAnimation**

**Objective:** Capture baseline screenshots for all 4 animation states.

**Acceptance Criteria:**
- [ ] Create `e2e/visual-regression/protocol-sequence.spec.ts`
- [ ] Test: "Guard state matches baseline" 
  - [ ] Render component
  - [ ] Capture screenshot: `await expect(element).toHaveScreenshot('guard-state.png')`
  - [ ] Store in `e2e/__screenshots__/protocol-sequence/`
- [ ] Test: "Comms state matches baseline"
  - [ ] Manually set state to Comms (pause animation, override state)
  - [ ] Capture screenshot
- [ ] Test: "BOL state matches baseline"
- [ ] Test: "YMS state matches baseline"
- [ ] Test: "Reduced motion renders static grid"
  - [ ] Emulate `prefers-reduced-motion: reduce`
  - [ ] Capture screenshot with all 4 modules visible
- [ ] Threshold: Allow <5% pixel variance (for anti-aliasing differences)

**Testing:**
```typescript
// e2e/visual-regression/protocol-sequence.spec.ts
import { test, expect } from '@playwright/test';

test('Protocol sequence Guard state', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const animation = page.locator('[data-testid="protocol-sequence-animation"]');
  
  // Component starts at Guard state
  await expect(animation).toHaveScreenshot('guard-state.png', {
    maxDiffPixels: 100, // Allow small differences
  });
});

test('Protocol sequence reduced-motion mode', async ({ page }) => {
  // Emulate prefers-reduced-motion
  await page.emulateMedia({ reducedMotion: 'reduce' });
  
  await page.goto('http://localhost:3000');
  const animation = page.locator('[data-testid="protocol-sequence-animation"]');
  
  // Should show all 4 modules in static grid
  await expect(animation).toHaveScreenshot('reduced-motion-grid.png');
});
```

**Validation:**
- [ ] Run: `npm run test:e2e -- protocol-sequence.spec.ts` → 5 visual regression tests pass
- [ ] Baseline screenshots created and committed to repo
- [ ] Manual: Compare generated screenshots (all 4 states + reduced-motion look correct)

**Files Created:**
- `e2e/visual-regression/protocol-sequence.spec.ts` (~60 lines)
- `e2e/__screenshots__/protocol-sequence/guard-state.png`
- `e2e/__screenshots__/protocol-sequence/comms-state.png`
- `e2e/__screenshots__/protocol-sequence/bol-state.png`
- `e2e/__screenshots__/protocol-sequence/yms-state.png`
- `e2e/__screenshots__/protocol-sequence/reduced-motion-grid.png`

---

### **T1-008: Accessibility Audit & Fixes for ProtocolSequenceAnimation**

**Objective:** Ensure component meets WCAG 2.1 Level AA accessibility standards.

**Acceptance Criteria:**
- [ ] Run axe accessibility audit:
  - [ ] Automated: `npm run test:a11y` (if configured) or Playwright axe integration
  - [ ] Zero violations found
- [ ] Check: Color contrast ratios
  - [ ] Neon (#00B4FF) on void (#050505): 10.5:1 ✅ AAA
  - [ ] Text readable in all states
- [ ] Check: Semantic HTML
  - [ ] Icons have `role="img"` or wrapped in proper heading/label context
  - [ ] Labels associated with icons via ARIA
  - [ ] Icons not wrapped in `<button>` (no interaction needed)
- [ ] Check: Keyboard navigation (if applicable)
  - [ ] No interactive elements that require keyboard, so pass
- [ ] Check: Screen reader behavior
  - [ ] Icon labels announced correctly
  - [ ] Animation state changes not announced (not a critical change for screen reader users)
  - [ ] Reduced-motion mode: all 4 modules discoverable by screen readers
- [ ] ARIA attributes:
  - [ ] Add `aria-label="Digital Guard"` or `aria-labelledby` to icon components
  - [ ] Animation region: `<div role="region" aria-live="polite" aria-label="Protocol sequence animation">`
  - [ ] Static grid (reduced motion): All 4 modules labeled clearly

**Testing:**
```typescript
// e2e/accessibility/protocol-sequence.spec.ts
import { injectAxe, checkA11y } from 'axe-playwright';

test('ProtocolSequenceAnimation has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await injectAxe(page);
  
  const violations = await checkA11y(page, '[data-testid="protocol-sequence-animation"]');
  expect(violations.length).toBe(0);
});

test('Icon labels are accessible to screen readers', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const guardIcon = page.locator('[aria-label="Digital Guard"]');
  await expect(guardIcon).toHaveAccessibleName('Digital Guard');
});

test('Color contrast meets WCAG AA', async ({ page }) => {
  // Manual verification (can't fully automate color contrast)
  // But can verify no text is too small or colors too similar
  
  await page.goto('http://localhost:3000');
  const labels = page.locator('[data-testid^="protocol-"]');
  
  // Verify labels are large enough
  const fontSize = await labels.first().evaluate(el => 
    window.getComputedStyle(el).fontSize
  );
  const size = parseInt(fontSize);
  expect(size).toBeGreaterThanOrEqual(12); // Minimum readable size
});
```

**Validation:**
- [ ] Run: `npm run test:a11y -- protocol-sequence.spec.ts` → 0 violations
- [ ] Manual: Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Manual: Verify color contrast with WebAIM contrast checker
- [ ] No lint warnings from eslint-plugin-jsx-a11y

**Files Created:**
- `e2e/accessibility/protocol-sequence.spec.ts` (~50 lines)

**Files Modified:**
- `components/animations/ProtocolSequenceAnimation.tsx` (+15 lines for ARIA attributes)
- Protocol icon components (+5 lines each for aria-label)

---

## Sprint 1 Completion Criteria

**All 8 tasks must be complete:**
1. ✅ T1-001: Icon components + tests
2. ✅ T1-002: Protocol module data + tests
3. ✅ T1-003: ProtocolSequenceAnimation component + timing logic + framer-motion + tests
4. ✅ T1-004: Reduced-motion fallback UI
5. ✅ T1-005: Homepage integration (replace DigitalGuardAnimation)
6. ✅ T1-006: Analytics tracking
7. ✅ T1-007: E2E visual regression tests
8. ✅ T1-008: Accessibility audit + fixes

**Demoable Output:**
- [ ] Homepage renders with cycling animation (Guard → Comms → BOL → YMS, 14s cycle)
- [ ] Animation is smooth (60fps, no jank)
- [ ] Reduced-motion mode shows static grid (all 4 modules visible)
- [ ] Accessibility: No violations, WCAG 2.1 Level AA compliant
- [ ] Tests: 50+ unit tests passing, 5+ E2E visual regression tests passing, 0 accessibility violations

**Validation Steps:**
```bash
# Build + typecheck
npm run build
npm run typecheck

# Lint
npm run lint

# All tests
npm run test:unit
npm run test:e2e
npm run test:a11y

# Congruence check (should still be 22/22)
npm run congruence:check

# Manual verification
# 1. Open homepage in browser
# 2. Verify animation cycles Guard → Comms → BOL → YMS every 3.5s
# 3. Verify full cycle is ~14 seconds
# 4. Open DevTools, emulate prefers-reduced-motion: reduce
# 5. Verify static grid appears (all 4 modules visible)
# 6. Verify no console errors/warnings
```

---

## Sprint 2: Card Aesthetic Alignment

**Goal:** Update module cards to match destination page aesthetics  
**Demoable Output:** Updated Singularity, Product, and other module cards  
**Success Metrics:** All cards score ≥70% on alignment rubric, visual regression tests pass  
**Duration:** 5-7 days

### **T2-001: Research & Design Decision - Singularity Card Visual**

**Objective:** Decide on Singularity card implementation approach (SVG grid vs. Canvas vs. simplified).

**Acceptance Criteria:**
- [ ] Create `docs/T2-001-SINGULARITY-DESIGN-DECISION.md` documenting:
  1. **Option A: SVG 32-Node Grid with Animated Particles**
     - Pros: Matches destination aesthetic, scalable, accessible
     - Cons: More complex SVG, animation overhead
     - Bundle impact: ~15KB (SVG + CSS)
  
  2. **Option B: Static SVG 32-Node Grid (No Animation)**
     - Pros: Simple, lightweight, still matches destination
     - Cons: Less engaging preview
     - Bundle impact: ~8KB
  
  3. **Option C: Simplified Canvas Visualization**
     - Pros: Compact, matches physics simulation feel
     - Cons: Accessibility harder, no hover interactivity
     - Bundle impact: ~20KB
  
  4. **RECOMMENDED: Option A (SVG with subtle animation)**
     - Reasoning: Balances aesthetic match + bundle size + accessibility
     - Animation: Subtle particle pulse on hover (not on load - no performance hit)
     - Fallback: Static grid when prefers-reduced-motion
     - Target: <50KB total card bundle

- [ ] Create SVG asset spec:
  - [ ] 32 nodes in 4×8 or 8×4 grid layout
  - [ ] Node size: 3-4px circles, neon color, subtle glow
  - [ ] Edges: 1px stroke connecting nodes, neon color, 50% opacity
  - [ ] Background: Gradient from void to carbon
  - [ ] File size: <10KB (optimized SVG)

- [ ] Animation spec (on hover):
  - [ ] Particle pulse: nodes scale 1.0 → 1.2 → 1.0 over 2s, repeat indefinitely
  - [ ] Edge glow: stroke opacity 0.5 → 1.0 → 0.5
  - [ ] Stagger: particles pulse with 100ms offset (creates wave effect)
  - [ ] No animation on page load (user must hover to trigger)

- [ ] Reduced-motion fallback:
  - [ ] Static grid, no animation, all nodes visible
  - [ ] Particle opacity: 0.8 (slightly dimmer than hover state)

- [ ] Stakeholder sign-off:
  - [ ] Product approves aesthetic approach
  - [ ] Engineering confirms bundle budget feasible
  - [ ] Design confirms particle grid matches destination vibe

**Validation:**
- [ ] Decision document written and reviewed
- [ ] SVG prototype created and tested for file size (<10KB)
- [ ] Stakeholder sign-off obtained (document approved)

**Files Created:**
- `docs/T2-001-SINGULARITY-DESIGN-DECISION.md` (~200 lines)
- `public/assets/singularity-particle-grid.svg` (~5KB, prototype)

---

### **T2-002: Create SingularityPreviewCard Component**

**Objective:** Build `<SingularityPreviewCard />` component with 32-node grid and particle animation.

**Acceptance Criteria:**
- [ ] Create `components/cards/SingularityPreviewCard.tsx`
- [ ] Component props:
  ```typescript
  interface SingularityPreviewCardProps {
    size?: 'sm' | 'md' | 'lg';     // Default: 'md'
    animated?: boolean;             // Default: true (can disable for performance)
    showLabel?: boolean;            // Default: true
  }
  ```
- [ ] Component rendering:
  - [ ] Container: Dark gradient background (void → carbon)
  - [ ] Border: `border border-neon/20`
  - [ ] Aspect ratio: 16:9 or 1:1 (TBD based on design)
  - [ ] Padding: 16px-24px (consistent with other cards)
- [ ] SVG particle grid:
  - [ ] Import SVG: `import ParticleGrid from '@/public/assets/singularity-particle-grid.svg'`
  - [ ] Display as `<Image>` component with proper sizing
  - [ ] Responsive sizing based on `size` prop (sm=200px, md=300px, lg=400px)
- [ ] Overlay content:
  - [ ] Label: "Variance Tax Protocol" (bold, neon color, centered or top-left)
  - [ ] Optional badge: "Re* = Calculated" or similar (if design calls for it)
  - [ ] Proof text: "Interactive physics simulation" (smaller text, steel color)
- [ ] Animation (hover):
  - [ ] Trigger particle animation via CSS class or inline `<style>` with `@keyframes`
  - [ ] Animation only on hover (not on load)
  - [ ] Use CSS animations (not JavaScript, for performance)
  - [ ] Particle pulse: 2s infinite loop
  - [ ] Stagger: use CSS `animation-delay` per particle group
- [ ] Reduced-motion support:
  - [ ] Check `prefersReducedMotion` from motion-presets
  - [ ] If true: disable hover animation, static display
- [ ] TypeScript: 0 errors
- [ ] Link: Wrapped in `<Link href="/singularity">` for navigation

**Testing:**
```typescript
// components/__tests__/SingularityPreviewCard.test.tsx
describe('SingularityPreviewCard', () => {
  test('renders with particle grid SVG', () => {
    render(<SingularityPreviewCard />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('displays label and proof text', () => {
    render(<SingularityPreviewCard />);
    expect(screen.getByText('Variance Tax Protocol')).toBeInTheDocument();
    expect(screen.getByText('Interactive physics simulation')).toBeInTheDocument();
  });

  test('responds to size prop', () => {
    const { container } = render(<SingularityPreviewCard size="lg" />);
    const card = container.querySelector('[data-testid="singularity-card"]');
    expect(card).toHaveStyle('width: 400px');
  });

  test('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
      })),
    });

    render(<SingularityPreviewCard />);
    
    // Animation should not be active
    const animatedDiv = screen.queryByTestId('singularity-animated');
    expect(animatedDiv).not.toBeInTheDocument();
  });

  test('is navigable to /singularity', () => {
    render(<SingularityPreviewCard />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/singularity');
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- SingularityPreviewCard.test.ts` → All tests pass
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Manual: Hover over card in browser, verify particle animation activates
- [ ] Manual: Emulate prefers-reduced-motion, verify no animation
- [ ] File size: Verify card bundle <50KB (including SVG asset)

**Files Created:**
- `components/cards/SingularityPreviewCard.tsx` (~120 lines)
- `components/__tests__/SingularityPreviewCard.test.tsx` (~100 lines)
- `public/assets/singularity-particle-grid.svg` (~5KB)

**Files Modified:**
- `components/cards/index.ts` (export new card component)

---

### **T2-003: Update Homepage to Use SingularityPreviewCard**

**Objective:** Replace generic Singularity card with new aesthetic-matched component.

**Acceptance Criteria:**
- [ ] Find Singularity card in `app/page.tsx` (in module cards section)
- [ ] Replace existing card component with `<SingularityPreviewCard />`
- [ ] Verify no styling conflicts (card should fit layout grid)
- [ ] TypeScript compiles: `npm run typecheck` passes
- [ ] No lint errors: `npm run lint` passes

**Testing:**
```typescript
// e2e/visual-regression/homepage.spec.ts (extend existing)
test('Singularity card displays particle grid', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const singularityCard = page.locator('[data-testid="singularity-card"]');
  expect(singularityCard).toBeVisible();
  
  // Check for particle grid SVG
  const particleGrid = singularityCard.locator('svg');
  expect(particleGrid).toBeVisible();
});

test('Singularity card has correct label', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const label = page.getByText('Variance Tax Protocol');
  expect(label).toBeVisible();
});
```

**Validation:**
- [ ] Build: `npm run build` → succeeds
- [ ] E2E: `npm run test:e2e` → 2+ new tests pass
- [ ] Manual: Homepage loads, Singularity card visible with particle grid
- [ ] Congruence check: `npm run congruence:check` → 22/22 (no regressions)

**Files Modified:**
- `app/page.tsx` (1 import, 1 component replacement)

---

### **T2-004: Create ProductPreviewCard Component**

**Objective:** Build card showing 4 core modules (Guard, Comms, BOL, YMS).

**Acceptance Criteria:**
- [ ] Create `components/cards/ProductPreviewCard.tsx`
- [ ] Component props:
  ```typescript
  interface ProductPreviewCardProps {
    size?: 'sm' | 'md' | 'lg';
    layout?: 'grid' | 'inline';      // Default: 'grid' (2×2 on desktop)
  }
  ```
- [ ] Display 4 module icons (Guard, Comms, BOL, YMS):
  - [ ] Import icons from protocol-icons (T1-001)
  - [ ] Grid layout: 2×2 on desktop, 2×2 on mobile (4 modules always fit)
  - [ ] Icon size: 32px base
  - [ ] Icon color: neon (#00B4FF)
  - [ ] Spacing: 12-16px gap between icons
- [ ] Labels:
  - [ ] "Product" or "4 Core Modules" as card headline
  - [ ] Optional module name labels below each icon (small text, steel color)
  - [ ] Proof text: "One protocol powers four complementary modules"
- [ ] Styling:
  - [ ] Background: Dark gradient (void → carbon)
  - [ ] Border: `border border-neon/20`
  - [ ] Container: `w-full aspect-square` (square card matching other cards)
- [ ] Hover effect:
  - [ ] Optional: Per-module highlight on hover (icon glows)
  - [ ] Or: Card border glow intensifies
- [ ] Navigation: Wrapped in `<Link href="/product">`
- [ ] Reduced-motion: Disable per-module animations, static display

**Testing:**
```typescript
// components/__tests__/ProductPreviewCard.test.tsx
describe('ProductPreviewCard', () => {
  test('renders all 4 module icons', () => {
    render(<ProductPreviewCard />);
    
    expect(screen.getByTestId('protocol-guard')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-comms')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-bol')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-yms')).toBeInTheDocument();
  });

  test('displays product headline', () => {
    render(<ProductPreviewCard />);
    expect(screen.getByText(/Product|4 Core Modules/)).toBeInTheDocument();
  });

  test('uses grid layout by default', () => {
    const { container } = render(<ProductPreviewCard />);
    const grid = container.querySelector('[data-testid="product-grid"]');
    expect(grid).toHaveClass('grid-cols-2', 'md:grid-cols-2');
  });

  test('all 4 modules are visible simultaneously (not cycling)', () => {
    render(<ProductPreviewCard />);
    
    // Unlike ProtocolSequenceAnimation, all 4 should be visible
    expect(screen.getByTestId('protocol-guard')).toBeVisible();
    expect(screen.getByTestId('protocol-comms')).toBeVisible();
    expect(screen.getByTestId('protocol-bol')).toBeVisible();
    expect(screen.getByTestId('protocol-yms')).toBeVisible();
  });

  test('is navigable to /product', () => {
    render(<ProductPreviewCard />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product');
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- ProductPreviewCard.test.ts` → All tests pass
- [ ] Manual: Card displays 4 icons in 2×2 grid
- [ ] Manual: Hover effect works (if implemented)
- [ ] Manual: Mobile view shows correct layout

**Files Created:**
- `components/cards/ProductPreviewCard.tsx` (~100 lines)
- `components/__tests__/ProductPreviewCard.test.tsx` (~80 lines)

---

### **T2-005: Create NetworkEffectPreviewCard Component**

**Objective:** Build card showing exponential value curve (hockey stick graph).

**Acceptance Criteria:**
- [ ] Create `components/cards/NetworkEffectPreviewCard.tsx`
- [ ] Component props:
  ```typescript
  interface NetworkEffectPreviewCardProps {
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;  // Default: true (curve draw animation)
  }
  ```
- [ ] Display exponential curve:
  - [ ] Use SVG `<path>` or Canvas to render curve
  - [ ] X-axis: # of facilities (0 → 10+)
  - [ ] Y-axis: Value / Return (0 → max)
  - [ ] Line color: neon (#00B4FF) or gradient (neon to green)
  - [ ] Upward trajectory is clear (hockey stick shape)
  - [ ] Grid lines (optional) for readability
- [ ] Animation (on load):
  - [ ] Path animation: stroke-dasharray animation drawing curve left-to-right
  - [ ] Duration: 2-3 seconds
  - [ ] Easing: easeInOutQuad
  - [ ] Reduced-motion: Static curve (no animation)
- [ ] Labels:
  - [ ] Headline: "Network Effect" or "Scaling Value"
  - [ ] Axis labels: "Facilities" (X), "Economic Value" (Y) - optional, small text
  - [ ] Proof text: "Value compounds as network density increases"
- [ ] Styling:
  - [ ] Background: Dark gradient (void → carbon)
  - [ ] Border: `border border-neon/20`
  - [ ] Container: `w-full aspect-video` or similar
- [ ] Navigation: Wrapped in `<Link href="/network-effect">`

**Testing:**
```typescript
// components/__tests__/NetworkEffectPreviewCard.test.tsx
describe('NetworkEffectPreviewCard', () => {
  test('renders SVG path for curve', () => {
    render(<NetworkEffectPreviewCard />);
    expect(screen.getByRole('img')).toBeInTheDocument(); // SVG role
  });

  test('displays headline and proof text', () => {
    render(<NetworkEffectPreviewCard />);
    expect(screen.getByText(/Network Effect|Scaling Value/)).toBeInTheDocument();
    expect(screen.getByText(/compounds/)).toBeInTheDocument();
  });

  test('curve shows upward trend (hockey stick)', () => {
    const { container } = render(<NetworkEffectPreviewCard />);
    const path = container.querySelector('path[d*="C"]'); // Cubic bezier = curve
    expect(path).toBeInTheDocument();
    // Visual inspection: curve should go up-right
  });

  test('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
      })),
    });

    render(<NetworkEffectPreviewCard />);
    
    // Curve should still be visible (static, no animation)
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
```

**Validation:**
- [ ] Run: `npm run test:unit -- NetworkEffectPreviewCard.test.ts` → tests pass
- [ ] Manual: Card displays hockey stick curve
- [ ] Manual: Animation draws curve smoothly on page load
- [ ] Manual: Reduced-motion mode shows static curve

**Files Created:**
- `components/cards/NetworkEffectPreviewCard.tsx` (~110 lines)
- `components/__tests__/NetworkEffectPreviewCard.test.tsx` (~80 lines)

---

### **T2-006: Update Homepage Module Cards Section**

**Objective:** Replace old module cards with new aesthetically-aligned versions.

**Acceptance Criteria:**
- [ ] Find module cards section in `app/page.tsx` (typically 4-card grid)
- [ ] Update cards:
  - [ ] Singularity: `<SingularityPreviewCard />` (from T2-002)
  - [ ] Product: `<ProductPreviewCard />` (from T2-004)
  - [ ] Network Effect: `<NetworkEffectPreviewCard />` (from T2-005)
  - [ ] ROI: Keep existing ROI card (already good from S4-004)
- [ ] Grid layout: Verify 4 cards fit correctly on desktop/mobile/tablet
- [ ] Spacing: Consistent gap between cards
- [ ] TypeScript: 0 errors
- [ ] Lint: 0 errors

**Testing:**
```typescript
// e2e/visual-regression/homepage-cards.spec.ts
test('module cards display updated aesthetics', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Singularity card
  const singularityCard = page.locator('[data-testid="singularity-card"]');
  expect(singularityCard).toBeVisible();
  
  // Product card
  const productCard = page.locator('[data-testid="product-card"]');
  expect(productCard).toBeVisible();
  
  // Network effect card
  const networkCard = page.locator('[data-testid="network-effect-card"]');
  expect(networkCard).toBeVisible();
  
  // ROI card (existing)
  const roiCard = page.locator('[data-testid="roi-card"]');
  expect(roiCard).toBeVisible();
});

test('cards layout correctly on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
  await page.goto('http://localhost:3000');
  
  const cards = page.locator('[data-testid$="-card"]');
  expect(await cards.count()).toBe(4);
  
  // All cards should be visible (possibly scrollable)
  for (let i = 0; i < 4; i++) {
    await expect(cards.nth(i)).toBeInViewport({ ratio: 0.5 });
  }
});
```

**Validation:**
- [ ] Build: `npm run build` → succeeds
- [ ] E2E tests: Visual regression tests pass
- [ ] Manual: Homepage shows 4 updated cards
- [ ] Mobile: Cards stack correctly on small screens
- [ ] Congruence: `npm run congruence:check` → 22/22

**Files Modified:**
- `app/page.tsx` (imports + component replacements for 3 cards)

---

### **T2-007: Add Visual Regression Baselines for All Cards**

**Objective:** Capture screenshots of new cards for future regression testing.

**Acceptance Criteria:**
- [ ] Create `e2e/visual-regression/preview-cards.spec.ts`
- [ ] Tests for each card:
  - [ ] "Singularity card renders with particle grid"
  - [ ] "Product card shows 4 modules"
  - [ ] "Network effect card shows hockey stick curve"
  - [ ] "ROI card displays calculator preview"
  - [ ] "Cards render correctly on mobile"
- [ ] Baselines stored in: `e2e/__screenshots__/preview-cards/`
- [ ] Threshold: <5% pixel variance

**Testing:**
```typescript
// e2e/visual-regression/preview-cards.spec.ts
test('Singularity card visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const card = page.locator('[data-testid="singularity-card"]');
  await expect(card).toHaveScreenshot('singularity-card.png');
});

test('Product card visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const card = page.locator('[data-testid="product-card"]');
  await expect(card).toHaveScreenshot('product-card.png');
});

test('Network effect card visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const card = page.locator('[data-testid="network-effect-card"]');
  await expect(card).toHaveScreenshot('network-effect-card.png');
});

test('ROI card visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const card = page.locator('[data-testid="roi-card"]');
  await expect(card).toHaveScreenshot('roi-card.png');
});
```

**Validation:**
- [ ] Run: `npm run test:e2e -- preview-cards.spec.ts` → tests pass
- [ ] Baseline screenshots created

**Files Created:**
- `e2e/visual-regression/preview-cards.spec.ts` (~60 lines)
- `e2e/__screenshots__/preview-cards/singularity-card.png`
- `e2e/__screenshots__/preview-cards/product-card.png`
- `e2e/__screenshots__/preview-cards/network-effect-card.png`
- `e2e/__screenshots__/preview-cards/roi-card.png`

---

### **T2-008: Accessibility Audit for New Card Components**

**Objective:** Ensure all new cards meet WCAG 2.1 Level AA standards.

**Acceptance Criteria:**
- [ ] Run axe accessibility scan on each card:
  - [ ] `npm run test:a11y` or Playwright axe integration
  - [ ] Zero violations per card
- [ ] Check: Color contrast (all cards)
  - [ ] Neon on void: 10.5:1 ✅ AAA
  - [ ] Steel on void: 4.5:1 ✅ AA
- [ ] Check: Semantic HTML
  - [ ] Headings properly nested (h2/h3)
  - [ ] Links have accessible names (href + text/aria-label)
  - [ ] SVGs have role="img" + accessible name
- [ ] Check: Screen reader behavior
  - [ ] Card purpose announced clearly
  - [ ] Navigation links announced correctly
  - [ ] Icons labeled properly
- [ ] Check: Keyboard navigation
  - [ ] All cards focusable (via Tab)
  - [ ] Card link accessible via Enter
- [ ] ARIA attributes:
  - [ ] Add `aria-label` to card containers
  - [ ] SVG images: `role="img"` + descriptive title

**Testing:**
```typescript
// e2e/accessibility/preview-cards.spec.ts
import { injectAxe, checkA11y } from 'axe-playwright';

test('Singularity card has no a11y violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await injectAxe(page);
  const violations = await checkA11y(page, '[data-testid="singularity-card"]');
  expect(violations.length).toBe(0);
});

test('Product card keyboard navigable', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const card = page.locator('[data-testid="product-card"]');
  
  // Should be focusable
  await card.focus();
  await expect(card).toBeFocused();
  
  // Should navigate on Enter
  await page.keyboard.press('Enter');
  expect(page.url()).toContain('/product');
});
```

**Validation:**
- [ ] Run: `npm run test:a11y -- preview-cards.spec.ts` → 0 violations
- [ ] Manual: Test with screen reader
- [ ] Manual: Tab through homepage, verify card links accessible

**Files Created:**
- `e2e/accessibility/preview-cards.spec.ts` (~80 lines)

**Files Modified:**
- New card components (add aria-label, role="img", etc.)

---

## Sprint 2 Completion Criteria

**All 8 tasks complete:**
1. ✅ T2-001: Design decision documented
2. ✅ T2-002: SingularityPreviewCard + tests + particle grid SVG
3. ✅ T2-003: Homepage updated with SingularityPreviewCard
4. ✅ T2-004: ProductPreviewCard + tests
5. ✅ T2-005: NetworkEffectPreviewCard + tests
6. ✅ T2-006: Homepage cards section updated
7. ✅ T2-007: Visual regression baselines captured
8. ✅ T2-008: Accessibility audit + fixes

**Demoable Output:**
- [ ] Homepage module cards section displays new aesthetic-matched cards
- [ ] Singularity card: 32-node particle grid, hover animation, <50KB
- [ ] Product card: 4-module icons in grid
- [ ] Network effect card: Hockey stick exponential curve
- [ ] ROI card: Existing (unchanged, already good)
- [ ] All cards: WCAG 2.1 Level AA compliant, visual regression tested

**Validation Steps:**
```bash
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run congruence:check

# Manual: Homepage shows 4 updated cards
# Cards display destination aesthetic previews
# All animations smooth, no performance regressions
# Lighthouse ≥90
```

---

## Sprint 3: Polish, Testing & Deployment Readiness

**Goal:** Finalize animations, comprehensive testing, performance optimization, analytics  
**Demoable Output:** Production-ready homepage with all refinements validated  
**Success Metrics:** Lighthouse ≥90, WCAG 2.1 Level AA, Congruence 22/22, all tests passing  
**Duration:** 4-6 days

### **T3-001: Refine Animation Timing & Performance**

**Objective:** Optimize ProtocolSequenceAnimation and card animations for 60fps, minimal CPU usage.

**Acceptance Criteria:**
- [ ] Performance audit:
  - [ ] Use Chrome DevTools Performance tab to record 5-second animation loop
  - [ ] Frame rate: Maintain 60fps (no dropped frames)
  - [ ] CPU usage: <5% during idle loop
  - [ ] GPU acceleration: Verify `will-change: opacity, transform` applied
- [ ] Framer Motion optimization:
  - [ ] Verify AnimatePresence doesn't cause React re-renders per frame
  - [ ] Check for unnecessary re-renders: use React DevTools Profiler
  - [ ] Profile: should see re-render only on state change (every 3.5s), not every frame
- [ ] CSS optimizations:
  - [ ] Particle animation: Use CSS `@keyframes` (not JS animation)
  - [ ] Hardware acceleration: `transform: translateZ(0)` if needed
  - [ ] Reduce initial layout shift: Specify container dimensions upfront
- [ ] Bundle size check:
  - [ ] Animation component: <50KB total
  - [ ] Card components: <100KB total (all 4 cards)
  - [ ] SVG assets: <30KB total (particle grid + curve + icons)
- [ ] Benchmarks:
  - [ ] Before: Baseline performance from current homepage
  - [ ] After: Verify no regression (ideally improvement)
  - [ ] Document results in `docs/PERFORMANCE_OPTIMIZATION.md`

**Testing:**
```typescript
// e2e/performance/animation.spec.ts (if feasible with Playwright)
test('ProtocolSequenceAnimation maintains 60fps', async ({ page }) => {
  // Start performance tracing
  await page.evaluate(() => {
    window.performance.mark('animation-start');
  });
  
  await page.goto('http://localhost:3000');
  
  // Record 5 seconds
  await page.waitForTimeout(5000);
  
  await page.evaluate(() => {
    window.performance.mark('animation-end');
    window.performance.measure('animation', 'animation-start', 'animation-end');
  });
  
  const metrics = await page.evaluate(() => window.performance.getEntriesByType('measure'));
  expect(metrics.length).toBeGreaterThan(0);
  // Check metrics for dropped frames (more complex test setup needed)
});
```

**Validation:**
- [ ] Run: Chrome DevTools Performance profiler, verify 60fps
- [ ] Check: React DevTools Profiler shows minimal re-renders
- [ ] Manual: Homepage feels smooth, no stutter or jank
- [ ] Bundle: `npm run build`, verify bundle sizes within targets
- [ ] Document: Write performance optimization report

**Files Created:**
- `docs/PERFORMANCE_OPTIMIZATION.md` (~100 lines)

---

### **T3-002: Homepage Scroll & Focus Management**

**Objective:** Ensure smooth scroll experience and keyboard navigation to new components.

**Acceptance Criteria:**
- [ ] Scroll behavior:
  - [ ] Hero section (with ProtocolSequenceAnimation) scrolls smoothly
  - [ ] Module cards section scrolls smoothly
  - [ ] No scroll jank or stuttering
  - [ ] Scroll performance: 60fps (test with DevTools)
- [ ] Focus management:
  - [ ] Tab navigation: Can tab through all interactive elements
  - [ ] First tab stop: Hero CTA (not animation)
  - [ ] Animation doesn't trap focus (is not focusable itself)
  - [ ] Module cards are focusable and clickable
  - [ ] Focus visible: Clear focus indicators on all interactive elements
- [ ] Keyboard shortcuts (if applicable):
  - [ ] Esc to close any modals (none expected on homepage)
  - [ ] Arrow keys for card selection (if implementing carousel - optional)
- [ ] Skip links (optional, nice-to-have):
  - [ ] "Skip to main content" link for a11y
  - [ ] Hidden by default, visible on Tab press

**Testing:**
```typescript
// e2e/keyboard-navigation/homepage.spec.ts
test('can tab through homepage interactive elements', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Tab to first focusable element (should be CTA or card link)
  await page.keyboard.press('Tab');
  let focused = await page.evaluate(() => document.activeElement?.testId);
  expect(focused).toBeDefined();
  
  // Continue tabbing through ~10 elements
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    focused = await page.evaluate(() => document.activeElement?.testId);
    expect(focused).toBeDefined();
  }
});

test('module card links are keyboard accessible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Find Product card link
  const productCardLink = page.locator('a[href="/product"]').first();
  
  // Focus and press Enter
  await productCardLink.focus();
  await page.keyboard.press('Enter');
  
  // Should navigate to /product
  expect(page.url()).toContain('/product');
});

test('focus indicator visible on all interactive elements', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Tab to first element
  await page.keyboard.press('Tab');
  
  // Verify focus outline is visible (not outline: none)
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    return window.getComputedStyle(el).outline;
  });
  
  expect(focused).not.toBe('none');
});
```

**Validation:**
- [ ] Run: Keyboard navigation test suite → all pass
- [ ] Manual: Tab through homepage, verify all interactive elements accessible
- [ ] Manual: Verify no focus traps
- [ ] DevTools Lighthouse audit: Accessibility score ≥90

**Files Created:**
- `e2e/keyboard-navigation/homepage.spec.ts` (~80 lines)

---

### **T3-003: Comprehensive E2E Test Suite for Updated Homepage**

**Objective:** Full end-to-end test coverage for ProtocolSequenceAnimation + new cards.

**Acceptance Criteria:**
- [ ] E2E tests for:
  1. **Hero Section**
     - [ ] ProtocolSequenceAnimation renders
     - [ ] Cycles through all 4 states
     - [ ] Each state displays for correct duration
     - [ ] Transitions are smooth
     - [ ] Static fallback works (prefers-reduced-motion)
     - [ ] Hero CTA clickable
  
  2. **Module Cards**
     - [ ] All 4 cards visible
     - [ ] Singularity card: particle grid displayed
     - [ ] Product card: 4 icons displayed
     - [ ] Network effect card: curve displayed
     - [ ] ROI card: calculator grid displayed
     - [ ] Each card navigates to correct destination on click
  
  3. **Responsive Design**
     - [ ] Desktop (1920px): All elements visible
     - [ ] Tablet (768px): Layout adjusts correctly
     - [ ] Mobile (375px): Single column, readable
     - [ ] No horizontal scroll
  
  4. **Performance**
     - [ ] Page load time <3s (Lighthouse)
     - [ ] Largest Contentful Paint <2.5s
     - [ ] Cumulative Layout Shift <0.1
  
  5. **Accessibility**
     - [ ] No axe violations
     - [ ] All text readable (color contrast)
     - [ ] Keyboard navigation works
     - [ ] Screen reader announces all content

**Testing:**
```typescript
// e2e/homepage.spec.ts (comprehensive suite)
test.describe('Homepage - Updated', () => {
  test('full page load and render', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Hero should be visible
    expect(page.locator('[data-testid="protocol-sequence-animation"]')).toBeVisible();
    
    // Module cards should be visible
    expect(page.locator('[data-testid="singularity-card"]')).toBeVisible();
    expect(page.locator('[data-testid="product-card"]')).toBeVisible();
    expect(page.locator('[data-testid="network-effect-card"]')).toBeVisible();
    expect(page.locator('[data-testid="roi-card"]')).toBeVisible();
  });

  test('Singularity card navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const singularityLink = page.locator('[data-testid="singularity-card"] a').first();
    await singularityLink.click();
    
    expect(page.url()).toContain('/singularity');
  });

  test('Product card navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const productLink = page.locator('[data-testid="product-card"] a').first();
    await productLink.click();
    
    expect(page.url()).toContain('/product');
  });

  test('performance metrics meet targets', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: nav.loadEventEnd - nav.fetchStart,
        lcp: performance.getEntriesByType('largest-contentful-paint').pop()?.renderTime,
        cls: performance.getEntriesByType('layout-shift')
          .filter(entry => !entry.hadRecentInput)
          .reduce((sum, entry) => sum + entry.value, 0),
      };
    });
    
    expect(metrics.loadTime).toBeLessThan(3000);
    expect(metrics.lcp).toBeLessThan(2500);
    expect(metrics.cls).toBeLessThan(0.1);
  });

  test.describe('responsive design', () => {
    test('desktop layout (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3000');
      
      const cards = page.locator('[data-testid$="-card"]');
      expect(await cards.count()).toBe(4);
      
      // All 4 cards should be visible without scrolling
      for (let i = 0; i < 4; i++) {
        await expect(cards.nth(i)).toBeInViewport();
      }
    });

    test('mobile layout (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      const hero = page.locator('[data-testid="protocol-sequence-animation"]');
      await expect(hero).toBeVisible();
      
      // No horizontal scroll
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(width).toBeLessThanOrEqual(375);
    });
  });
});
```

**Validation:**
- [ ] Run: `npm run test:e2e -- homepage.spec.ts` → 15+ tests pass
- [ ] Coverage: All critical user paths tested
- [ ] Performance: Metrics meet Lighthouse targets
- [ ] Manual: Full homepage walkthrough on multiple devices

**Files Created:**
- `e2e/homepage.spec.ts` (~250 lines, comprehensive test suite)

---

### **T3-004: Update Congruence Check (If Needed)**

**Objective:** Ensure congruence check still passes with all new components.

**Acceptance Criteria:**
- [ ] Run: `npm run congruence:check` → Should pass all 22 checks:
  1. TypeScript compilation
  2. ESLint
  3. Unit tests (add new tests, ensure all pass)
  4. E2E tests
  5. Build
  6. Brand audit
  7. Economics audit
  8. Design audit
  9. Docs audit
  10. Performance baselines
- [ ] If any check fails:
  - [ ] Diagnose root cause
  - [ ] Fix (update configuration, code, or baseline)
  - [ ] Ensure no regressions introduced
- [ ] Document any congruence check updates in release notes

**Testing:**
```bash
npm run typecheck     # TypeScript
npm run lint          # ESLint
npm run test:unit    # Unit tests
npm run test:e2e     # E2E tests
npm run build        # Build
npm run congruence:check  # Full audit
```

**Validation:**
- [ ] All congruence checks pass: 22/22 ✅
- [ ] No new warnings or errors
- [ ] Build succeeds with no issues

---

### **T3-005: Analytics & Success Metrics Documentation**

**Objective:** Document expected analytics metrics and success criteria for tracking.

**Acceptance Criteria:**
- [ ] Create `docs/SPRINT_SUCCESS_METRICS.md` documenting:
  1. **Technical Metrics (Automated)**
     - Congruence: 22/22 passing
     - TypeScript: 0 errors
     - ESLint: 0 errors, 0 warnings
     - Tests: 400+ unit tests, 15+ E2E tests, 0 accessibility violations
     - Lighthouse: ≥90 overall, ≥90 performance
  
  2. **Visual/UX Metrics (Manual)**
     - ProtocolSequenceAnimation cycles smoothly (Guard → Comms → BOL → YMS)
     - Module cards display destination aesthetics
     - Singularity card particle grid matches 32-node style
     - No visual jarring on any viewport (mobile/tablet/desktop)
  
  3. **Analytics Metrics (Post-Launch)**
     - Protocol sequence view events: Track which modules users see
     - Module card CTR: Compare Singularity card CTR before/after
     - Homepage bounce rate: Should not increase (engagement improves)
     - Scroll depth: Users scrolling to module cards section
  
  4. **Performance Metrics**
     - Page load time: <3s (median)
     - First Contentful Paint: <2s
     - Largest Contentful Paint: <2.5s
     - Cumulative Layout Shift: <0.1
     - Animation frame rate: 60fps (no dropped frames)
  
  5. **Accessibility Metrics**
     - WCAG 2.1 Level AA: 0 violations
     - Color contrast: All text ≥4.5:1 (AA), ideal ≥7:1 (AAA)
     - Keyboard navigation: All interactive elements accessible via Tab
     - Screen reader: All content announced correctly
  
- [ ] Baseline values (pre-sprint) documented (if applicable)
- [ ] Target values documented
- [ ] Success criteria: All metrics meet targets

**Validation:**
- [ ] Document created and reviewed
- [ ] Metrics aligned with product goals
- [ ] Analytics instrumentation verified

**Files Created:**
- `docs/SPRINT_SUCCESS_METRICS.md` (~150 lines)

---

### **T3-006: Final QA & Release Preparation**

**Objective:** Comprehensive QA pass and prepare for production deployment.

**Acceptance Criteria:**
- [ ] QA Checklist:
  - [ ] **Functionality:** All features work as designed
    - [ ] ProtocolSequenceAnimation cycles correctly
    - [ ] Module cards navigate to destinations
    - [ ] All animations smooth and responsive
  
  - [ ] **Cross-Browser:** Test on Chrome, Firefox, Safari, Edge
    - [ ] Animations render correctly
    - [ ] No layout issues
    - [ ] Color rendering consistent
  
  - [ ] **Cross-Device:** Test on iPhone, Android, iPad, desktop
    - [ ] Responsive layout works
    - [ ] Touch interactions work (card taps)
    - [ ] No horizontal scroll
  
  - [ ] **Performance:** Lighthouse audit
    - [ ] Overall: ≥90
    - [ ] Performance: ≥90
    - [ ] Accessibility: ≥90
    - [ ] Best Practices: ≥90
    - [ ] SEO: ≥90
  
  - [ ] **Accessibility:** Final a11y audit
    - [ ] axe scan: 0 violations
    - [ ] Keyboard: Fully navigable
    - [ ] Screen reader: All content accessible
    - [ ] Color contrast: Verified
  
  - [ ] **Build & Deployment:**
    - [ ] Production build succeeds
    - [ ] No console errors or warnings
    - [ ] Sourcemaps generated (if applicable)
    - [ ] Build size within limits
  
  - [ ] **Regression Testing:**
    - [ ] All previous features still work
    - [ ] No new bugs introduced
    - [ ] Congruence: 22/22 passing
  
  - [ ] **Documentation:**
    - [ ] README updated (if needed)
    - [ ] API documentation current
    - [ ] Developer guide updated
    - [ ] Deployment instructions clear

- [ ] Release Notes:
  - [ ] What's new (ProtocolSequenceAnimation, updated cards)
  - [ ] What's fixed (no major bugs fixed, this is feature addition)
  - [ ] Known limitations (if any)
  - [ ] Migration guide (not needed, backward compatible)

- [ ] Deployment checklist:
  - [ ] Code review approved
  - [ ] All tests passing
  - [ ] Congruence check passing
  - [ ] Stakeholders signed off
  - [ ] Deployment plan documented
  - [ ] Rollback plan documented

**Testing:**
```bash
# Full QA pass
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run congruence:check

# Manual QA
# - Open homepage in multiple browsers
# - Test on mobile/tablet/desktop
# - Run Lighthouse audit
# - Verify all navigations work
# - Check console for errors
```

**Validation:**
- [ ] All QA checks pass
- [ ] Lighthouse ≥90 across all metrics
- [ ] Accessibility: 0 violations
- [ ] Build succeeds
- [ ] Ready for production deployment

**Files Created:**
- `RELEASE_NOTES.md` (~100 lines)
- `DEPLOYMENT_CHECKLIST.md` (~80 lines)

---

## Sprint 3 Completion Criteria

**All 6 tasks complete:**
1. ✅ T3-001: Performance optimization & benchmarks
2. ✅ T3-002: Scroll & focus management
3. ✅ T3-003: Comprehensive E2E test suite
4. ✅ T3-004: Congruence check passing (22/22)
5. ✅ T3-005: Analytics & success metrics documented
6. ✅ T3-006: Final QA & release preparation

**Demoable Output:**
- [ ] Production-ready homepage with ProtocolSequenceAnimation
- [ ] All module cards with destination-matched aesthetics
- [ ] Full test coverage (unit + E2E + accessibility)
- [ ] Performance optimized (Lighthouse ≥90)
- [ ] WCAG 2.1 Level AA compliant
- [ ] Ready for deployment

**Final Validation Steps:**
```bash
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run congruence:check

# Expected results:
# ✅ 22/22 congruence checks passing
# ✅ TypeScript: 0 errors
# ✅ ESLint: 0 errors, 0 warnings
# ✅ Unit tests: 400+ passing
# ✅ E2E tests: 15+ passing, all visual regression baselines matched
# ✅ Accessibility: 0 violations
# ✅ Build: Succeeds, bundle size within limits
# ✅ Lighthouse: ≥90 all metrics
```

---

## Summary: Task Count & Organization

### **Total Tasks: 26 Atomic, Committable Tasks**

**Sprint 1: ProtocolSequenceAnimation (8 tasks)**
- T1-001: Icon components
- T1-002: Protocol module data
- T1-003: Animation component (main)
- T1-004: Reduced-motion fallback
- T1-005: Homepage integration
- T1-006: Analytics tracking
- T1-007: E2E visual regression
- T1-008: Accessibility audit

**Sprint 2: Card Aesthetics (8 tasks)**
- T2-001: Design decision (Singularity)
- T2-002: SingularityPreviewCard
- T2-003: Homepage update (Singularity)
- T2-004: ProductPreviewCard
- T2-005: NetworkEffectPreviewCard
- T2-006: Homepage cards section update
- T2-007: Visual regression baselines
- T2-008: Accessibility audit

**Sprint 3: Polish & Deployment (6 tasks)**
- T3-001: Performance optimization
- T3-002: Scroll & focus management
- T3-003: Comprehensive E2E tests
- T3-004: Congruence check
- T3-005: Analytics & metrics
- T3-006: Final QA & release prep

### **Key Characteristics of All Tasks:**

✅ **Atomic:** Each task is a discrete, committable unit of work  
✅ **Testable:** Each task has explicit validation criteria + automated tests  
✅ **Demoable:** Each sprint produces runnable, deployable software  
✅ **Sequenced:** Tasks within sprints can run in parallel where independent  
✅ **Documented:** All tasks have acceptance criteria, testing strategy, & success metrics  
✅ **Traceable:** Each task maps to specific files, features, and success criteria  

---

## Next Step: Subagent Review

This comprehensive sprint plan (26 tasks across 3 sprints) is ready for **technical review by a subagent**. The subagent should evaluate:

1. **Completeness:** Are all aspects of the problem covered?
2. **Atomicity:** Are tasks appropriately sized (not too big, not too small)?
3. **Dependencies:** Are dependencies correctly identified and sequenced?
4. **Testing:** Is test coverage sufficient and practical?
5. **Feasibility:** Are effort estimates reasonable?
6. **Gaps:** What's missing or overlooked?
7. **Improvements:** How can the plan be strengthened?

---

**END OF DRAFT SPRINT PLAN**
