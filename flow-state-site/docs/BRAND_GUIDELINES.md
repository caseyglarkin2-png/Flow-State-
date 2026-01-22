# YardFlow Brand Guidelines

Design system and brand identity for YardFlow by FreightRoll.

## Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Void** | `#050505` | `--void` | Primary background |
| **LIA Neon** | `#00FFC2` | `--neon` | Primary accent, CTAs, highlights |
| **Safety Ember** | `#FF2A00` | `--ember` | Alerts, errors, urgency |

### Secondary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Carbon** | `#1A1A1A` | `--carbon` | Secondary backgrounds, cards |
| **Steel** | `#888888` | `--steel` | Body text, labels |
| **White** | `#FFFFFF` | - | Headlines, emphasis |

### Color Usage Rules

1. **Neon (#00FFC2)** - Use for:
   - Primary CTA buttons
   - Active states
   - Links on hover
   - Important data/metrics
   - Never for body text

2. **Ember (#FF2A00)** - Reserve for:
   - Error messages
   - Required field indicators
   - Critical alerts
   - Destructive actions

3. **Void + Carbon** - Layer for depth:
   - Void for page backgrounds
   - Carbon for elevated surfaces (cards, modals)

## Typography

### Font Stack

- **Primary:** Inter (variable)
- **Monospace:** JetBrains Mono (technical data)

### Type Scale

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| H1 | 5xl-8xl | Black (900) | Tight |
| H2 | 3xl-4xl | Bold (700) | Tight |
| H3 | xl-2xl | Semibold (600) | Normal |
| Body | base-lg | Regular (400) | Normal |
| Caption | sm-xs | Regular (400) | Wide |
| Mono/Data | sm | Medium (500) | Normal |

### Usage Examples

```css
/* Hero headline */
.hero-title {
  @apply text-5xl md:text-7xl lg:text-8xl font-black tracking-tight;
}

/* Section headline */
.section-title {
  @apply text-3xl md:text-4xl font-bold;
}

/* Body text */
.body-text {
  @apply text-lg text-steel/90 leading-relaxed;
}
```

## Logo

### Variants

1. **Full logo** - Icon + "YardFlow" wordmark + "by FreightRoll"
2. **Compact** - Icon + "YardFlow" wordmark only
3. **Icon only** - For favicons, small spaces

### Clear Space

Maintain minimum clear space equal to icon height on all sides.

### Minimum Sizes

- Full logo: 120px width
- Compact: 80px width
- Icon only: 24px

## Components

### Buttons

```tsx
// Primary CTA
<Button variant="neon-fill">Book a Network Audit</Button>

// Secondary
<Button variant="ghost">Learn More</Button>

// Destructive
<Button variant="ember">Delete</Button>
```

### Cards

- Background: `bg-carbon/50`
- Border: `border-neon/20`
- Hover: `hover:border-neon/40`
- Rounded: `rounded-xl`

### Forms

- Input background: `bg-carbon`
- Border: `border-steel/20`
- Focus: `focus:border-neon`
- Labels: `text-steel text-sm`

## Voice & Tone

### Brand Voice

- **Confident** - We know yard operations
- **Technical** - Precise, data-driven claims
- **Approachable** - Complex made simple
- **Proof-first** - Always back claims with evidence

### Writing Guidelines

1. Lead with outcomes, not features
2. Use specific numbers over vague claims
3. Avoid jargon without explanation
4. Keep sentences short and direct
5. Always include proof points

### Examples

❌ "Revolutionary AI-powered yard management solution"  
✅ "200K+ drivers. 58 facilities. Same protocol everywhere."

❌ "Optimize your operations"  
✅ "Reduce dwell time by 40% in 90 days"

## Accessibility

- Minimum contrast ratio: 4.5:1 for text
- Touch targets: 44×44px minimum
- Focus states: Always visible (neon outline)
- ARIA labels on all interactive elements
- Skip navigation link on every page

## Motion

- Prefer `prefers-reduced-motion` awareness
- Keep animations under 300ms
- Use easing: `ease-out` for enters, `ease-in` for exits
- No auto-playing videos with sound
