# ADR-005: Centralized Navigation Config

## Status
Accepted

## Date
January 2026

## Context

During route consolidation, we identified:
- Navigation links defined in multiple places (Header, Footer, mobile menu)
- Link updates required changes in 3+ files
- Risk of broken links and inconsistent navigation
- No single source of truth for route structure

## Decision

Create a **centralized navigation configuration** in `config/navigation.ts`.

This file defines:
- All navigation routes with metadata
- Header navigation structure
- Footer navigation structure
- Route groupings (main, product, resources)

## Consequences

### Positive
- Single source of truth for navigation
- Type-safe route definitions
- Easy to add/remove/reorder routes
- Consistent across Header, Footer, mobile menu
- Simpler component code (no hardcoded links)

### Negative
- One more file to maintain
- Slight indirection for simple cases
- Must remember to update config, not components

### Implementation

```typescript
// config/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'YardBuilder', href: '/yardbuilder' },
  { label: 'ROI', href: '/roi' },
  { label: 'Proof', href: '/proof' },
];

export const footerNav: NavGroup[] = [
  {
    label: 'Product',
    items: [
      { label: 'Overview', href: '/product' },
      { label: 'YardBuilder AI', href: '/yardbuilder' },
      { label: 'ROI Calculator', href: '/roi' },
    ],
  },
  // ... more groups
];
```

**Usage in Components:**

```tsx
// components/Header.tsx
import { mainNav } from '@/config/navigation';

export function Header() {
  return (
    <nav>
      {mainNav.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Redirect Mapping

The config also supports redirect mappings for deprecated routes:

```typescript
export const redirects: Record<string, string> = {
  '/case-studies': '/proof',
  '/simulations': '/demo/network-map',
  '/resources/simulations': '/demo/network-map',
  '/start-your-map': '/yardbuilder',
  '/solutions/:path*': '/solutions',
};
```

These are applied in `next.config.js`.

### Related

- [docs/ROUTE_AUDIT.md](../ROUTE_AUDIT.md) - Full route inventory
- `next.config.js` - Redirect configuration
