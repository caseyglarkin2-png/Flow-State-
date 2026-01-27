# ADR-002: Zustand for Client State

## Status
Accepted

## Date
January 2026

## Context

YardFlow needs client-side state management for:
- ROI calculator inputs and results
- Performance/quality tier detection
- User persona preferences
- Network map configurations

Options considered:
1. **React Context** - Built-in, no dependencies
2. **Redux Toolkit** - Industry standard, powerful
3. **Zustand** - Minimal, hooks-based
4. **Jotai** - Atomic, bottom-up
5. **Valtio** - Proxy-based, mutable API

## Decision

Use **Zustand** for all client state management.

Reasons:
- Minimal boilerplate (no providers, actions, reducers)
- TypeScript-first with excellent inference
- Works well with React Server Components
- Built-in persistence middleware
- Small bundle size (~1.5kb)

## Consequences

### Positive
- Simple API: `create()` and `useStore()`
- No Provider wrapper required
- Easy testing with getState()/setState()
- Selective subscriptions prevent re-renders
- localStorage persistence built-in

### Negative
- Less structured than Redux (discipline required)
- No Redux DevTools (use zustand/devtools instead)
- Team must learn Zustand patterns

### Implementation

```typescript
// Store definition
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleStore {
  count: number;
  increment: () => void;
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 })),
    }),
    { name: 'example-storage' }
  )
);
```

### Store Organization

| Store | Purpose | Location |
|-------|---------|----------|
| `varianceTaxStore` | ROI calculator | `src/lib/varianceTax/store` |
| `performanceStore` | WebGL quality | `src/lib/stores/performanceStore` |
| `personaStore` | User persona | `src/store/persona` |
| `networkStore` | Network map | `src/lib/stores/networkStore` |
