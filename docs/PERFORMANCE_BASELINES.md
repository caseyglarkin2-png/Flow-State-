# Performance Baselines & Budgets

**Last Updated:** January 21, 2026  
**Purpose:** Track performance metrics; prevent regressions; ensure fast, accessible experience.

## Performance Budgets

| Metric | Target | Critical | Notes |
|--------|--------|----------|-------|
| **Lighthouse Performance** | >75 | >50 | Overall score |
| **Lighthouse Accessibility** | >95 | >90 | WCAG 2.1 AA compliance |
| **LCP (Largest Contentful Paint)** | <2.5s | <4.0s | Core Web Vital |
| **FID (First Input Delay)** | <100ms | <300ms | Core Web Vital |
| **CLS (Cumulative Layout Shift)** | <0.1 | <0.25 | Core Web Vital |
| **JS Bundle Size (gzipped)** | <200KB | <300KB | Initial load |
| **FPS (Desktop)** | >55 | >30 | Sustained frame rate |
| **FPS (Mobile)** | >30 | >24 | Sustained frame rate |

**Budget Enforcement:**
- ✅ **Pass:** All metrics meet target thresholds
- ⚠️ **Warning:** Between target and critical (document justification)
- ❌ **Fail:** Below critical threshold (requires immediate action)

---

## Current Baselines (January 21, 2026)

### Home Page (`/`)

| Metric | Value | Status | Notes |
|--------|-------|--------|-------|
| Lighthouse Performance | TBD | ⏳ | Run `npm run perf:audit` |
| Lighthouse Accessibility | TBD | ⏳ | |
| LCP | TBD | ⏳ | |
| FID | TBD | ⏳ | |
| CLS | TBD | ⏳ | |
| JS Bundle (gzipped) | TBD | ⏳ | |

### ROI Page (`/roi`)

| Metric | Value | Status | Notes |
|--------|-------|--------|-------|
| Lighthouse Performance | TBD | ⏳ | Run `npm run perf:audit /roi` |
| Lighthouse Accessibility | TBD | ⏳ | |
| LCP | TBD | ⏳ | |
| CLS | TBD | ⏳ | |
| JS Bundle (gzipped) | TBD | ⏳ | |

### Diagnostic Page (`/diagnostic`)

| Metric | Value | Status | Notes |
|--------|-------|--------|-------|
| Lighthouse Performance | TBD | ⏳ | Run `npm run perf:audit /diagnostic` |
| Lighthouse Accessibility | TBD | ⏳ | |
| LCP | TBD | ⏳ | |
| CLS | TBD | ⏳ | |

---

## Audit Instructions

### Manual Audit (Local)

```bash
# Build production bundle
npm run build

# Run Lighthouse audit (requires Chrome)
npm run perf:audit

# Audit specific page
npm run perf:audit /roi
npm run perf:audit /diagnostic
```

### CI Integration (Optional)

```bash
# Run Lighthouse CI (GitHub Actions)
# See .github/workflows/perf.yml for automation
```

---

## Performance Optimization Strategies

### Bundle Size Reduction
- **Code splitting:** Lazy load non-critical routes
- **Tree shaking:** Remove unused exports
- **Dynamic imports:** Load heavy components on-demand
- **Image optimization:** WebP format, lazy loading, responsive sizes

### Core Web Vitals Optimization
- **LCP:** Optimize largest image, preload critical assets, reduce server response time
- **FID:** Minimize JS execution time, use web workers for heavy computation
- **CLS:** Reserve space for images/embeds, avoid layout shifts

### Animation Performance
- **GPU acceleration:** Use `transform` and `opacity` for animations
- **Reduced motion:** Respect `prefers-reduced-motion` (see `useReducedMotion` hook)
- **Frame rate:** Target 60 FPS on desktop, 30+ FPS on mobile

---

## Regression Detection

### When to Re-Audit
- ✅ After adding new dependencies (npm install)
- ✅ After modifying animations or transitions
- ✅ After changing bundle structure (code splitting, lazy loading)
- ✅ Before major releases
- ✅ Monthly (scheduled audits)

### Regression Workflow
1. Run `npm run perf:audit`
2. Compare results to baselines (this document)
3. If regression detected:
   - **Minor (<10% degradation):** Document justification + mitigation plan
   - **Major (>10% degradation):** Investigate + fix before merge
4. Update baselines if intentional change (e.g., new feature requires more JS)

---

## Tools & Resources

- **Lighthouse CLI:** `npm install -g lighthouse`
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci
- **Web Vitals Extension:** https://chrome.google.com/webstore/detail/web-vitals
- **Bundle Analyzer:** `npm run build -- --analyze` (if configured)
- **Chrome DevTools:** Performance tab, Network tab, Coverage tab

---

## Ownership

- **Gatekeeper Agent:** CI enforcement, baseline updates
- **Architect Agent:** Code optimizations, bundle size management
- **Visualist Agent:** Animation performance, visual regressions
- **CTO:** Final approval for intentional performance trade-offs

---

**Next Steps:**
1. Run baseline audit: `npm run perf:audit`
2. Fill in "Current Baselines" table above
3. Commit updated baselines to git
4. Set up CI gate (optional; manual for now)
