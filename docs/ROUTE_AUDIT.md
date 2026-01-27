# Route Audit

**Generated:** January 27, 2026  
**Total Routes:** 49 pages  
**Status:** Audit complete, ready for execution

---

## Classification Summary

| Action | Count | Routes |
|--------|-------|--------|
| **Keep** | 34 | Core funnel + supporting pages |
| **Merge** | 6 | Duplicative content to consolidate |
| **Delete** | 9 | Test/preview pages |

---

## KEEP (Core Funnel)

These routes form the primary conversion funnel and support pages.

### Primary Funnel
| Route | Purpose | Priority |
|-------|---------|----------|
| `/` | Homepage - 7-step conversion ladder | 🔥 Critical |
| `/roi` | ROI calculator - lead qualification | 🔥 Critical |
| `/singularity` | Variance Tax visualization | 🔥 Critical |
| `/contact` | Lead capture form | 🔥 Critical |
| `/product` | Product overview | High |
| `/proof` | Customer evidence, case studies | High |
| `/diagnostic` | Self-assessment tool | High |
| `/yardbuilder` | Interactive demo | High |

### Solutions (Vertical-Specific)
| Route | Purpose |
|-------|---------|
| `/solutions` | Solutions index |
| `/solutions/[slug]` | Dynamic solution pages (retail, 3pl, manufacturing, etc.) |

### Resources
| Route | Purpose |
|-------|---------|
| `/resources` | Resources index |
| `/resources/field-notes` | Blog/insights index |
| `/resources/field-notes/[slug]` | Individual articles |
| `/resources/guides` | Guides index |
| `/resources/guides/[slug]` | Individual guides |
| `/resources/procurement` | Procurement resources |

### Company
| Route | Purpose |
|-------|---------|
| `/about` | Company info |
| `/co-development` | Co-dev program |
| `/press` | Press/media |
| `/pricing` | Pricing info |
| `/faq` | FAQs |

### Product Features
| Route | Purpose |
|-------|---------|
| `/security` | Security features |
| `/integrations` | Integration partners |
| `/implementation` | Implementation process |
| `/network-effect` | Network effect explanation |
| `/scale` | Scaling capabilities |
| `/risk` | Risk reduction |

### Comparison
| Route | Purpose |
|-------|---------|
| `/compare` | Comparison index |
| `/compare/legacy-yms` | vs Legacy YMS |
| `/compare/spreadsheets` | vs Spreadsheets |

### Support
| Route | Purpose |
|-------|---------|
| `/demo` | Demo overview |
| `/demo/network-map` | Interactive network map |
| `/qualify` | Lead qualification |
| `/docs/economics-methodology` | Economics methodology |
| `/changelog` | Product changelog |
| `/status` | System status |

### Legal
| Route | Purpose |
|-------|---------|
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## MERGE (Consolidate Content)

These routes have duplicative content that should be consolidated.

| Source Route | Merge Into | Rationale | Redirect |
|--------------|------------|-----------|----------|
| `/case-studies` | `/proof` | Case studies ARE proof | 308 permanent |
| `/case-studies/[slug]` | `/proof` | Individual cases in proof page | 308 permanent |
| `/simulations` | `/singularity` | Both are variance visualization | 308 permanent |
| `/resources/simulations` | `/singularity` | Duplicate of /simulations | 308 permanent |
| `/start-your-map` | `/yardbuilder` | Same functionality, different name | 308 permanent |

### Migration Steps

1. **Case Studies → Proof:**
   - Review `/case-studies/` content
   - Ensure `/proof` page contains equivalent content
   - Add redirect in `next.config.js`
   - Update internal links

2. **Simulations → Singularity:**
   - Both pages show variance visualization
   - Singularity is the canonical page
   - Add redirect

3. **Start Your Map → YardBuilder:**
   - Same interactive map functionality
   - YardBuilder is the product name
   - Add redirect

---

## DELETE (Test/Preview Pages)

These routes are development-only and should not be in production.

| Route | Reason |
|-------|--------|
| `/__test-error__` | Error testing page |
| `/icon-test` | Icon preview development |
| `/logo-test` | Logo preview development |
| `/logo-preview` | Logo preview development |
| `/og-preview` | OG image preview development |
| `/test-canvas` | Canvas testing development |

### Deletion Steps

1. Delete directory: `rm -rf app/__test-error__`
2. Delete directory: `rm -rf app/icon-test`
3. Delete directory: `rm -rf app/logo-test`
4. Delete directory: `rm -rf app/logo-preview`
5. Delete directory: `rm -rf app/og-preview`
6. Delete directory: `rm -rf app/test-canvas`
7. Run `npm run build` to verify no broken imports
8. Update sitemap if these were included

---

## Redirect Configuration

Add to `next.config.js`:

```javascript
async redirects() {
  return [
    {
      source: '/case-studies',
      destination: '/proof',
      permanent: true,
    },
    {
      source: '/case-studies/:slug',
      destination: '/proof',
      permanent: true,
    },
    {
      source: '/simulations',
      destination: '/singularity',
      permanent: true,
    },
    {
      source: '/resources/simulations',
      destination: '/singularity',
      permanent: true,
    },
    {
      source: '/start-your-map',
      destination: '/yardbuilder',
      permanent: true,
    },
  ];
}
```

---

## Post-Cleanup Route Count

| Category | Before | After |
|----------|--------|-------|
| Keep | 34 | 34 |
| Merge | 6 | 0 (redirects) |
| Delete | 9 | 0 |
| **Total** | **49** | **34** |

---

## Validation Checklist

After cleanup:
- [ ] `npm run build` succeeds
- [ ] `npm run test:smoke` passes
- [ ] Sitemap contains only valid routes
- [ ] No internal 404s (crawl test)
- [ ] Redirects return 308 status
- [ ] Analytics events fire on redirected routes

---

## Sign-off

- [ ] Product Lead approval for route consolidation
- [ ] SEO review of redirect strategy
- [ ] Engineering implementation complete
