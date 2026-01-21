# Visual Regression Testing SOP

**Purpose:** Establish clear approval process for snapshot-based visual regression testing.  
**Last Updated:** January 21, 2026  
**Owner:** Gatekeeper + Visualist agents

---

## Overview

Visual regression tests capture screenshots of UI components and pages, then compare them to baseline images on every PR. This prevents unintended visual changes from reaching production.

**Tools:**
- **Playwright:** Screenshot capture + snapshot comparison
- **Git:** Baseline images committed to `e2e/__screenshots__/`
- **CI:** Automated diff detection on every PR

---

## Baseline Snapshot Approval

### Initial Baseline Creation

1. **Developer** creates visual regression test:
   ```typescript
   // e2e/visual-regression.spec.ts
   test('ROI page - adoption slider', async ({ page }) => {
     await page.goto('/roi');
     await expect(page).toHaveScreenshot('roi-adoption-slider.png');
   });
   ```

2. **First run** generates baseline:
   ```bash
   npm run test:e2e -- --update-snapshots
   ```
   - Creates `e2e/__screenshots__/roi-adoption-slider.png`
   - Baseline saved to git

3. **Visualist reviews** baseline:
   - ✅ Pixel-perfect match to design system
   - ✅ No broken layouts (mobile + desktop)
   - ✅ Correct colors, spacing, typography
   - ✅ No console errors or warnings

4. **Visualist approves** + commits baseline:
   ```bash
   git add e2e/__screenshots__/roi-adoption-slider.png
   git commit -m "Visual baseline: ROI adoption slider"
   ```

5. **No product/CEO approval required** (design already approved in Figma/design system)

---

## Regression Detection

### Automated CI Workflow

1. **Developer** opens PR with code changes
2. **CI** runs Playwright screenshot tests:
   ```bash
   npm run test:e2e
   ```
3. **Comparison:**
   - Current screenshot vs. baseline
   - Threshold: **2% pixel difference**
   - If diff > 2%: ❌ Test fails

4. **CI reports diff image** in PR comments:
   - Side-by-side comparison
   - Highlighted pixels showing differences
   - Example: `roi-adoption-slider-diff.png`

### Developer Response

**Option A: Unintended Regression (Fix Code)**
```bash
# Revert code change that caused regression
git revert <commit-hash>

# Or: Fix the code to match baseline
# Re-run tests: snapshot should match
npm run test:e2e
```

**Option B: Intentional Change (Update Baseline)**
```bash
# Design approved by Visualist; update snapshot
npm run test:e2e -- --update-snapshots

# Commit new baseline
git add e2e/__screenshots__/
git commit -m "Visual update: [reason for change]"

# PR comment: "Design approved by [Visualist]; updating baseline"
```

---

## Intentional Changes Workflow

### When to Update Baselines

✅ **Approved Scenarios:**
- Design system color update (brand refresh)
- Layout refactor (responsive improvements)
- Component redesign (Figma-approved change)
- Accessibility improvements (WCAG compliance)

❌ **Not Approved:**
- CSS regressions (broken layouts)
- Unintended color shifts
- Font loading failures
- Layout shifts (CLS issues)

### Approval Process

1. **Developer** implements design change
2. **Visualist** reviews design in Figma/Storybook
3. **Visualist approves** visual change (Slack/PR comment)
4. **Developer** updates snapshot:
   ```bash
   npm run test:e2e -- --update-snapshots
   ```
5. **Developer** documents change in PR:
   ```markdown
   ## Visual Regression Update
   - **Reason:** Brand color update (neon: #00B4FF → #00FFC2)
   - **Approved by:** [Visualist] on [Date]
   - **Files affected:** `roi-adoption-slider.png`, `home-hero.png`
   - **Validation:** Manually tested on Chrome/Safari, mobile/desktop
   ```
6. **Visualist** re-approves PR
7. **CI passes** (new baseline matches current screenshot)

---

## Regression Rollback

### Unintended Regression Detected

1. **CI fails** on PR:
   ```
   ❌ Visual regression detected: roi-adoption-slider.png (3.2% diff)
   ```

2. **Developer investigates:**
   - Download diff image from CI artifacts
   - Identify cause (CSS change, font loading, etc.)

3. **Options:**
   - **Revert code:** `git revert <commit-hash>`
   - **Fix code:** Adjust CSS to match baseline
   - **Consult Visualist:** If unclear whether change is intentional

4. **Re-run tests:**
   ```bash
   npm run test:e2e
   ```
   - Should pass (screenshot matches baseline)

5. **Commit fix:**
   ```bash
   git add <fixed-files>
   git commit -m "Fix: Revert unintended layout shift in ROI slider"
   ```

### Root Cause Analysis

After regression:
- Document in `docs/REGRESSION_LOG.md`:
  - **Date:** 2026-01-21
  - **Cause:** CSS utility class changed in Tailwind config
  - **Fix:** Restored original utility class
  - **Prevention:** Add E2E test for this specific case

---

## Configuration

### Playwright Snapshot Settings

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      threshold: 0.02, // 2% pixel difference tolerance
      maxDiffPixels: 100, // Max 100 pixels different
    },
  },
});
```

### Devices Tested

| Device | Viewport | Browser |
|--------|----------|---------|
| **Desktop** | 1280×720 | Chromium |
| **Mobile** | 375×667 (iPhone SE) | WebKit |
| **Tablet** | 768×1024 (iPad) | Optional |

### Screenshot Storage

- **Location:** `e2e/__screenshots__/`
- **Format:** PNG (lossless)
- **Git-tracked:** ✅ Yes (committed to repo)
- **Update frequency:** Every PR that touches UI

---

## Ownership & Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Visualist** | Approve baselines, review diffs, approve intentional changes |
| **Gatekeeper** | Enforce CI gate, ensure snapshots committed, block regressions |
| **Developer** | Run tests, update snapshots when approved, document changes |
| **CTO** | Final sign-off on major visual overhauls (e.g., brand refresh) |

---

## Best Practices

### ✅ Do:
- Run visual tests locally before pushing: `npm run test:e2e`
- Update snapshots only when Visualist approves
- Document reason for baseline update in PR
- Test on multiple browsers (Chrome, Safari, Firefox)
- Capture screenshots at key breakpoints (mobile, tablet, desktop)

### ❌ Don't:
- Update snapshots without approval ("just to make CI green")
- Ignore diff images without investigating cause
- Commit large snapshot files (>1MB) without compression
- Skip visual tests on "small" CSS changes (they often cause regressions)

---

## Troubleshooting

### CI Fails but Local Passes

**Cause:** Font rendering differences (CI uses headless browser)

**Fix:**
```bash
# Use --headed mode to match CI environment
npx playwright test --headed

# Or: Update CI to use system fonts
# (add font-face declarations to globals.css)
```

### Snapshot Diff Too Sensitive

**Cause:** Anti-aliasing differences across devices

**Fix:**
```typescript
// Increase threshold slightly (3-5%)
expect(page).toHaveScreenshot({ threshold: 0.05 });
```

### Large Snapshot Files

**Cause:** Full-page screenshots of long pages

**Fix:**
```typescript
// Clip to specific region
await page.screenshot({
  clip: { x: 0, y: 0, width: 1280, height: 720 },
});
```

---

## Resources

- **Playwright Docs:** https://playwright.dev/docs/test-snapshots
- **Visual Regression Guide:** https://applitools.com/blog/visual-testing/
- **CI Integration:** `.github/workflows/e2e.yml`

---

**Next Steps:**
1. ✅ Review this SOP with team
2. ✅ Update Playwright config with snapshot threshold (2%)
3. ✅ Commit initial baselines for ROI + Home pages
4. ✅ Add visual regression gate to CI (required for merge)
