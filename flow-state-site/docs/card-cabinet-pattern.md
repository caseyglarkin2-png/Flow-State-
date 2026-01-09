# Card-Cabinet Pattern

## Overview

**"Netflix rows for nerdy logistics content."**

The card-cabinet pattern solves a critical messaging tension: how to keep a page feeling lightweight while preserving deep, comprehensive content. Instead of forcing users through a 30-scroll manifesto, we let them **self-select depth** on intent.

## The Problem It Solves

Jake's concern: Network vs. Leak messaging can compete for attention when everything is longform.

**The Pattern**: Modular, collapsible-by-default cards. Casual visitors skim. Serious buyers dive deep. Everyone stays in-flow.

## Core Components

### 1. ExpandableCard
`/components/ExpandableCard.tsx`

**Purpose**: Collapsible section with progressive disclosure  
**Default State**: Collapsed  
**Collapsed View**: Headline + kicker + 2-3 bullets + "Expand" affordance  
**Expanded View**: Full content (essays, proof, specs, FAQs)

**Key Features**:
- Deep-link support: `#card-id` in URL auto-opens card
- localStorage persistence: "Continue where I left off"
- Analytics events: Track which content actually sells
- SEO-safe: Content always in DOM even when collapsed
- Accessibility: Native `<details>/<summary>` (keyboard-safe)
- Persona tagging: `data-persona="CFO,Ops"` for filtering

**Usage**:
```tsx
<ExpandableCard
  id="yms-vs-yns"
  title="YMS vs YNS: The Critical Difference"
  kicker="YMS optimizes individual sites. YNS orchestrates your entire network."
  bullets={[
    "Single facility vs. entire network optimization",
    "Isolated data vs. cross-site intelligence",
    "Linear ROI vs. compounding network value"
  ]}
  persona={["CFO", "Ops"]}
>
  {/* Full content here */}
</ExpandableCard>
```

### 2. ExpandAllControls
`/components/ExpandAllControls.tsx`

**Purpose**: Master controls for card state  
**Functionality**: "Expand all" / "Collapse all" buttons

**Usage**:
```tsx
<ExpandAllControls cardIds={allCardIds} />
```

### 3. PersonaFilter
`/components/PersonaFilter.tsx`

**Purpose**: Filter + reorder cards by role  
**Options**: All / CFO / Ops / Security / IT

**Behavior**:
- Matching cards: Move to top, full opacity
- Non-matching cards: Stay visible but dimmed (opacity 0.4)
- No URL/route changes (client-side only)

**Usage**:
```tsx
<PersonaFilter cardIds={allCardIds} />
```

## Implementation Guidelines

### What to Keep Visible (Always)

1. **Hero**: Network thesis
2. **Primary CTA**: Main conversion path
3. **Core Framework**: 3-6 highest-leverage cards that explain the category
4. **Final CTA**: Apply for membership / contact

### What to Collapse (Cards)

Everything else:
- YMS vs YNS comparison tables
- Network leak cost categories
- Proof metrics / case studies
- Product modules
- Deployment paths
- ROI calculators
- Technical specs

### Card Anatomy (Best Practices)

**Title**: Punchy headline (3-7 words)  
**Kicker**: 1-line "why this matters"  
**Bullets**: 2-3 key takeaways (CFO/Ops/Security flavored)  
**Content**: Full essay / proof / specs / FAQ

**Example**:
```tsx
<ExpandableCard
  id="proof-metrics"
  title="Aggregate Network Metrics"
  kicker="200+ facilities modeled. 50% dwell reduction. 8-week deployments."
  bullets={[
    "437% ROI at enterprise scale (modeled)",
    "50% dwell time reduction",
    "8 weeks avg. time to production"
  ]}
  persona={["CFO", "Ops"]}
>
  {/* Detailed metrics, charts, methodology */}
</ExpandableCard>
```

## Adult Supervision Controls

### 1. Expand All / Collapse All
Global state management for power users who want to print/read everything.

### 2. Persona Filter
Highlights + reorders cards based on role. Doesn't hide content (just dims non-matching).

### 3. Deep Links
Sales can send: `/security#evidence-vault` to auto-open specific card.

**Implementation**:
```tsx
useEffect(() => {
  const hash = window.location.hash.replace("#", "");
  if (hash && hash === id) {
    setOpen(true);
    requestAnimationFrame(() => 
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }
}, [id]);
```

## Messaging Architecture

### Network-First Framing

**Lead with**:
- "One application across all facilities"
- "Standardized driver + yard protocols"
- "Data that flows across the network"

**Position Leak as**:
- The **diagnostic** that proves urgency
- The **economic translator** for CFOs
- The **before/after metric** for rollout success

**NOT**:
- The product itself
- A feature to "solve leaks like a YMS"

### Category Wedge

**YMS**: Optimizes a few big yards. Network benefits are an afterthought.  
**YNS**: Standardizes the whole network. Leak reduction is an outcome.

**Messaging**:  
"YMS optimizes sites. YNS orchestrates networks."

## Analytics + Optimization

### Track Card Engagement
```tsx
onToggle={(open) => {
  if (open && typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "card_expand", {
      card_id: id,
      card_title: title
    });
  }
}}
```

**Learn**:
- Which content actually sells?
- Where do CFOs spend time vs. Ops?
- What gets skipped?

Use this data to:
- Reorder cards (put high-engagement first)
- Cut dead weight
- A/B test headlines

## Future Applications

This pattern can be applied to:
- `/security` (Evidence vault sections)
- `/roi` (Methodology deep-dives)
- `/product` (Module specs)
- `/yns` (Framework sections)
- `/implementation` (Phase details)

## File Reference

### Core Components
- `/components/ExpandableCard.tsx`
- `/components/ExpandAllControls.tsx`
- `/components/PersonaFilter.tsx`

### Homepage Versions
- `/app/page.tsx` - Current (card-cabinet)
- `/app/page-cards.tsx` - Reference implementation
- `/app/page-longform-backup.tsx` - Original (782 lines)

## Key Principles

1. **Casual visitor skims in 90 seconds**
2. **Serious buyer dives deep on intent**
3. **Everyone stays in-flow**
4. **Content never hidden from SEO**
5. **Accessibility by default** (native HTML elements)
6. **Analytics-driven iteration**

## Bottom Line

You can keep almost everything **and** make it feel 10x lighter. The casual visitor skims. The serious buyer finds proof. Sales can deep-link to specific evidence. Everyone wins.
