# CTA Hierarchy Documentation

> **Last Updated:** January 22, 2026  
> **Purpose:** Ensure each page has one clear primary CTA, preventing competing actions.

---

## CTA Styling Guide

| Level | Style | Usage |
|-------|-------|-------|
| **Primary** | `bg-neon text-void` + shadow | One per page, main conversion action |
| **Secondary** | `border border-steel/30 text-white` | Supporting action, information |
| **Tertiary** | `text-neon hover:underline` | In-page links, less prominent |

---

## Route CTA Mapping

### High-Intent Pages

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/` | Schedule Demo | "See YardFlow in Action" | `/demo` |
| `/roi` | Calculate ROI | "Calculate Your Savings" | Form submit |
| `/product` | Get Started | "Start Your Journey" | `/contact` |
| `/pricing` | Contact Sales | "Talk to Sales" | `/contact` |
| `/demo` | Schedule Demo | "Schedule Your Demo" | Form submit |
| `/contact` | Submit | "Get in Touch" | Form submit |

### Discovery Pages

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/about` | Join Our Journey | "Build With Us" | `/co-development` |
| `/singularity` | Get Started | "Start Your Singularity" | `/contact` |
| `/network-effect` | Learn More | "Explore the Network" | `/product` |
| `/diagnostic` | Run Diagnostic | "Start Your Assessment" | Calculator |

### Resource Pages

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/resources` | Browse Resources | Category links | Sub-pages |
| `/resources/guides/*` | Download Guide | "Download PDF" | PDF generation |
| `/resources/field-notes/*` | Share Insight | LinkedIn share | External |
| `/case-studies` | View Case Study | "Read Full Story" | Detail page |
| `/faq` | Still Have Questions? | "Contact Us" | `/contact` |

### Comparison Pages

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/compare` | See the Difference | "Compare Now" | Comparison tables |
| `/compare/legacy-yms` | Switch to YardFlow | "Make the Switch" | `/contact` |
| `/compare/spreadsheets` | Upgrade Now | "Leave Spreadsheets Behind" | `/demo` |

### Tools & Simulations

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/yardbuilder` | Build Your Yard | "Configure Now" | Interactive tool |
| `/simulations` | Run Simulation | "Start Simulation" | Interactive |
| `/qualify` | Check Eligibility | "See If You Qualify" | Form |

### Legal & Info

| Route | Primary CTA | Copy | Destination |
|-------|-------------|------|-------------|
| `/terms` | — | No CTA needed | — |
| `/privacy` | — | No CTA needed | — |
| `/security` | Contact Security | "Report an Issue" | Security email |
| `/status` | — | System status only | — |

---

## Anti-Patterns to Avoid

### ❌ Multiple Primary CTAs

```tsx
// BAD: Two competing primary buttons
<Button variant="primary">Schedule Demo</Button>
<Button variant="primary">Get Pricing</Button>
```

### ✅ One Primary + One Secondary

```tsx
// GOOD: Clear hierarchy
<Button variant="primary">Schedule Demo</Button>
<Button variant="secondary">View Pricing</Button>
```

---

## CTA Placement Guidelines

1. **Hero Section:** Primary CTA visible without scroll
2. **Mid-Page:** Secondary CTA after value proposition
3. **Footer:** Consistent site-wide CTA (typically "Contact")
4. **Header:** Persistent "Get Started" or "Schedule Demo"

---

## Conversion Funnel

```
Homepage → Product/ROI → Demo Request → Contact Form
              ↓                ↓
         Case Studies    → Singularity
              ↓
          Resources
```

---

## Audit Checklist

- [ ] Each page has exactly ONE primary-styled CTA
- [ ] Primary CTA is visible above the fold
- [ ] CTA copy is action-oriented (verbs, not nouns)
- [ ] Secondary CTAs don't visually compete with primary
- [ ] Mobile: CTAs have 44x44px minimum touch target
