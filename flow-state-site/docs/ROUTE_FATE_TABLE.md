# Route Fate Table — IA Simplification

**Created:** 2026-01-27  
**Purpose:** Map all existing routes to their fate in the 5-page IA

## Target IA (5 top-level routes)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — story spine |
| `/product` | Modules installed at a facility |
| `/solutions` | Archetype tabs (single page) |
| `/roi` | ROI experience with Singularity |
| `/procurement` | Evidence vault, security/compliance |
| `/contact` | Lead capture (keep as utility) |

---

## Route Fate Map

### ✅ KEEP (Primary IA)

| Current Route | Action | Notes |
|---------------|--------|-------|
| `/` | Keep | Rebuild homepage |
| `/product` | Keep | Refactor to 4-module layout |
| `/solutions` | Keep | Convert to tab hub |
| `/roi` | Keep | Deep model + Singularity |
| `/contact` | Keep | Lead capture form |
| `/privacy` | Keep | Legal requirement |
| `/terms` | Keep | Legal requirement |

### 🔄 REDIRECT (SEO preservation)

| Current Route | Redirect To | Type | Reason |
|---------------|-------------|------|--------|
| `/solutions/dry-van` | `/solutions?tab=dry-van` | 301 | Tab consolidation |
| `/solutions/intermodal` | `/solutions?tab=intermodal` | 301 | Tab consolidation |
| `/solutions/flatbed` | `/solutions?tab=flatbed` | 301 | Tab consolidation |
| `/solutions/tanker` | `/solutions?tab=tanker` | 301 | Tab consolidation |
| `/solutions/ltl` | `/solutions?tab=ltl` | 301 | Tab consolidation |
| `/qualify` | `/contact?intent=qualify` | 301 | CTA consolidation |
| `/demo` | `/contact?intent=demo` | 301 | CTA consolidation |
| `/co-development` | `/contact?intent=partnership` | 301 | Program sunset |
| `/pricing` | `/roi` | 301 | ROI is the pricing page |
| `/diagnostic` | `/roi` | 301 | Calculator consolidation |
| `/yardbuilder` | `/roi` | 301 | Tool consolidation |
| `/singularity` | `/roi` | 301 | Singularity is ROI header now |
| `/network-effect` | `/roi` | 301 | Concept in ROI |
| `/scale` | `/product` | 301 | Concept in product |
| `/proof` | `/procurement` | 301 | Evidence vault |
| `/resources` | `/procurement` | 301 | Asset consolidation |
| `/resources/procurement` | `/procurement` | 301 | Direct move |
| `/risk` | `/procurement` | 301 | Risk docs in evidence |
| `/security` | `/procurement` | 301 | Security docs in evidence |
| `/integrations` | `/product` | 301 | Product capability |
| `/implementation` | `/product` | 301 | Product capability |
| `/about` | `/` | 301 | About content in footer/homepage |
| `/faq` | `/contact` | 301 | FAQ → contact |
| `/press` | `/procurement` | 301 | Press assets in evidence |
| `/status` | External | 301 | Status page (if exists) or delete |
| `/compare` | `/product` | 301 | Comparison in product |
| `/changelog` | `/archive/changelog` | 301 | Archive |

### 📦 ARCHIVE (Noindex, accessible via direct URL)

| Current Route | Archive To | Reason |
|---------------|------------|--------|
| `/docs/*` | `/archive/docs/*` | Technical docs, not buyer-facing |
| `/changelog` | `/archive/changelog` | Historical reference |

### ❌ DELETE (Remove entirely)

| Current Route | Reason |
|---------------|--------|
| `/page-cards.tsx` | Backup file |
| `/page-immersive.tsx` | Backup file |
| `/page-longform-backup.tsx` | Backup file |
| `/page-old-backup.tsx` | Backup file |
| `/page-original-backup.tsx` | Backup file |

---

## API Routes (KEEP)

| Route | Purpose |
|-------|---------|
| `/api/leads` | Lead form submission |
| `/api/roi-pdf` | ROI PDF generation |
| `/api/procurement` | Procurement packet request |

---

## Implementation Checklist

- [ ] Add redirects to `next.config.js`
- [ ] Create `/archive` catch-all route with noindex
- [ ] Update `robots.ts` to noindex `/archive/*`
- [ ] Delete backup page files
- [ ] Update Header nav to 5 items
- [ ] Update Footer links
- [ ] Update `sitemap.ts` to exclude archived routes
- [ ] Run Playwright tests to verify no 404s

---

## Validation

After implementation:
```bash
# Check all redirects work
npm run test:e2e

# Check sitemap doesn't include archived routes
curl http://localhost:3000/sitemap.xml | grep -c "archive"  # Should be 0

# Check robots.txt
curl http://localhost:3000/robots.txt | grep "archive"
```
