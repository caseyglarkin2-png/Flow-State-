# Brand Relationship Standardization Guide

## Decision: "YardFlow by FreightRoll"

**Chosen standard:** `YardFlow by FreightRoll`

**Why this phrasing:**
- Short, memorable, and industry-standard (e.g., "Gmail by Google", "Docs by Google")
- Clearly explains the relationship: product (YardFlow) + parent company (FreightRoll)
- Professional tone, no marketing fluff
- Works across all contexts: header, footer, metadata, documentation

---

## Standardization Checklist

Apply "YardFlow by FreightRoll" to these locations:

### 1. Header/Navigation
- [ ] Logo subtitle: "by FreightRoll"
- [ ] Location: `/components/Header.tsx`, line ~50

### 2. Footer
- [ ] Copyright line: "© 2026 FreightRoll, Inc. YardFlow by FreightRoll."
- [ ] Location: `/components/Footer.tsx`

### 3. Metadata (HTML Head)
- [ ] `<meta name="og:site_name" content="YardFlow by FreightRoll">`
- [ ] `<title>YardFlow by FreightRoll - Yard Orchestration System</title>`
- [ ] Location: `/flow-state-site/app/layout.tsx` and individual page metadata

### 4. About Page
- [ ] Mission statement: "YardFlow by FreightRoll is yard orchestration software..."
- [ ] Location: `/app/about/page.tsx`

### 5. Documentation Headers
- [ ] All README files: "# YardFlow by FreightRoll"
- [ ] Locations: `/README.md`, `/docs/`, `/flow-state-site/docs/`

### 6. Public Assets
- [ ] Favicon alt text, OG image attribution
- [ ] Location: `/public/`

### 7. Email Templates / Lead Forms
- [ ] Welcome email: "Welcome to YardFlow by FreightRoll"
- [ ] Form headers: "Apply to YardFlow by FreightRoll"
- [ ] Location: `/app/api/email/`, `/components/LeadForm.tsx`

---

## Variants to Retire

The following phrases should NO LONGER be used anywhere:
- ❌ "Powered by FreightRoll"
- ❌ "A FreightRoll product"
- ❌ "Built by FreightRoll" (OK in footer attribution, but not primary branding)
- ❌ "FreightRoll's YardFlow" (awkward possession)

---

## Exemptions / Context-Specific

### Legal/Compliance
- Company name: "FreightRoll, Inc." (full legal name in ToS, Privacy Policy, etc.)
- Contact: "FreightRoll Team" or "YardFlow Support"

### Press / Announcements
- Press release header: "FreightRoll Launches YardFlow" (event announcement)
- Byline in press: "by FreightRoll" (source attribution)

### Social Media / Public Comms
- Twitter handle: "@FreightRoll" (parent company, OK)
- Product branding: "YardFlow by FreightRoll" (consistent)

---

## Search & Replace Locations

Use these commands to find all instances and update:

```bash
# Find all instances of old phrases
grep -r "Powered by FreightRoll" /flow-state-site/
grep -r "A FreightRoll product" /flow-state-site/
grep -r "Built by FreightRoll" /flow-state-site/ # review context first

# Find all instances of "YardFlow" without "by FreightRoll" following (requires manual review)
grep -r "YardFlow" /flow-state-site/ | grep -v "by FreightRoll"
```

---

## Priority Locations (High Visibility)

**Update first (these are most visible to users):**
1. Header logo subtitle
2. Homepage hero
3. Footer
4. Homepage metadata (og:site_name)
5. Product page hero

**Update second (medium visibility):**
6. All page titles
7. About page
8. Solutions overview
9. Procurement page
10. Lead form confirmations

**Update third (lower visibility but important for consistency):**
11. Email templates
12. Documentation
13. Changelog
14. Status page
15. Backup/archived pages

---

## Testing Checklist

After standardization, verify:
- [ ] Search "YardFlow by FreightRoll" returns 40+ results (indicating widespread adoption)
- [ ] Search "Powered by FreightRoll" returns 0 results
- [ ] Search "A FreightRoll product" returns 0 results
- [ ] Header displays correctly on mobile (no text overflow)
- [ ] Footer copyright line displays correctly
- [ ] og:site_name shows in Slack/Twitter preview when sharing links
- [ ] All page titles follow pattern: "[Page Name] | YardFlow by FreightRoll"

---

## Notes

- This standardization strengthens brand clarity and reduces confusion
- "By FreightRoll" reinforces that this is a professional, vetted product (not a side project)
- Consistent terminology improves SEO (search engines treat "YardFlow by FreightRoll" as the canonical brand)
- Consider reserving "FreightRoll" alone for parent company announcements or legal contexts

