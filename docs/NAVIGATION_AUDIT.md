# Navigation & Link Audit

**Purpose:** Ensure all links work; no dead links or orphaned pages.  
**Last Updated:** January 21, 2026  
**Owner:** Gatekeeper + QA

---

## Link Walk Test (Playwright)

### Test Implementation

Create `e2e/link-walk.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

/**
 * Link Walk Test
 * 
 * Crawls all internal links from key pages.
 * Verifies:
 * - Internal links return 200 (page loads)
 * - External links return 200/3xx (valid)
 * - No 404/500 errors
 */

const KEY_PAGES = [
  '/',
  '/roi',
  '/diagnostic',
  '/product',
  '/solutions',
  '/about',
  '/contact',
  '/pricing',
  '/security',
  '/yardbuilder',
];

test.describe('Link Walk Audit', () => {
  for (const page of KEY_PAGES) {
    test(`All links on ${page} should work`, async ({ page: pw }) => {
      await pw.goto(page);
      
      // Get all links on page
      const links = await pw.locator('a[href]').all();
      const results: { href: string; text: string; status: 'ok' | 'broken' }[] = [];
      
      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (!href) continue;
        
        // Skip anchor links (#sections)
        if (href.startsWith('#')) {
          results.push({ href, text: text || '', status: 'ok' });
          continue;
        }
        
        // Check internal links (relative paths)
        if (href.startsWith('/')) {
          const response = await pw.request.get(href);
          const status = response.status() === 200 ? 'ok' : 'broken';
          results.push({ href, text: text || '', status });
          
          // Assert: internal links must return 200
          expect(status).toBe('ok');
        }
        
        // Check external links (http/https)
        if (href.startsWith('http')) {
          try {
            const response = await pw.request.get(href);
            const status = response.ok() ? 'ok' : 'broken';
            results.push({ href, text: text || '', status });
            
            // Warning: external links should return 200/3xx (not blocking)
            if (!response.ok()) {
              console.warn(`⚠️  External link may be broken: ${href} (${response.status()})`);
            }
          } catch (error) {
            console.warn(`⚠️  External link failed: ${href}`, error);
            results.push({ href, text: text || '', status: 'broken' });
          }
        }
      }
      
      // Log results for debugging
      console.table(results);
    });
  }
});
```

---

## Manual Audit Checklist

### Header Navigation Links

- [ ] **Logo** → `/` (Home)
- [ ] **Product** → `/product`
- [ ] **Solutions** → `/solutions`
- [ ] **ROI Calculator** → `/roi`
- [ ] **Diagnostic** → `/diagnostic`
- [ ] **Company** → `/about`
- [ ] **Contact** → `/contact`
- [ ] **Pricing** → `/pricing` (if applicable)
- [ ] **Resources** → `/resources` or dropdown

**Validation:**
- All links clickable
- All links lead to correct page
- No 404 errors
- No orphaned dropdowns

---

### Footer Links

#### Product Links
- [ ] **YardFlow Overview** → `/product`
- [ ] **Yard Orchestration** → `/product#orchestration`
- [ ] **Yard Security** → `/product#security`
- [ ] **YardBuilder AI** → `/yardbuilder`

#### Solutions Links
- [ ] **Dry Van** → `/solutions/dry-van`
- [ ] **Retail** → `/solutions/retail`
- [ ] **3PL** → `/solutions/3pl`
- [ ] **Port Terminals** → `/solutions/port`
- [ ] **LTL Networks** → `/solutions/ltl`

#### Resources Links
- [ ] **ROI Calculator** → `/roi`
- [ ] **Diagnostic** → `/diagnostic`
- [ ] **Case Studies** → `/case-studies`
- [ ] **Documentation** → `/docs`
- [ ] **Guides** → `/resources/guides`

#### Company Links
- [ ] **About FreightRoll** → `/about`
- [ ] **Co-Development Program** → `/co-development`
- [ ] **Careers** → `/careers` or external link
- [ ] **Contact** → `/contact`
- [ ] **Privacy Policy** → `/privacy`
- [ ] **Terms of Service** → `/terms`

---

### Social Media Links

- [ ] **LinkedIn** → Valid LinkedIn profile
- [ ] **Twitter** → Valid Twitter profile (if applicable)
- [ ] **GitHub** → Valid GitHub org (if applicable)

**Validation:**
- Links open in new tab (`target="_blank"`)
- Links have `rel="noopener noreferrer"` for security
- Links lead to correct social profiles

---

## Navigation Structure Audit

### Information Architecture

```
Home (/)
├── Product (/product)
│   ├── Yard Orchestration
│   ├── Yard Security
│   └── YardBuilder AI (/yardbuilder)
├── Solutions (/solutions)
│   ├── Dry Van (/solutions/dry-van)
│   ├── Retail (/solutions/retail)
│   ├── 3PL (/solutions/3pl)
│   ├── Port Terminals (/solutions/port)
│   └── LTL Networks (/solutions/ltl)
├── ROI Calculator (/roi)
├── Diagnostic (/diagnostic)
├── Company
│   ├── About (/about)
│   ├── Co-Development (/co-development)
│   ├── Careers (/careers)
│   └── Contact (/contact)
├── Resources
│   ├── Case Studies (/case-studies)
│   ├── Guides (/resources/guides)
│   └── Documentation (/docs)
├── Pricing (/pricing)
└── Security (/security)
```

**Validation:**
- [ ] All routes in IA exist (no 404s)
- [ ] No orphaned pages (pages not linked from nav)
- [ ] Breadcrumbs match IA structure
- [ ] Mobile nav collapsible (hamburger menu)

---

## Broken Link Report (January 21, 2026)

### Internal Links

| Page | Link Text | Href | Status | Notes |
|------|-----------|------|--------|-------|
| TBD | TBD | TBD | ⏳ Pending | Run link walk test |

**Note:** No broken links detected yet; run Playwright test to populate this table.

---

### External Links

| Page | Link Text | Href | Status | Notes |
|------|-----------|------|--------|-------|
| TBD | TBD | TBD | ⏳ Pending | Run link walk test |

---

## Dead Link Prevention

### Best Practices

1. **Use relative paths** for internal links:
   ```typescript
   // ✅ Good
   <a href="/roi">ROI Calculator</a>
   
   // ❌ Bad (hardcoded domain)
   <a href="https://yardflow.com/roi">ROI Calculator</a>
   ```

2. **Validate external links** before commit:
   ```bash
   curl -I https://linkedin.com/company/freightroll
   ```

3. **Add CI gate** to run link walk test:
   ```yaml
   # .github/workflows/ci.yml
   - name: Link Walk Test
     run: npm run test:e2e -- e2e/link-walk.spec.ts
   ```

4. **Quarterly link audit** (manual review):
   - Check for link rot (external sites moved/deleted)
   - Update outdated URLs
   - Remove deprecated pages

---

## Orphaned Pages (Pages Not in Nav)

### Intentionally Orphaned (OK)
- [ ] `/404` (error page)
- [ ] `/api/*` (API routes)
- [ ] `/admin` (internal tools, if applicable)

### Unintentionally Orphaned (Fix Needed)
| Page | Reason | Fix |
|------|--------|-----|
| TBD | TBD | Add to nav or footer |

**Note:** Run grep/find to identify all routes, cross-reference with nav links.

---

## Accessibility (Link Best Practices)

### Descriptive Link Text

**✅ Good:**
```typescript
<a href="/roi">Calculate Your ROI</a>
```

**❌ Bad:**
```typescript
<a href="/roi">Click Here</a> // Non-descriptive
```

### External Link Indicators

```typescript
<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
  LinkedIn
  <ExternalLinkIcon aria-label="Opens in new tab" />
</a>
```

### Skip to Content Link

```typescript
// At top of layout
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## Ownership

- **Gatekeeper Agent:** Run link walk test, enforce CI gate
- **Architect Agent:** Fix broken links, update navigation structure
- **QA:** Manual link audit, quarterly review

---

**Next Steps:**
1. ⏳ Create `e2e/link-walk.spec.ts` (Playwright test)
2. ⏳ Run link walk test on all key pages
3. ⏳ Populate broken link report (this document)
4. ⏳ Fix any broken links found
5. ⏳ Add CI gate to prevent future broken links
6. ⏳ Document IA structure (update sitemap if needed)
