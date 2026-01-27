# ADR-001: Use Next.js App Router

## Status
Accepted

## Date
January 2026

## Context

YardFlow requires a modern React framework that supports:
- Server-side rendering for SEO
- Static generation for performance
- API routes for lead capture and PDF generation
- Edge runtime for global performance
- Type-safe routing

Options considered:
1. **Next.js Pages Router** - Mature, well-documented
2. **Next.js App Router** - Modern, RSC support, streaming
3. **Remix** - Good DX, nested routes
4. **Astro** - Static-first, islands architecture

## Decision

Use **Next.js 16 with App Router**.

Reasons:
- React Server Components reduce client bundle size
- Streaming SSR improves Time to First Byte
- Native TypeScript support
- Vercel deployment is seamless
- Large ecosystem and community
- Incremental adoption path

## Consequences

### Positive
- Automatic code splitting per route
- Server Components by default (smaller bundles)
- Built-in image optimization
- API routes for backend logic
- Excellent Vercel integration

### Negative
- Steeper learning curve (RSC mental model)
- 'use client' directive required for interactivity
- Some libraries not yet compatible with RSC
- Cache invalidation can be complex

### Mitigations
- Document 'use client' requirements in DEVELOPER_GUIDE.md
- Use Zustand stores only in client components
- Test all interactive components in E2E suite
