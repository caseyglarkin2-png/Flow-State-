# Bundle Size Baseline

> **Captured:** January 22, 2026  
> **Commit:** `fdc7f1f`  
> **Build Tool:** Next.js 16.1.0 (Turbopack)

---

## Summary

| Category | Size | Budget | Status |
|----------|------|--------|--------|
| Total Static | 3.6 MB | — | Baseline |
| Main Bundle | Within budget | 150 KB | ✅ |
| SVGs | Within budget | 30 KB | ✅ |
| CSS | Within budget | 50 KB | ✅ |

---

## Top 10 Chunks by Size

| File | Size |
|------|------|
| `bb1e2473cb391a37.js` | 948 KB |
| `66ac9425c4f45ec9.js` | 336 KB |
| `b70464c174994043.js` | 220 KB |
| `e5ec6af95b722638.js` | 168 KB |
| `9de8dd7e2360a5e1.js` | 120 KB |
| `a6dad97d9634a72d.js` | 112 KB |
| `3a8ed20fae56f9bd.js` | 112 KB |
| `7e9e90024c605358.js` | 84 KB |
| `ebd5644d58044be6.js` | 68 KB |
| `72b22a997dd60b2d.js` | 64 KB |

---

## Budgets

Defined in `scripts/bundle-audit.js`:

```javascript
const budgets = {
  mainBundle: 150 * 1024,  // 150 KB
  svgs: 30 * 1024,         // 30 KB
  css: 50 * 1024,          // 50 KB
};
```

---

## How to Update This Baseline

After significant changes, re-run and update:

```bash
npm run audit:bundle
# Then update this file with new sizes and commit hash
```

---

## Regression Detection

If `npm run audit:bundle` fails:

1. Check which category exceeded budget
2. Review recent changes for bundle size impact
3. Consider:
   - Dynamic imports for large components
   - Tree-shaking unused exports
   - Moving heavy deps to CDN
   - Image optimization

---

## Version History

| Date | Commit | Total Static | Notes |
|------|--------|--------------|-------|
| 2026-01-22 | fdc7f1f | 3.6 MB | Initial baseline |
