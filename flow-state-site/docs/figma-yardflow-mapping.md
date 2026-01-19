# Figma Prototype → YardFlow Site Mapping

**Figma Prototype Link:** https://www.figma.com/proto/Z7h3j2giAYlXc2Ttn3vwGh/Freight-Roll?page-id=895%3A24424&node-id=895-24967&starting-point-node-id=1669%3A32052&scaling=contain&show-proto-sidebar=1

**YardFlow Site:** https://flow-state-klbt.vercel.app/

---

## Objective
Extract reusable design patterns from the FreightRoll Figma prototype and weave them into YardFlow site architecture. Focus on increasing conversion without losing CFO credibility.

---

## High-Level Patterns to Extract

### 1. Hero Slice Pattern
**What it is:** Full-bleed visual + gradient overlay + oversized headline hierarchy + strong subhead + CTA

**Where in Figma:** Look for full-screen hero sections with:
- Background image/video (often product screenshot or workflow)
- Dark overlay (neon accent color)
- 3-4 tier headline hierarchy
- Supporting subhead with problem/solution framing
- 1-2 CTAs below

**Reusable component:** `components/sections/HeroSlice.tsx`

**Props:**
- `eyebrow?: string` (small uppercase label)
- `headline: string` (main headline)
- `subhead?: string` (problem or context)
- `description?: string` (details)
- `backgroundImage?: string` (path to /public/figma/*)
- `backgroundVideo?: string` (path to video)
- `primaryCta?: { label: string; href: string }`
- `secondaryCta?: { label: string; href: string }`
- `variant?: 'dark' | 'light'` (overlay opacity)

**YardFlow destinations:** Homepage, Product page, Solutions overview, Singularity

---

### 2. Capability Slice Pattern
**What it is:** Big headline + colored accent subhead + short bullets + proof visual (phone/workflow screenshot)

**Where in Figma:** Look for modular sections with:
- Left side: headline + subhead + 3-4 short bullets
- Right side: phone mockup OR workflow diagram OR screenshot
- Accent color bar/border (often neon or themed)
- KPI or metric callout
- Usually alternates left-right across page

**Reusable component:** `components/sections/CapabilitySlice.tsx`

**Props:**
- `headline: string`
- `subhead?: string` (colored accent)
- `bullets: Array<{ icon?: ReactNode; text: string }>`
- `mediaType?: 'phone' | 'desktop' | 'workflow'`
- `mediaImage?: string` (path to /public/figma/*)
- `mediaAlt: string`
- `kpiLabel?: string` (e.g., "Dwell time")
- `kpiValue?: string` (e.g., "-12 min avg")
- `align?: 'left' | 'right'`
- `variant?: 'primary' | 'secondary'`

**YardFlow destinations:** Product module sections, Solutions archetype pages, Procurement capabilities

---

### 3. Proof Media Component
**What it is:** Product screenshot/phone UI positioned as evidence, not brand showcase

**Where in Figma:** Look for:
- Phone mockup with real app screen
- Desktop workflow screenshot
- Dashboard visualization
- Always paired with text explaining what you're seeing
- Often has annotation callouts or arrows

**Reusable component:** `components/media/ProofMedia.tsx`

**Props:**
- `type?: 'phone' | 'desktop' | 'dashboard'`
- `imagePath: string` (path to /public/figma/*)
- `alt: string`
- `caption?: string` (e.g., "Live yard visualization")
- `annotations?: Array<{ x: number; y: number; label: string }>`

**YardFlow destinations:** Product page, Solutions, Procurement evidence vault, Singularity

---

### 4. KPI Chips Component
**What it is:** Small metric indicators (outcome-focused, not feature-focused)

**Where in Figma:** Look for:
- Small rounded cards/badges
- Icon + number + label
- Usually arranged in a 3-4 column grid
- Examples: "200K+ drivers", "58 facilities", "2.4 sec avg check-in"

**Reusable component:** `components/ui/KPIChips.tsx`

**Props:**
- `chips: Array<{ icon?: ReactNode; label: string; value: string }>`
- `layout?: 'grid' | 'row'`

**YardFlow destinations:** Homepage proof stack, Solutions summary, Singularity network map

---

## Mapping Matrix

| Figma Screen/Module | Pattern | Rewrite Notes | YardFlow Route | Component | Asset(s) Needed |
|---|---|---|---|---|---|
| **Hero: "YardFlow Intro"** | Hero Slice | Extract headline, subhead, CTA; use actual YardFlow narrative | `/` | HeroSlice | TBD (hero bg) |
| **Feature: "Driver Check-in Flow"** | Capability Slice | Phone mockup showing QR→Auth→Dock | `/product` | CapabilitySlice | outbound-auto-recognition.png |
| **Feature: "Real-time Yard Visibility"** | Capability Slice | Dashboard screenshot of live YMS | `/product` | CapabilitySlice | yard-visibility-dashboard.png |
| **Feature: "Compliance Automation"** | Capability Slice | Audit trail screenshot | `/resources/procurement` | CapabilitySlice | compliance-audit-trail.png |
| **Proof: "Evidence Vault"** | Proof Media | Cryptographic trail UI | `/resources/procurement` | ProofMedia | evidence-vault-ui.png |
| **Proof: "Network Intelligence"** | Proof Media | Multi-site dashboard | `/singularity` | ProofMedia | network-intelligence-map.png |
| **Stats: "Network Scale"** | KPI Chips | Drivers, facilities, systems live | `/` | KPIChips | N/A (data-driven) |
| **Stats: "Operational Impact"** | KPI Chips | Dwell, detention, labor metrics | `/solutions` | KPIChips | N/A (data-driven) |
| **Solutions: "Dry Van Playbook"** | Hero Slice + Capability | Archetype-specific hero + 2-3 capabilities | `/solutions/dry-van` | HeroSlice + CapabilitySlice | dry-van-hero.png |
| **Solutions: "Reefer Playbook"** | Hero Slice + Capability | Reefer context hero + 2-3 capabilities | `/solutions/reefer` | HeroSlice + CapabilitySlice | reefer-hero.png |

---

## Brand Relationship Standardization

**Current state:** Multiple variations:
- "YardFlow by FreightRoll"
- "A FreightRoll product"
- "Powered by FreightRoll"
- "Built by FreightRoll"

**Decision:** Use **"YardFlow by FreightRoll"** everywhere
- Short, memorable
- Explains the relationship (product + company)
- Consistent with industry norms (e.g., "Gmail by Google")

**Locations to standardize:**
1. Header logo subtitle
2. Footer copyright
3. Metadata (`<meta property="og:site_name">`)
4. About page
5. Hero sections (where applicable)
6. Documentation headers

---

## CFO-Friendly Guardrails

### Claim Defense Checklist
Before adding any new module, verify:

- [ ] Headline claim is supported by `/docs/economics-methodology.md` or existing case study
- [ ] KPI (dwell, detention, labor, turns) is measurable and defensible
- [ ] No speculative language ("could", "may", "potentially")
- [ ] No absolute claims without evidence (avoid "always", "never", "100%")
- [ ] Alternative phrasing uses "typically", "commonly", "observed in", "average", "up to"
- [ ] Legal/compliance copy uses "audit-grade", "reduces exposure", "documentation", not "protection" or "eliminates liability"

### Example Defenses

**❌ Bad claim:** "Eliminates detention disputes"
**✅ Better:** "Reduces detention dispute exposure with forensic-grade timestamps"

**❌ Bad claim:** "50% labor reduction"
**✅ Better:** "Typical deployment sees 40-60% gate labor optimization"

**❌ Bad claim:** "Shipper liability protection"
**✅ Better:** "Audit-grade documentation reduces compliance audit exposure"

---

## Asset Export Requirements

**From Figma, export and store in `/public/figma/`:**

| Asset Name | Type | Dimensions | Usage | Priority |
|---|---|---|---|---|
| hero-yard-chaos.png | Image | 1920x1080 | Homepage hero bg | HIGH |
| outbound-auto-recognition.png | Image | 1440x960 | Product → Digital Guard section | HIGH |
| yard-visibility-dashboard.png | Image | 1440x960 | Product → Digital YMS section | HIGH |
| compliance-audit-trail.png | Image | 1440x960 | Procurement → Evidence section | HIGH |
| evidence-vault-ui.png | Image | 1080x1440 | Proof Media (phone mockup) | MEDIUM |
| network-intelligence-map.png | Image | 1920x1080 | Singularity page | MEDIUM |
| dry-van-hero.png | Image | 1920x1080 | Solutions → Dry Van page | MEDIUM |
| reefer-hero.png | Image | 1920x1080 | Solutions → Reefer page | MEDIUM |

**Image optimization:**
- Use next/Image for all exports
- Enable lazy loading
- Optimize JPEGs to 70-75% quality
- Use WebP where browser support sufficient
- Add `alt` text (descriptive, not just "screenshot")

---

## Implementation Phases

### Phase 1: Core Components (This PR)
- [ ] `components/sections/HeroSlice.tsx`
- [ ] `components/sections/CapabilitySlice.tsx`
- [ ] `components/media/ProofMedia.tsx`
- [ ] `components/ui/KPIChips.tsx`
- [ ] Storybook or component preview (optional)

### Phase 2: Homepage Integration (This PR)
- [ ] Add HeroSlice to homepage hero
- [ ] Add 2x CapabilitySlice (e.g., Digital Guard, Digital YMS)
- [ ] Add KPIChips (network scale proof)
- [ ] Test conversions

### Phase 3: Product Page (Follow-up PR)
- [ ] Replace existing module sections with CapabilitySlice
- [ ] Add ProofMedia to each capability
- [ ] Sync with new CTA hierarchy (Book a Network Audit)

### Phase 4: Solutions (Follow-up PR)
- [ ] Add HeroSlice to each archetype page
- [ ] Add 2-3 CapabilitySlice per archetype
- [ ] Add KPIChips with archetype-specific outcomes

### Phase 5: Procurement/Singularity (Follow-up PR)
- [ ] Add CapabilitySlice + ProofMedia to procurement
- [ ] Add ProofMedia to singularity (network intelligence)

---

## Notes & Constraints

1. **Design System Fidelity:** Keep Tailwind classes consistent with existing `/flow-state-site/lib/tokens.ts` (colors, spacing, motion)
2. **Accessibility:** All components must include:
   - Semantic HTML (`<section>`, `<article>`, `<figure>`)
   - ARIA labels for interactive elements
   - Alt text for images
   - Heading hierarchy (`h1` → `h2` → `h3`)
3. **Performance:**
   - Use `next/image` for all Figma exports
   - Lazy load below-the-fold sections
   - Test Lighthouse scores (aim for 90+)
4. **CFO Credibility:**
   - Every new claim must trace back to economics methodology or existing data
   - Use conservative estimates ("typically", "average", "observed")
   - Include footnotes/citations where appropriate

---

## Next Steps

1. Export webm loops from Figma for DemoStepper:
   - Kiosk QR scan (Step 1)
   - SMS notification confirmation (Step 2)
   - Real-time yard enforcement alert (Step 3)
   - BOL cryptographic signature (Step 4)
2. Store in `/public/demo/` as `qr-scan.webm`, `sms-confirm.webm`, `enforcement.webm`, `bol-sign.webm`
3. Update ProofMedia component to accept video type
4. Wire into DemoStepper for autoplay on step enter
5. Add lazy loading + poster image for each video
6. Test performance on product page


