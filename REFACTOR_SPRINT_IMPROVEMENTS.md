# Sprint Plan Improvements - Critical Additions

**Source:** Subagent review feedback  
**Status:** Integrate these into REFACTOR_SPRINT_PLAN.md

---

## Additional S0 Tasks (Insert After S0.6)

### S0.7: Content Model Migration Layer (Adapter Pattern)
**Complexity:** M  
**Description:** Create adapter functions to allow incremental migration to content model without breaking existing components.

**Depends on:** S0.2c, S0.3, S0.4  
**Blocks:** S1.2, S1.4, S1.5

**Acceptance Criteria:**
- [ ] `lib/content/adapters.ts` created
- [ ] Adapter functions: `getProofPoints()`, `getSections()`, `getCoDevTracks()`
- [ ] Adapters return hardcoded data initially (fallback to old system)
- [ ] Components can import from adapters without breaking
- [ ] Gradual migration plan documented

**Implementation:**
```typescript
// lib/content/adapters.ts
import { PROOF_POINTS } from './proofPoints';

// Adapter pattern: components call this, we control what it returns
export function getProofPoints() {
  // Phase 1: Return hardcoded data (safe)
  // Phase 2: Return PROOF_POINTS (after validation)
  return PROOF_POINTS;
}

// Usage in components:
import { getProofPoints } from '@/lib/content/adapters';
const points = getProofPoints(); // Always works, data source changes internally
```

**Validation:**
```bash
# Components compile with new imports
npm run typecheck

# Site still works
npm run dev
# Visit /, /product, /proof - no errors
```

---

### S0.8: Economics Integration Audit
**Complexity:** S  
**Description:** Verify proof points don't conflict with locked ROI formula governance.

**Depends on:** S0.2c  
**Blocks:** None (parallel with other S0 tasks)

**Acceptance Criteria:**
- [ ] Review `PROOF_POINTS` against `ECONOMICS_AUDIT.md`
- [ ] Categorize metrics:
  - **Operational** (affects calcRoiV2): labor %, dwell time, detention %
  - **Narrative** (display-only): 1M check-ins, 200K drivers, failure rate
- [ ] Confirm narrative metrics DO NOT feed into ROI formula
- [ ] Get economist sign-off
- [ ] Update `ECONOMICS_AUDIT.md` with new metrics classification

**Validation:**
```bash
# Run economics golden tests - should still pass
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# No snapshot changes expected
git diff src/lib/economics/__tests__/*.snap
# Should be empty
```

---

### S0.9: Lock Animation Dependencies
**Complexity:** S  
**Description:** Pin animation library versions to prevent mid-sprint breakage.

**Acceptance Criteria:**
- [ ] Pin `framer-motion` to exact version in package.json
- [ ] Document current version: `framer-motion@11.x.x`
- [ ] Add `package-lock.json` to git (if not already tracked)
- [ ] Test animation library separately (not during sprint)

**Validation:**
```bash
# Verify exact version pinned
cat package.json | grep framer-motion
# Should show: "framer-motion": "11.5.4" (not ^11.5.4)

# Reproducible builds
npm ci
npm run build
# Should succeed without version warnings
```

---

## Additional S1 Tasks (Insert After S1.7)

### S1.8: SEO Foundation for New Routes
**Complexity:** M  
**Description:** Add metadata, OG images, structured data for /proof, /scale, /solutions/reefer.

**Depends on:** S1.2, S1.3, S1.5  
**Blocks:** None

**Acceptance Criteria:**
- [ ] `generateMetadata()` in page.tsx for:
  - `/proof/page.tsx`
  - `/scale/page.tsx`
  - `/solutions/reefer/page.tsx`
- [ ] OG images generated via `/api/og` for new routes
- [ ] JSON-LD structured data added (Organization, Product schema)
- [ ] Meta tags validated with tools

**Validation:**
```bash
# Test OG image generation
curl http://localhost:3000/api/og?page=proof
# Should return image

# Meta tag inspector
# Visit: https://metatags.io/?url=localhost:3000/proof
# Confirm title, description, OG image show correctly
```

**Implementation:**
```typescript
// app/proof/page.tsx
export async function generateMetadata() {
  return {
    title: 'Scale Proof - YardFlow',
    description: '1M+ driver check-ins. 0.2% failure rate. Battle-tested yard protocols.',
    openGraph: {
      title: 'Scale Proof - YardFlow',
      images: [`${siteUrl}/api/og?page=proof`],
    },
  };
}
```

---

### S1.9: SEO Redirect Strategy
**Complexity:** S  
**Description:** Add 301 redirects for any renamed routes to preserve SEO and backlinks.

**Depends on:** S1.2 (if /case-studies → /proof)  
**Blocks:** None

**Acceptance Criteria:**
- [ ] Add redirects in `next.config.js`:
  - `/case-studies` → `/proof` (301 permanent)
  - Any other renamed routes
- [ ] Verify redirects return 301 status
- [ ] Monitor 404 errors post-launch in Google Search Console

**Validation:**
```bash
# Test redirect
curl -I http://localhost:3000/case-studies
# Should return: HTTP/1.1 301 Moved Permanently
# Location: /proof
```

**Implementation:**
```javascript
// next.config.js
async redirects() {
  return [
    {
      source: '/case-studies',
      destination: '/proof',
      permanent: true, // 301
    },
    {
      source: '/case-studies/:slug',
      destination: '/proof', // Or /proof/:slug if keeping slugs
      permanent: true,
    },
  ];
},
```

---

## Additional S2 Tasks (Insert After S2.4)

### S2.5: Brand Compliance Audit
**Complexity:** S  
**Description:** Ensure new components follow branding system (no hardcoded colors, consistent CTAs).

**Depends on:** S2.1, S2.2, S2.3  
**Blocks:** None

**Acceptance Criteria:**
- [ ] No hardcoded hex colors outside `lib/branding.ts`
- [ ] All CTAs use approved labels from CTA hierarchy
- [ ] Terminology matches `COPY_GUIDELINES.md`
- [ ] Grep audit passes

**Validation:**
```bash
# Scan for hardcoded colors
grep -r "#[0-9A-Fa-f]\{6\}" components/ app/
# Should only find results in comments or lib/branding.ts

# Verify CTA labels
grep -r "Book.*Audit" components/
# Should use exact label: "Book Network Audit" (not variants)

# Check terminology (no forbidden terms)
grep -ri "efficiency\|optimization" components/ app/
# Should find minimal matches (COPY_GUIDELINES forbids these)
```

---

### S2.6: Animation Performance Budget
**Complexity:** M  
**Description:** Test animations on low-end devices, ensure no jank.

**Depends on:** S2.1 (ProofStrip animation)  
**Blocks:** None

**Acceptance Criteria:**
- [ ] Test on iPhone SE (low-end device) or similar
- [ ] Measure FPS during count-up animation (should stay >= 30fps)
- [ ] Chrome DevTools Performance panel shows no dropped frames
- [ ] Reduce animation complexity if FPS drops

**Validation:**
```bash
# Chrome DevTools:
# 1. Open Performance panel
# 2. Start recording
# 3. Scroll to ProofStrip (trigger animation)
# 4. Stop recording
# 5. Check FPS graph - should stay above 30fps

# If FPS drops:
# - Reduce animation duration
# - Use will-change CSS hint
# - Throttle animation frame rate
```

**Performance Optimization:**
```css
/* Hint to browser: optimize this element */
.proof-strip-metric {
  will-change: transform, opacity;
}
```

---

## Sprint Dependencies (Add to Top of Document)

```
## Sprint Dependency Tree

**Critical Path:**
Sprint 0 → Sprint 1 → Sprint 2 → Sprint 5

**Sequential Requirements:**
- Sprint 0 MUST complete before Sprint 1 (content models needed for new pages)
- Sprint 1 MUST complete before Sprint 2 (routes must exist before content refactor)
- Sprint 5 requires Sprints 1-4 complete (tests validate all work)

**Parallel Work:**
- Sprint 3 can parallelize with Sprint 4 (no shared files)
- Sprint 0 tasks can be parallelized except:
  - S0.2b depends on S0.2a
  - S0.2c depends on S0.2b
  - S0.7 depends on S0.2c, S0.3, S0.4

**Cross-Sprint Dependencies:**
- S2.1 (ProofStrip) blocks S2.2, S2.3
- S0.4 (CO_DEV_TRACKS) blocks S1.4, S1.5, S3.1
- S1.2 (/proof page) blocks S2.2 (home hero refactor)
```

---

## Improved Validation Examples

### S0.1: Route Health Audit (Automated Script)

```javascript
// scripts/validate-routes.js
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const APP_DIR = './app';
const routes = [];

// Recursively find all page.tsx files
function findRoutes(dir, base = '') {
  const files = readdirSync(dir);
  files.forEach(file => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      findRoutes(fullPath, join(base, file));
    } else if (file === 'page.tsx' && !dir.includes('__test')) {
      const route = base.replace(/\[.*?\]/g, 'test-slug'); // Handle dynamic routes
      routes.push(`/${route}`);
    }
  });
}

findRoutes(APP_DIR);

// Start dev server and test routes
const server = spawn('npm', ['run', 'dev']);
setTimeout(async () => {
  const results = await Promise.all(
    routes.map(async route => {
      try {
        const res = await fetch(`http://localhost:3000${route}`);
        return { route, status: res.status, ok: res.status === 200 };
      } catch (err) {
        return { route, status: 'error', ok: false, error: err.message };
      }
    })
  );
  
  console.table(results);
  const failures = results.filter(r => !r.ok);
  if (failures.length > 0) {
    console.error(`${failures.length} routes failed`);
    process.exit(1);
  }
  
  server.kill();
  process.exit(0);
}, 5000); // Wait for server to start
```

---

### S2.1: ProofStrip Animation (Proper Wait Conditions)

```typescript
// e2e/animations/proof-strip.spec.ts
import { test, expect } from '@playwright/test';

test('proof strip count-up animation', async ({ page }) => {
  await page.goto('/');
  
  const strip = page.locator('[data-testid="proof-strip"]');
  const metric = strip.locator('[data-testid="metric-value"]').first();
  
  // Verify initial state (animation hasn't started yet)
  await expect(metric).toHaveText('0');
  
  // Scroll into view to trigger animation
  await strip.scrollIntoViewIfNeeded();
  
  // Wait for animation to complete (poll until target value reached)
  await expect(metric).toHaveText('1M+', { timeout: 3000 });
  
  // Verify all metrics animated
  const allMetrics = await strip.locator('[data-testid="metric-value"]').allTextContents();
  expect(allMetrics).not.toContain('0'); // All should have changed
});

test('proof strip respects reduced motion', async ({ page }) => {
  // Emulate reduced motion preference
  await page.emulateMedia({ reducedMotion: 'reduce' });
  
  await page.goto('/');
  const metric = page.locator('[data-testid="metric-value"]').first();
  
  // With reduced motion, should show final value immediately
  await expect(metric).toHaveText('1M+', { timeout: 100 }); // Very short timeout
});
```

---

### S5.3: Lighthouse (Variance Handling)

```javascript
// lighthouserc.js (IMPROVED)
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3, // Run 3 times, take median
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/proof',
        'http://localhost:3000/co-development',
      ],
      settings: {
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4, // Slow 3G
          cpuSlowdownMultiplier: 4,
        },
        // Block third-party scripts for consistent testing
        blockedUrlPatterns: ['*google-analytics.com*', '*facebook.net*'],
      },
    },
    assert: {
      assertions: {
        // Use median scores, not first run
        'categories:performance': ['median', { minScore: 0.85 }], // 85 mobile
        'categories:accessibility': ['median', { minScore: 0.95 }],
        'categories:best-practices': ['median', { minScore: 0.90 }],
        'categories:seo': ['median', { minScore: 0.90 }],
      },
    },
  },
};
```

---

### S5.4: Accessibility Audit (Specific Checklist)

```markdown
## Screen Reader Test Protocol

**Device:** macOS + VoiceOver (Cmd+F5 to toggle)

### Test Scenarios:

1. **Homepage Navigation (Tab-only)**
   - [ ] Can reach all interactive elements without mouse
   - [ ] Skip navigation link works (jumps to main content)
   - [ ] Nav menu announces correctly ("Navigation menu")
   - [ ] CTA buttons announce role + label

2. **ProofStrip Component**
   - [ ] Metrics announce value + label ("1 million, Driver Check-Ins")
   - [ ] Source type badge announced ("Measured data")
   - [ ] No "clickable" announcement (not interactive)

3. **CoDevTrackSelector (Tabs)**
   - [ ] Tabs announce role: "Tab, Flatbed" / "Tab, Reefer"
   - [ ] Selected tab announces: "Flatbed, selected"
   - [ ] Arrow keys navigate between tabs
   - [ ] Tab content announces on selection

4. **ScalePitfallsAccordion**
   - [ ] Accordion items announce: "Button, expanded" / "Button, collapsed"
   - [ ] Content region has aria-labelledby pointing to trigger
   - [ ] Enter/Space keys toggle accordion

5. **Forms**
   - [ ] Labels read correctly (not just placeholder)
   - [ ] Error messages associated with fields (aria-describedby)
   - [ ] Required fields announced
   - [ ] Success message announced (live region)

### Tools:
- **Automated:** axe DevTools, WAVE browser extension, Lighthouse
- **Manual:** VoiceOver (macOS), NVDA (Windows), keyboard-only navigation
- **Color Contrast:** WebAIM Contrast Checker (4.5:1 minimum)
```

---

## Rollback Procedure (Add to End of Document)

```markdown
## Rollback Procedure

**If critical bug found post-merge:**

1. **Immediate Revert**
   ```bash
   git revert <commit-sha>
   git push origin main
   ```
   Do NOT use `git reset --hard` (breaks team's history)

2. **Hotfix Branch**
   ```bash
   git checkout -b hotfix/sprint-X-revert main~1
   # Make fixes
   git commit -m "hotfix: Fix issue from sprint X"
   git push origin hotfix/sprint-X-revert
   # Create PR, merge after validation
   ```

3. **Document Incident**
   - Create `/docs/REFACTOR_INCIDENTS.md`
   - Log: sprint, issue, root cause, fix
   - Example:
     ```
     ## Incident: S2.1 ProofStrip Animation Jank
     **Date:** 2026-01-28
     **Sprint:** Sprint 2
     **Issue:** Count-up animation caused 10fps on iPhone SE
     **Root Cause:** Framer Motion animating too many elements simultaneously
     **Fix:** Reduced animation complexity, added will-change CSS hint
     **Prevention:** Added S2.6 performance budget task to future sprints
     ```

4. **Postmortem (30min, same day)**
   - What went wrong?
   - Why did tests miss it?
   - What test would catch it?
   - Add regression test before re-attempting

5. **Regression Test Before Re-Deploy**
   ```typescript
   // e2e/regression/proof-strip-performance.spec.ts
   test('proof strip maintains >= 30fps', async ({ page }) => {
     // Test added after S2.1 incident
     await page.goto('/');
     
     // Start performance monitoring
     await page.evaluate(() => {
       (window as any).__fpsLog = [];
       let lastTime = performance.now();
       
       function checkFPS() {
         const now = performance.now();
         const fps = 1000 / (now - lastTime);
         (window as any).__fpsLog.push(fps);
         lastTime = now;
         requestAnimationFrame(checkFPS);
       }
       requestAnimationFrame(checkFPS);
     });
     
     // Trigger animation
     await page.locator('[data-testid="proof-strip"]').scrollIntoViewIfNeeded();
     await page.waitForTimeout(2000); // Let animation complete
     
     // Check FPS log
     const fpsLog = await page.evaluate(() => (window as any).__fpsLog);
     const avgFps = fpsLog.reduce((a, b) => a + b) / fpsLog.length;
     
     expect(avgFps).toBeGreaterThanOrEqual(30);
   });
   ```
```

---

## Sprint Demo Format (Add After Sprint 6)

```markdown
## Sprint Demo Format

**Duration:** 10 minutes per sprint  
**Audience:** CEO, product lead, stakeholders  
**Location:** Staging URL (not localhost)

### Demo Structure:

1. **Show, Don't Tell (5min)**
   - Navigate live site (staging.yardflow.com)
   - Click through key flows:
     - Sprint 0: Content model working (data-driven rendering)
     - Sprint 1: All routes load, nav works
     - Sprint 2: ProofStrip animation, new home hero
     - Sprint 3: Track selector, design partner form
     - Sprint 4: Scale page, implementation stepper
     - Sprint 5: Test reports, Lighthouse scores

2. **Metrics (2min)**
   - Show before/after:
     - Test coverage: X% → Y%
     - Lighthouse scores: before vs after
     - Route health: X broken → 0 broken
   - Screenshots: old vs new

3. **Blockers/Risks (2min)**
   - Call out dependencies not met (if any)
   - Highlight risks for next sprint
   - Ask for decisions needed

4. **Next Sprint Preview (1min)**
   - What's coming in Sprint X+1
   - Dependencies needed from team

### Demo Checklist:
- [ ] Record video (async stakeholder review)
- [ ] Deploy to staging URL (not localhost)
- [ ] Prepare comparison screenshots
- [ ] Run full test suite before demo
- [ ] Have rollback plan ready (in case of critical bug)
```

---

## Cross-Browser Testing Requirements (Update S5.1)

```markdown
### S5.1: Playwright Smoke Tests (Enhanced)

**Cross-Browser Requirements:**
- All tests must pass in: Chromium, Firefox, WebKit (Safari)
- Animation tests: Verify Framer Motion works in Safari (WebKit has CSS animation edge cases)
- Form tests: Verify validation in Firefox (form behavior differs from Chrome)
- CI runs all 3 browsers (not just Chromium)

**Playwright Config:**
```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 12'] } }, // Add mobile
  ],
});
```

**CI Matrix:**
```yaml
# .github/workflows/e2e-tests.yml
jobs:
  test:
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - run: npx playwright test --project=${{ matrix.browser }}
```
```

---

## Priority of Additions

### Must-Add (Sprint 0):
1. S0.0: Analytics Baseline Snapshot
2. S0.7: Content Model Migration Layer
3. S0.8: Economics Integration Audit
4. S0.9: Lock Animation Dependencies

### Must-Add (Sprint 1):
1. S1.8: SEO Foundation for New Routes
2. S1.9: SEO Redirect Strategy

### Must-Add (Sprint 2):
1. S2.5: Brand Compliance Audit
2. S2.6: Animation Performance Budget

### Must-Integrate (Documentation):
1. Sprint Dependency Tree (top of doc)
2. Rollback Procedure (end of doc)
3. Sprint Demo Format (end of doc)
4. Improved validation examples (update existing tasks)

---

**Next Action:** Integrate these improvements into `REFACTOR_SPRINT_PLAN.md` or use as reference during sprint execution.
