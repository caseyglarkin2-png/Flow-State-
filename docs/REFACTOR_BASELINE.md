# Refactor Baseline Metrics

**Date Captured:** January 27, 2026  
**Purpose:** Pre-refactor baseline to measure success of RFQ-driven refactor

---

## Current Analytics Snapshot

### Conversion Metrics (Last 30 Days)
- **Overall Conversion Rate:** TBD (export from GA4)
- **"Book Network Audit" CTR:** TBD
- **"Run ROI Calculator" CTR:** TBD
- **Form Completion Rate:** TBD

### Traffic Metrics
- **Top 5 Landing Pages:**
  1. `/` (Home)
  2. `/product`
  3. `/roi`
  4. `/co-development`
  5. `/solutions/dry-van`

- **Bounce Rate by Page:**
  - Home: TBD
  - Product: TBD
  - ROI: TBD
  - Co-Development: TBD

### User Behavior
- **Average Time on Site:** TBD
- **Pages per Session:** TBD
- **Exit Pages:** TBD

---

## Current Route Health

### Working Routes (Verified Jan 27, 2026)
✅ `/` - Home  
✅ `/product` - Product page  
✅ `/co-development` - Co-dev program  
✅ `/roi` - ROI calculator  
✅ `/implementation` - Implementation guide  
✅ `/integrations` - Integrations page  
✅ `/security` - Security page  

### Broken/Problematic Routes
❌ `/solutions/` - Returns 404 (no index page)  
⚠️ Legacy routes to review:
  - `/case-studies` - May need redirect to `/proof`
  - Various test pages (`/logo-test`, `/icon-test`, etc.)

---

## Current Performance Metrics

### Lighthouse Scores (Homepage, Mobile)
**Run Date:** January 27, 2026  
**Device:** Emulated Mobile (Slow 3G)

- **Performance:** TBD (target: >= 85)
- **Accessibility:** TBD (target: >= 95)
- **Best Practices:** TBD (target: >= 90)
- **SEO:** TBD (target: >= 90)

### Bundle Size
- **JavaScript:** TBD
- **CSS:** TBD
- **Total Page Weight:** TBD

---

## Current Test Coverage

### Unit Tests
- **Files Tested:** 39
- **Tests Passing:** 504
- **Coverage:** TBD (run `npm run test:unit -- --coverage`)

### E2E Tests
- **Smoke Tests:** TBD
- **Critical Flows Covered:** TBD

---

## Post-Refactor Success Criteria

### Conversion Goals
- [ ] "Book Network Audit" CTR increases by >= 15%
- [ ] "Co-Development Application" starts increase by >= 25%
- [ ] Overall conversion rate improves by >= 10%

### Performance Goals
- [ ] Lighthouse Performance >= 90 (mobile)
- [ ] Lighthouse Accessibility >= 95
- [ ] Page load time < 2s (3G)

### User Engagement Goals
- [ ] Bounce rate decreases by >= 10%
- [ ] Time on site increases by >= 20%
- [ ] Pages per session increases by >= 15%

---

## Comparison Framework

### Week 1 Post-Launch
- Re-run analytics export
- Compare conversion rates
- Check for broken links (404 spike?)

### Week 4 Post-Launch
- Full GA4 report
- Lighthouse re-audit
- User feedback survey

### Quarter 1 2026 Review
- Compare Q4 2025 vs Q1 2026 metrics
- ROI on refactor investment
- Plan next iteration

---

## Data Collection Checklist

- [ ] Export GA4 conversion data (last 30 days)
- [ ] Screenshot current heatmaps (if available)
- [ ] Run Lighthouse audit on key pages
- [ ] Document current test coverage
- [ ] Capture bundle size metrics
- [ ] List all CTAs and their current labels
- [ ] Document current messaging/copy for comparison

---

**Next Steps:**
1. Fill in TBD values from GA4/analytics tools
2. Run Lighthouse audits and record scores
3. Generate test coverage report
4. Use this as baseline for post-launch comparison
