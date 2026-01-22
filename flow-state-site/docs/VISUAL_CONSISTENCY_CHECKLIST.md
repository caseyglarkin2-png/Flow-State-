# Visual Consistency Checklist

> **Created:** January 22, 2026  
> **Purpose:** Standardized audit criteria for page visual congruence  
> **Sprint:** S4 (Visual Congruence Sprint Plan)

---

## Scoring Rubric

| Symbol | Meaning | Priority |
|--------|---------|----------|
| ✅ | Pass - Fully compliant | None |
| ⚠️ | Warning - Minor deviation | Low (defer to backlog) |
| ❌ | Critical - Major brand violation | High (fix immediately) |

---

## 10-Point Checklist

### 1. Color Palette Compliance

**Criteria:** Uses only approved brand colors.

| Token | Value | Usage |
|-------|-------|-------|
| `void` | #050505 | Primary background |
| `carbon` | #1A1A1A | Card backgrounds, secondary surfaces |
| `neon` | #00B4FF | CTAs, highlights, interactive states |
| `ember` | #FF2A00 | Errors, warnings, problems |
| `steel` | #8A8F98 | Secondary text, muted elements |
| `white` | #FFFFFF | Primary text on dark backgrounds |

**Check:**
```bash
grep -rn "#[0-9a-fA-F]\{6\}" app/ components/ | grep -v "00B4FF\|050505\|1A1A1A\|FF2A00\|8A8F98\|FFFFFF\|000000"
```

**Compliant Example:**
```tsx
<div className="bg-carbon border-neon/20">
  <h2 className="text-white">Title</h2>
  <p className="text-steel">Description</p>
</div>
```

**Non-Compliant Example:**
```tsx
<div style={{ backgroundColor: '#2D2D2D' }}>  {/* Off-brand gray */}
  <h2 style={{ color: '#3B82F6' }}>Title</h2>  {/* Tailwind blue, not neon */}
</div>
```

---

### 2. Typography Scale

**Criteria:** Uses brand type scale exclusively.

| Level | Class | Size/Weight |
|-------|-------|-------------|
| H1 | `text-4xl md:text-5xl lg:text-6xl font-bold` | 36-60px, 700 |
| H2 | `text-2xl md:text-3xl lg:text-4xl font-semibold` | 24-36px, 600 |
| H3 | `text-xl md:text-2xl font-semibold` | 20-24px, 600 |
| Body | `text-base text-steel` | 16px, 400 |
| Small | `text-sm text-steel/70` | 14px, 400 |
| Mono | `font-mono text-sm` | 14px, monospace |

**Check:** Verify no custom font sizes outside scale.

---

### 3. Spacing Consistency

**Criteria:** Uses Tailwind spacing scale consistently.

| Context | Recommended Values |
|---------|-------------------|
| Section padding | `py-16 md:py-24 lg:py-32` |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Card padding | `p-6 md:p-8` |
| Element gaps | `gap-4`, `gap-6`, `gap-8` |
| Stack spacing | `space-y-4`, `space-y-6`, `space-y-8` |

**Non-Compliant:**
```tsx
<div className="py-17">  {/* Non-standard spacing */}
<div className="gap-5">  {/* Use gap-4 or gap-6 */}
```

---

### 4. Card Styling

**Criteria:** Cards follow brand pattern.

**Standard Card:**
```tsx
<div className="bg-carbon/50 backdrop-blur-sm border border-neon/20 rounded-xl p-6">
  {/* Card content */}
</div>
```

**Variants:**
- Hover: `hover:border-neon/40 transition-colors`
- Interactive: `cursor-pointer hover:bg-carbon/70`
- Highlighted: `border-neon/40 shadow-[0_0_20px_rgba(0,180,255,0.15)]`

**Non-Compliant:**
```tsx
<div className="bg-gray-800 rounded-lg border">  {/* Off-brand */}
```

---

### 5. Button Styling

**Criteria:** Buttons use brand patterns exclusively.

**Primary Button:**
```tsx
<button className="bg-neon text-void px-6 py-3 rounded-lg font-semibold hover:bg-neon/90 transition-colors">
  Primary CTA
</button>
```

**Secondary (Ghost) Button:**
```tsx
<button className="border border-neon/40 text-neon px-6 py-3 rounded-lg font-semibold hover:bg-neon/10 transition-colors">
  Secondary CTA
</button>
```

**Tertiary (Text) Button:**
```tsx
<button className="text-neon hover:text-neon/80 font-medium transition-colors">
  Text Action →
</button>
```

---

### 6. Icon Usage

**Criteria:** Uses only brand-aligned icons.

**Approved Sources:**
- `components/icons/FlowIcons.tsx` - Full icon library
- `components/icons/FlowGlyphs.tsx` - Small glyphs
- `components/icons/ProtocolIcons.tsx` - Protocol module icons

**Forbidden:**
- Lucide icons without wrapper
- Heroicons directly
- Inline SVG with non-brand aesthetic
- Emoji as icons in production content

**Check:**
```bash
grep -rn "lucide-react\|@heroicons" app/ components/
```

---

### 7. Animation Patterns

**Criteria:** Uses brand motion presets.

**Approved Patterns:**
```tsx
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideInUp } from '@/lib/motion';

<motion.div variants={fadeIn} initial="hidden" animate="visible">
<motion.ul variants={staggerContainer}>
```

**Requirements:**
- All animations respect `prefers-reduced-motion`
- Max duration: 500ms for UI, 3s for hero animations
- Easing: `ease-out` or spring with damping

**Non-Compliant:**
```tsx
<div style={{ animation: 'bounce 1s infinite' }}>  {/* Custom animation */}
```

---

### 8. Image Handling

**Criteria:** All images use Next.js Image with proper attributes.

**Required Pattern:**
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.webp"
  alt="Descriptive alt text for accessibility"
  width={800}
  height={600}
  className="rounded-lg"
  loading="lazy"
/>
```

**Check:**
- [ ] All `<img>` tags replaced with `<Image>`
- [ ] Alt text is descriptive (not empty or generic)
- [ ] WebP format preferred
- [ ] Explicit width/height or fill layout

---

### 9. Video Handling

**Criteria:** Videos optimized with poster frames and lazy loading.

**Required Pattern:**
```tsx
<video
  poster="/proof/video-name-poster.webp"
  preload="none"
  muted
  loop
  playsInline
  className="rounded-lg"
>
  <source src="/proof/video-name.webm" type="video/webm" />
  <source src="/proof/video-name.mp4" type="video/mp4" />
</video>
```

**Check:**
- [ ] All videos have poster attribute
- [ ] WebM source listed first (better compression)
- [ ] `preload="none"` for lazy loading
- [ ] `playsInline` for mobile
- [ ] `muted` for autoplay support

---

### 10. Reduced Motion Support

**Criteria:** All animations respect `prefers-reduced-motion`.

**Implementation:**
```tsx
import { useReducedMotion } from '@/lib/hooks';

const reducedMotion = useReducedMotion();

<motion.div
  animate={reducedMotion ? {} : { opacity: [0, 1], y: [20, 0] }}
>
```

**Or via Framer Motion:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: reducedMotion ? 0 : 0.5 }}
>
```

**Check:**
```bash
grep -rn "prefers-reduced-motion\|useReducedMotion" components/
```

---

## Page Audit Template

```markdown
## Page: [URL]

**Auditor:** [Name]  
**Date:** [YYYY-MM-DD]  
**Overall Score:** [X/10 ✅ | Y ⚠️ | Z ❌]

### Results

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | Color Palette | ✅/⚠️/❌ | |
| 2 | Typography | ✅/⚠️/❌ | |
| 3 | Spacing | ✅/⚠️/❌ | |
| 4 | Cards | ✅/⚠️/❌ | |
| 5 | Buttons | ✅/⚠️/❌ | |
| 6 | Icons | ✅/⚠️/❌ | |
| 7 | Animations | ✅/⚠️/❌ | |
| 8 | Images | ✅/⚠️/❌ | |
| 9 | Videos | ✅/⚠️/❌ | |
| 10 | Reduced Motion | ✅/⚠️/❌ | |

### Issues Found

#### Critical (❌)
- None / [Description + file:line]

#### Warnings (⚠️)
- None / [Description + file:line]

### Fixes Applied
- [Description of fix + commit hash]
```

---

## Automated Checks

```bash
#!/bin/bash
# Run all automated visual consistency checks

echo "=== Color Palette Check ==="
grep -rn "#[0-9a-fA-F]\{6\}" app/ components/ --include="*.tsx" | \
  grep -v "00B4FF\|050505\|1A1A1A\|FF2A00\|8A8F98\|FFFFFF\|000000" | \
  head -20

echo ""
echo "=== Non-standard Spacing Check ==="
grep -rn "py-[0-9]\|px-[0-9]\|gap-[0-9]\|space-[xy]-[0-9]" app/ components/ --include="*.tsx" | \
  grep -E "(py-[13579]|px-[13579]|gap-[13579]|space-[xy]-[13579])" | \
  head -20

echo ""
echo "=== External Icon Imports ==="
grep -rn "lucide-react\|@heroicons" app/ components/ --include="*.tsx" | head -10

echo ""
echo "=== Raw img Tags ==="
grep -rn "<img " app/ components/ --include="*.tsx" | head -10

echo ""
echo "=== Videos Without Poster ==="
grep -rn "<video" app/ components/ --include="*.tsx" | grep -v "poster=" | head -10

echo ""
echo "=== TypeCheck ==="
npm run typecheck

echo ""
echo "=== Build Check ==="
npm run build
```

---

## Success Criteria

For a page to pass audit:
- 0 Critical (❌) issues
- < 3 Warning (⚠️) issues per page
- All checks receive ✅ or ⚠️ (no ❌)

For sprint completion:
- All 41 production pages audited
- 0 total critical issues
- < 15 total warning issues (logged in backlog)
- `npm run predeploy` passes
