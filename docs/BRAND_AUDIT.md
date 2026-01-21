# Brand Name & Terminology Audit

**Purpose:** Track brand consistency across site; identify hardcoded strings.  
**Last Updated:** January 21, 2026  
**Owner:** Architect + Product Lead

---

## Brand Standards

### Company & Product Names

| Term | Correct | Incorrect | Notes |
|------|---------|-----------|-------|
| **Company** | `FreightRoll` | ~~Freight Roll~~, ~~freight roll~~, ~~freightroll~~ | No space, capitalize F and R |
| **Product** | `YardFlow` | ~~Yard Flow~~, ~~yardflow~~, ~~yard flow~~ | No space, capitalize Y and F |
| **Full** | `YardFlow by FreightRoll` | ~~YardFlow By FreightRoll~~, ~~YardFlow from FreightRoll~~ | Use "by" (lowercase) |
| **Acronym** | `YNS` | ~~yns~~, ~~Y.N.S.~~ | All caps, no periods |
| **Full Acronym** | `Yard Network System` | ~~yard network system~~ | Capitalize each word |

### Terminology

| Concept | Preferred | Avoid | Context |
|---------|-----------|-------|---------|
| **Location** | `yard`, `facility` | ~~site~~, ~~location~~, ~~warehouse~~ | Lowercase unless start of sentence |
| **Protocol** | `standardized protocol` | ~~standard protocol~~, ~~process~~ | Emphasize "standardized" |
| **Network Effect** | `network compounding` | ~~network effect~~, ~~compounding effect~~ | Brand-specific term |
| **Problem** | `variance` | ~~chaos~~, ~~inefficiency~~ | Technical, measurable |
| **Solution** | `standardized flow` | ~~efficiency~~, ~~optimization~~ | Action-oriented |
| **Digital Twin** | `digital twin` | ~~virtual model~~, ~~simulation~~ | Industry standard term |

---

## Audit Results (January 21, 2026)

### Files Audited

```bash
# Command used:
grep -r "FreightRoll\|Freight Roll\|Yard Network\|YNS" app/ components/ --include="*.tsx" --include="*.ts"
```

**Status:** ✅ Brand constants created (`src/lib/brand/constants.ts`)

### Hardcoded Instances Found

| File | Line | Issue | Fix |
|------|------|-------|-----|
| TBD | TBD | TBD | Import `BRAND_NAMES.ProductFull` |

**Note:** Full audit pending; run grep command above to identify hardcoded strings.

---

## Implementation

### Using Brand Constants

**✅ Correct:**
```typescript
import { BRAND_NAMES, TERMINOLOGY } from '@/src/lib/brand';

// In component:
<h1>{BRAND_NAMES.ProductFull}</h1>
<p>{TERMINOLOGY.Orchestration} for {TERMINOLOGY.Yard} networks</p>
```

**❌ Incorrect:**
```typescript
// Hardcoded string (brittle, inconsistent)
<h1>YardFlow by FreightRoll</h1>
<p>yard orchestration for yard networks</p>
```

### Helper Functions

```typescript
import { getProductName, getCompanyName, getTagline } from '@/src/lib/brand';

// Short product name
getProductName(); // "YardFlow"

// Full product name
getProductName(true); // "YardFlow by FreightRoll"

// Company name
getCompanyName(); // "FreightRoll"

// Tagline
getTagline(); // "Yard Orchestration & Security for Freight Networks"
```

---

## Remaining Work

### Phase 1: Brand Constants (✅ Complete)
- [x] Create `src/lib/brand/constants.ts`
- [x] Add unit tests (19 tests passing)
- [x] Export helper functions

### Phase 2: Audit & Replace (⏳ Pending)
- [ ] Run grep audit on all files
- [ ] Identify hardcoded brand strings
- [ ] Replace with constants (batch PR)
- [ ] Update Header component
- [ ] Update Footer component
- [ ] Update all page titles

### Phase 3: Validation (⏳ Pending)
- [ ] E2E test: verify brand names render correctly
- [ ] Visual regression: capture brand consistency
- [ ] Lint rule: warn on hardcoded "FreightRoll" or "YardFlow" strings

---

## Audit Checklist

### Key Pages to Review

- [ ] Home page (`app/page.tsx`)
- [ ] Header (`components/Header.tsx`)
- [ ] Footer (`components/Footer.tsx`)
- [ ] ROI page (`app/roi/page.tsx`)
- [ ] Diagnostic page (`app/diagnostic/page.tsx`)
- [ ] Product pages (`app/product/page.tsx`)
- [ ] About page (`app/about/page.tsx`)
- [ ] Contact page (`app/contact/page.tsx`)

### Metadata Files

- [ ] `app/layout.tsx` (root metadata)
- [ ] All route `layout.tsx` files
- [ ] `robots.ts`
- [ ] `sitemap.ts`

---

## Brand Violations to Watch For

### Common Typos

- ~~"Freight Roll"~~ (space in company name)
- ~~"Yard Flow"~~ (space in product name)
- ~~"YardFlow By FreightRoll"~~ (capitalize "By")
- ~~"FreightRoll's YardFlow"~~ (possessive; prefer "YardFlow by FreightRoll")

### Inconsistent Casing

- ~~"freightroll"~~ (all lowercase)
- ~~"YARDFLOW"~~ (all caps, except in specific design contexts like logos)
- ~~"yns"~~ (lowercase acronym)

### Deprecated Terms

- ~~"Yard Network"~~ (use "Yard Network System" or "YNS")
- ~~"Freight network"~~ (capitalize if proper noun: "FreightRoll network")
- ~~"Variance reduction"~~ (prefer "standardized flow" or "variance elimination")

---

## Enforcement

### CI Gate (Future)

```bash
# Add to .github/workflows/brand-check.yml
- name: Check for hardcoded brand strings
  run: |
    if grep -r "Freight Roll\|Yard Flow" app/ components/; then
      echo "❌ Found hardcoded brand strings; use BRAND_NAMES constants"
      exit 1
    fi
```

### ESLint Rule (Future)

```javascript
// .eslintrc.js
rules: {
  'no-restricted-syntax': [
    'error',
    {
      selector: 'Literal[value=/FreightRoll|YardFlow/]',
      message: 'Use BRAND_NAMES constants instead of hardcoded brand strings',
    },
  ],
}
```

---

## Ownership

- **Architect Agent:** Implement brand constants, refactor hardcoded strings
- **Product Lead:** Approve terminology changes, review copy consistency
- **CEO:** Final sign-off on brand name standards

---

**Next Steps:**
1. ✅ Brand constants created + tested (19 tests passing)
2. ⏳ Run full grep audit (identify hardcoded strings)
3. ⏳ Refactor Header + Footer components
4. ⏳ Update all page titles + metadata
5. ⏳ Add CI gate to prevent future violations
