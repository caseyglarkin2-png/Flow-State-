# Contributing to YardFlow

Welcome! This guide covers everything you need to contribute to the YardFlow website.

## Quick Start

```bash
# Clone and install
git clone https://github.com/caseyglarkin2-png/Flow-State-.git
cd Flow-State-/flow-state-site
npm install

# Start development
npm run dev
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production - auto-deploys to Vercel |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation updates |

### Workflow

1. Create branch from `main`: `git checkout -b feat/my-feature`
2. Make changes with atomic commits
3. Run validation: `npm run predeploy`
4. Push and open PR
5. Request review
6. Squash merge to `main`

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(roi): add PDF export with company branding
fix(form): resolve validation on empty email
docs(readme): add environment variables section
test(network): add DetailPanel unit tests
chore(deps): update Next.js to 16.2
```

**Types:** `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `style`, `perf`

## Code Style

### TypeScript

- Use strict mode (already configured)
- Prefer explicit types over `any`
- Use interfaces for props, types for unions

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'ghost';
  onClick: () => void;
}

// Avoid
const handleClick = (e: any) => { ... }
```

### React Components

- Use function components with hooks
- Prefer named exports for components
- Add JSDoc comments for public components

```tsx
/**
 * Primary CTA button with neon styling.
 * @param variant - Visual style: 'primary' or 'ghost'
 */
export default function Button({ variant, children }: ButtonProps) {
  return <button className={styles[variant]}>{children}</button>;
}
```

### File Organization

```
components/
  MyComponent/
    index.tsx        # Main component
    types.ts         # TypeScript types
    utils.ts         # Helper functions
    __tests__/
      MyComponent.test.tsx
```

## Testing Requirements

### Unit Tests (Vitest)

Required for:
- New components
- Utility functions
- API handlers
- Business logic

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Run specific file
npm run test:unit -- components/Button.test.tsx
```

### E2E Tests (Playwright)

Required for:
- New pages
- Critical user flows
- Form submissions

```bash
# Run E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- e2e/contact.spec.ts

# Debug mode
npm run test:e2e -- --debug
```

### Test Coverage Expectations

- New features: 80%+ coverage
- Bug fixes: Include regression test
- Utilities: 100% coverage

## Pull Request Process

### Before Submitting

1. Run full validation:
   ```bash
   npm run predeploy
   ```

2. Update documentation if needed

3. Add tests for new functionality

4. Ensure no TypeScript errors:
   ```bash
   npm run typecheck
   ```

### PR Template

```markdown
## Summary
Brief description of changes

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated (if UI changes)
- [ ] Manual testing completed

## Screenshots
(if applicable)
```

### Review Process

- PRs require 1 approval
- CI must pass (typecheck, lint, tests)
- Vercel preview deployment must succeed
- Review SLA: 24 hours

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript validation |
| `npm run lint` | ESLint check |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run predeploy` | Full validation suite |
| `npm run audit:bundle` | Bundle size check |

## Common Issues

### Port 3000 in use

```bash
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill
```

### TypeScript errors after dependency update

```bash
rm -rf node_modules .next
npm install
npm run typecheck
```

### Playwright tests failing

```bash
# Ensure browsers installed
npx playwright install

# Run with headed browser for debugging
npm run test:e2e -- --headed
```

## Questions?

- Check existing issues/PRs
- Review [README.md](./README.md)
- Check [docs/](./docs/) for detailed documentation

---

Thank you for contributing! 🚀
