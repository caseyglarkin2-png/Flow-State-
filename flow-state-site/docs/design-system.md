# YardFlow by FreightRoll Design System

**Version:** 1.0  
**Last Updated:** January 5, 2026

---

## Design Philosophy

**"Precision, not spectacle."**

YardFlow by FreightRoll's visual language communicates:
1. **Control** — We tame chaos, not add to it
2. **Credibility** — CFO-grade, not startup-fluffy
3. **Clarity** — Every element serves comprehension

The aesthetic is "mission control for freight" — dark, focused, data-forward, with purposeful use of accent color to draw attention to what matters.

---

## 1. Color Tokens

### Brand Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `void` | `#050505` | `5, 5, 5` | Primary background, maximum contrast base |
| `carbon` | `#1A1A1A` | `26, 26, 26` | Secondary background, cards, elevated surfaces |
| `steel` | `#888888` | `136, 136, 136` | Body text, secondary content |
| `neon` | `#00B4FF` | `0, 180, 255` | Primary accent, CTAs, success states, progress |
| `ember` | `#FF2A00` | `255, 42, 0` | Warning, loss aversion, cost, urgency |
| `white` | `#FFFFFF` | `255, 255, 255` | Headlines, emphasis text |

### Semantic Colors

| Purpose | Token | Opacity Variants |
|---------|-------|------------------|
| Background | `void` | — |
| Surface | `carbon` | `/50`, `/70`, `/90` |
| Border | `steel` | `/20`, `/30`, `/40` |
| Border accent | `neon` | `/20`, `/30`, `/40` |
| Border warning | `ember` | `/20`, `/30` |
| Text primary | `white` | — |
| Text secondary | `steel` | `/70`, `/80`, `/90` |
| Text accent | `neon` | — |
| Text warning | `ember` | — |

### Contrast Requirements

- Body text (`steel` on `void`): **5.3:1** ✅ WCAG AA
- Headline (`white` on `void`): **21:1** ✅ WCAG AAA
- Accent (`neon` on `void`): **6.7:1** ✅ WCAG AA
- Warning (`ember` on `void`): **4.9:1** ⚠️ WCAG AA (use bold or larger)

---

## 2. Typography

### Font Stack

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display-1` | 72px (4.5rem) | 900 | 0.95 | -0.02em | Hero headlines |
| `display-2` | 56px (3.5rem) | 900 | 0.95 | -0.02em | Section headlines |
| `h1` | 48px (3rem) | 800 | 1.1 | -0.01em | Page titles |
| `h2` | 36px (2.25rem) | 700 | 1.2 | -0.01em | Section titles |
| `h3` | 24px (1.5rem) | 700 | 1.3 | 0 | Card titles |
| `h4` | 20px (1.25rem) | 600 | 1.4 | 0 | Subsection titles |
| `body-lg` | 18px (1.125rem) | 400 | 1.7 | 0 | Lead paragraphs |
| `body` | 16px (1rem) | 400 | 1.7 | 0 | Body text |
| `body-sm` | 14px (0.875rem) | 400 | 1.6 | 0 | Secondary text |
| `caption` | 12px (0.75rem) | 500 | 1.5 | 0.02em | Labels, disclaimers |
| `mono` | 14px (0.875rem) | 500 | 1.5 | 0 | Data, metrics, code |

### Typography Rules

1. **Headlines**: Always `font-black` (900), tight tracking
2. **Body text**: `steel/90` for readability, `line-height: 1.7`
3. **Monospace**: Use for metrics, system readouts, assumptions
4. **No more than 65 characters per line** for body text
5. **Minimum 16px** for body text on mobile

---

## 3. Spacing

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon gaps, tight padding |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Card internal padding |
| `space-4` | 16px | Default component gap |
| `space-5` | 20px | Section internal gap |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large gaps |
| `space-10` | 40px | Section breaks |
| `space-12` | 48px | Major section spacing |
| `space-16` | 64px | Page section spacing |
| `space-20` | 80px | Hero spacing |
| `space-24` | 96px | Major page breaks |

### Layout Grid

- **Container max-width**: 1280px (6xl)
- **Content max-width**: 768px (prose)
- **Padding**: 24px (mobile), 48px (desktop)
- **Grid columns**: 12
- **Gutter**: 24px

---

## 4. Components

### 4.1 Button

```tsx
// Primary (neon fill)
<Button variant="primary">Calculate Your Yard Tax</Button>

// Secondary (neon outline)
<Button variant="secondary">View Details</Button>

// Ghost (text only)
<Button variant="ghost">Learn more →</Button>

// Danger (ember)
<Button variant="danger">Cancel</Button>
```

**Sizes:**
- `sm`: 32px height, 14px text
- `md`: 44px height, 16px text (default)
- `lg`: 52px height, 18px text

**States:**
- Default, Hover (+scale 1.02, brighter), Active, Disabled, Loading

### 4.2 Card

```tsx
<Card hover border="neon">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

**Variants:**
- `default`: `bg-carbon/50`, `border-steel/20`
- `elevated`: `bg-carbon`, `border-steel/30`, subtle shadow
- `accent`: `border-neon/30`, `bg-neon/5`
- `warning`: `border-ember/30`, `bg-ember/5`
- `glass`: `backdrop-blur`, `bg-white/5`

### 4.3 Section Header

```tsx
<SectionHeader
  kicker="The Hidden Cost"
  title="The Yard Tax"
  subtitle="You're paying it whether you measure it or not."
/>
```

**Structure:**
1. Kicker: `text-neon` or `text-ember`, `font-mono`, `text-sm`, `uppercase`, `tracking-widest`
2. Title: `text-4xl md:text-5xl`, `font-black`
3. Subtitle: `text-lg md:text-xl`, `text-steel/80`, `max-w-3xl`

### 4.4 Stat Block

```tsx
<StatBlock
  value="$2.4M"
  label="Year-1 Savings"
  variant="highlight"
  footnote="modeled at 50 facilities"
/>
```

**Variants:**
- `default`: White value, steel label
- `highlight`: Neon value with glow
- `warning`: Ember value, warning context
- `comparison`: Before/after with delta

### 4.5 Callout

```tsx
<Callout variant="info" icon={InfoIcon}>
  All figures are modeled estimates based on published assumptions.
</Callout>
```

**Variants:**
- `info`: `border-neon/30`, neon icon
- `warning`: `border-ember/30`, ember icon
- `success`: `border-green-500/30`, green icon
- `insight`: `bg-carbon`, prominent styling

### 4.6 Accordion / FAQ

```tsx
<Accordion>
  <AccordionItem title="How is ROI calculated?">
    Our economics engine uses...
  </AccordionItem>
</Accordion>
```

**Behavior:**
- Single expand (default) or multi-expand
- Smooth height animation (300ms ease-out)
- Chevron rotation on expand
- Focus visible states

### 4.7 Form Field

```tsx
<FormField
  label="Facilities"
  hint="Number of sites in scope"
  error={errors.facilities}
>
  <Input type="number" value={facilities} onChange={...} />
</FormField>
```

**States:** Default, Focus, Error, Disabled
**Validation:** Inline error message below field

### 4.8 Badge

```tsx
<Badge variant="neon">New</Badge>
<Badge variant="ember">Cost</Badge>
<Badge variant="steel">Modeled</Badge>
```

### 4.9 Tooltip

```tsx
<Tooltip content="Detention costs recovered through defensible timestamps">
  <InfoIcon className="text-steel/50" />
</Tooltip>
```

### 4.10 Data Table

```tsx
<DataTable
  columns={[...]}
  data={[...]}
  sortable
  highlightRow={(row) => row.isOutlier}
/>
```

---

## 5. Motion

### Principles

1. **Purposeful**: Motion conveys meaning, not decoration
2. **Quick**: Most transitions ≤300ms
3. **Reduced motion**: Respect `prefers-reduced-motion`

### Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `duration-fast` | 150ms | ease-out | Hovers, micro-interactions |
| `duration-normal` | 300ms | ease-out | Panel transitions, reveals |
| `duration-slow` | 500ms | ease-in-out | Page transitions, large reveals |

### Animation Classes

```css
.animate-flow-in {
  animation: flow-in 0.6s ease-out;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-flow-in,
  .animate-glow-pulse {
    animation: none;
  }
}
```

---

## 6. Borders & Radii

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Badges, small elements |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards, panels |
| `radius-xl` | 16px | Modal, large containers |
| `radius-full` | 9999px | Pills, avatars |

| Border | Value | Usage |
|--------|-------|-------|
| `border-subtle` | `1px solid steel/20` | Default borders |
| `border-medium` | `1px solid steel/30` | Hover states |
| `border-accent` | `1px solid neon/30` | Accent containers |
| `border-warning` | `1px solid ember/30` | Warning states |

---

## 7. Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-neon: 0 0 20px rgba(0, 180, 255, 0.3);
--shadow-ember: 0 0 20px rgba(255, 42, 0, 0.3);
```

---

## 8. Iconography

**Icon Library:** Lucide React (primary) + Custom Flow Icons

### Flow Icons (Custom)

- `Agent` — Human/driver
- `Cortex` — AI/brain
- `Ignite` — Start/activate
- `Shield` — Security
- `Manifest` — Document/BOL
- `FlowArrow` — Movement/flow
- `Metrics` — Data/KPI
- `Velocity` — Speed/throughput
- `Timeline` — Time/schedule
- `Crosshair` — Target/precision
- `Territory` — Yard/location
- `Nexus` — Network/connection

### Sizing

| Size | Pixels | Usage |
|------|--------|-------|
| `xs` | 16px | Inline with text |
| `sm` | 20px | Button icons |
| `md` | 24px | Default |
| `lg` | 32px | Card headers |
| `xl` | 48px | Feature icons |

---

## 9. Responsive Breakpoints

| Breakpoint | Min-width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Wide screens |

### Mobile-First Rules

1. Stack on mobile, side-by-side on `md+`
2. Full-width buttons on mobile
3. Reduce padding on mobile (`px-4` vs `px-6`)
4. Hide secondary CTAs on mobile (show one clear action)

---

## 10. Accessibility

### Requirements

- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Focus visible on all interactive elements
- [ ] Skip link to main content
- [ ] Semantic HTML (headings, landmarks)
- [ ] Alt text on all images
- [ ] `aria-label` on icon-only buttons
- [ ] Keyboard navigable (tab order logical)
- [ ] `prefers-reduced-motion` respected

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-neon);
  outline-offset: 2px;
}
```

---

## 11. Component File Structure

```
components/
├── ui/                    # Design system primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── SectionHeader.tsx
│   ├── StatBlock.tsx
│   ├── Callout.tsx
│   ├── Accordion.tsx
│   ├── FormField.tsx
│   ├── Badge.tsx
│   ├── Tooltip.tsx
│   └── DataTable.tsx
├── icons/                 # Icon components
│   └── FlowIcons.tsx
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AppChrome.tsx
└── features/              # Feature-specific components
    ├── DiagnosticCalculator.tsx
    ├── NetworkEffectModel.tsx
    ├── YardTaxSection.tsx
    └── ...
```

---

## 12. Usage Guidelines

### Do

- Use `neon` sparingly — it's the "look here" color
- Use `ember` only for costs, warnings, urgency
- Let breathing room speak (generous padding)
- Keep cards simple (one message per card)
- Use monospace for data/metrics

### Don't

- Mix accent colors in the same section
- Use pure white for body text (use `steel/90`)
- Animate everything (purposeful only)
- Use generic icons when Flow Icons exist
- Crowd the interface (less is more)

---

## Appendix: Tailwind Utilities

### Common Patterns

```tsx
// Glass card
className="glass-card" // bg-white/5 backdrop-blur border border-white/10 rounded-lg

// Neon glow text
className="neon-glow" // text-neon with text-shadow animation

// Grid background
className="grid-background" // Animated grid pattern

// Section padding
className="py-24 px-6" // Standard section

// Container
className="max-w-6xl mx-auto" // Standard container
```
