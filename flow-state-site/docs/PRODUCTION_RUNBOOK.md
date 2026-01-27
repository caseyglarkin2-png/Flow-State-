# YardFlow Production Runbook

> Operational guide for production deployment and maintenance

**Last Updated:** January 2026

---

## Table of Contents

1. [Deployment](#deployment)
2. [Monitoring](#monitoring)
3. [Incident Response](#incident-response)
4. [Rollback Procedures](#rollback-procedures)
5. [Maintenance Tasks](#maintenance-tasks)
6. [Troubleshooting](#troubleshooting)

---

## Deployment

### Pre-Deployment Checklist

- [ ] All CI checks pass (lint, typecheck, unit tests, E2E)
- [ ] Environment variables configured in Vercel
- [ ] Golden tests unchanged (or explicitly approved)
- [ ] Visual regression reviewed
- [ ] Performance budget verified

### Vercel Deployment

**Automatic:** Every push to `main` triggers production deployment.

**Manual deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables Setup

**Required for Production:**

| Variable | Where to Set | Notes |
|----------|--------------|-------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | Vercel Dashboard | Client-side, all environments |
| `HCAPTCHA_SECRET` | Vercel Dashboard | Production only |
| `RESEND_API_KEY` | Vercel Dashboard | Production only |
| `LEAD_NOTIFY_EMAIL` | Vercel Dashboard | All environments |

**Setting in Vercel:**
1. Go to Project → Settings → Environment Variables
2. Add variable name and value
3. Select environment (Production/Preview/Development)
4. Click Save

### Post-Deployment Verification

```bash
# 1. Check site is live
curl -I https://yardflow.ai

# 2. Verify security headers
curl -I https://yardflow.ai | grep -E "Content-Security|X-Frame|X-Content"

# 3. Test critical paths
# - Homepage loads
# - Contact form submits
# - ROI calculator works
# - PDF generation succeeds
```

---

## Monitoring

### Health Checks

**Endpoints to monitor:**

| Endpoint | Expected | Frequency |
|----------|----------|-----------|
| `/` | 200 OK | 1 min |
| `/api/health` | 200 OK + JSON | 1 min |
| `/contact` | 200 OK | 5 min |
| `/roi` | 200 OK | 5 min |

### Error Tracking (Sentry)

**Dashboard:** https://sentry.io/organizations/yardflow/

**Key metrics:**
- Error rate < 0.1%
- P95 latency < 500ms
- Unhandled rejections: 0

**Alert thresholds:**
- Error rate > 1% → PagerDuty alert
- API latency > 2s → Slack notification
- Build failure → Email notification

### Performance Monitoring

**Vercel Analytics:**
- Core Web Vitals (LCP, FID, CLS)
- Real user monitoring
- Geographic distribution

**Thresholds:**
- LCP < 2.5s (Good)
- FID < 100ms (Good)
- CLS < 0.1 (Good)

### Log Access

```bash
# Vercel function logs
vercel logs --follow

# Filter by function
vercel logs --filter="api/leads"

# Last N lines
vercel logs --limit=100
```

---

## Incident Response

### Severity Levels

| Level | Definition | Response Time | Example |
|-------|------------|---------------|---------|
| P1 | Site down | 15 min | Homepage 500 |
| P2 | Major feature broken | 1 hour | Forms not submitting |
| P3 | Minor feature broken | 4 hours | PDF styling issue |
| P4 | Cosmetic | 24 hours | Typo, minor UI bug |

### P1 Incident Playbook

1. **Acknowledge** (within 5 min)
   - Post in #incidents Slack channel
   - Start incident document

2. **Assess** (within 10 min)
   - Check Vercel deployment status
   - Review Sentry for errors
   - Check external dependencies (hCaptcha, Resend)

3. **Mitigate** (within 15 min)
   - If deployment issue → Rollback (see below)
   - If external dependency → Enable fallback

4. **Resolve**
   - Fix root cause
   - Deploy fix
   - Verify in production

5. **Postmortem** (within 48 hours)
   - Timeline of events
   - Root cause analysis
   - Action items

### Communication Template

```
🚨 INCIDENT: [Brief description]
Status: [Investigating | Identified | Monitoring | Resolved]
Impact: [User-facing impact]
ETA: [Estimated resolution time]
Updates: [Link to status page or Slack thread]
```

---

## Rollback Procedures

### Instant Rollback (Vercel)

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### CLI Rollback

```bash
# List recent deployments
vercel list

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit (destructive)
git reset --hard [commit-hash]
git push origin main --force
```

### Database Rollback (if applicable)

```bash
# Not currently applicable - no database
# If added, document here
```

---

## Maintenance Tasks

### Weekly

- [ ] Review Sentry error trends
- [ ] Check Vercel Analytics for performance regressions
- [ ] Verify lead notifications are delivering
- [ ] Review security advisory notifications

### Monthly

- [ ] Update dependencies (`npm update`)
- [ ] Run full E2E suite locally
- [ ] Review and rotate API keys if needed
- [ ] Check SSL certificate expiry
- [ ] Review access logs for anomalies

### Quarterly

- [ ] Security audit (dependency vulnerabilities)
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (WCAG compliance)
- [ ] Update documentation

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update minor/patch versions
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

**Major version updates require:**
1. Create feature branch
2. Update package
3. Run full test suite
4. Visual regression check
5. Merge to main

---

## Troubleshooting

### Common Issues

#### Forms Not Submitting

**Symptoms:** Contact form shows error, no email received

**Diagnosis:**
```bash
# Check Vercel logs
vercel logs --filter="api/leads"
```

**Common causes:**
1. hCaptcha secret missing → Add to Vercel env vars
2. Resend API key expired → Regenerate key
3. Rate limit hit → Wait or increase limits

#### PDF Generation Failing

**Symptoms:** ROI PDF download fails

**Diagnosis:**
```bash
vercel logs --filter="api/pdf"
```

**Common causes:**
1. Memory limit exceeded → Increase function memory in vercel.json
2. Timeout → Increase function duration
3. Missing dependency → Check `@react-pdf/renderer` in dependencies

#### WebGL Errors

**Symptoms:** 3D visualizations not rendering

**Common causes:**
1. Browser doesn't support WebGL → Fallback should display
2. GPU blocklist → User device issue
3. Shader compilation error → Check shader syntax

**Verification:**
```bash
npm run test:shaders
```

#### Build Failures

**Symptoms:** Deployment fails

**Diagnosis:**
```bash
# Local build
npm run build

# Check TypeScript errors
npm run typecheck

# Check lint errors
npm run lint
```

### Debug Mode

**Enable verbose logging:**
```bash
# Local development
DEBUG=* npm run dev

# Vercel function
# Add to env vars: DEBUG=true
```

### Useful Commands

```bash
# Full health check
npm run predeploy

# Check for type errors only
npm run typecheck

# Run specific E2E test
npm run test:e2e -- --grep "contact form"

# Generate Lighthouse report
npx lighthouse https://yardflow.ai --output html

# Check SSL certificate
echo | openssl s_client -servername yardflow.ai -connect yardflow.ai:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Contacts

| Role | Name | Contact |
|------|------|---------|
| Engineering Lead | - | founding@flow-state.ai |
| On-Call | - | #incidents Slack |
| Vercel Support | - | https://vercel.com/support |
| Resend Support | - | https://resend.com/support |

---

## Related Documentation

- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Deployment checklist
- [DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md) - Development reference
- [docs/ROUTE_AUDIT.md](docs/ROUTE_AUDIT.md) - Route inventory
- [.env.example](.env.example) - Environment variables
