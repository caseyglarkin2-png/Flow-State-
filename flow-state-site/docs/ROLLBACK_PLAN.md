# Rollback Plan

> **Last Updated:** January 22, 2026  
> **Purpose:** Document emergency rollback procedures for YardFlow production deployments.

---

## Quick Rollback (< 2 minutes)

### Via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **yardflow-site** project
3. Click **Deployments** tab
4. Find the last known good deployment
5. Click the **⋮** menu → **Promote to Production**
6. Confirm the rollback

### Via Vercel CLI

```bash
# List recent deployments
vercel ls yardflow-site

# Rollback to specific deployment
vercel rollback <deployment-url>

# Or alias a previous deployment to production
vercel alias <old-deployment-url> yardflow.com
```

---

## Rollback Scenarios

### Scenario 1: Build Failure

**Symptoms:** Deploy fails, no new production
**Action:** No rollback needed - previous production still active
**Resolution:** Fix code, push new commit

### Scenario 2: Runtime Errors

**Symptoms:** 500 errors, error.tsx showing, user reports
**Detection:** 
- Vercel Functions tab → Error rate spike
- PostHog → Error events
- User reports

**Action:** 
1. Immediate rollback via dashboard
2. Investigate logs
3. Fix and redeploy

### Scenario 3: Performance Degradation

**Symptoms:** Slow page loads, Lighthouse regression
**Detection:**
- Vercel Analytics → Edge latency spike
- Real User Monitoring → LCP/FID degradation

**Action:**
1. Rollback if severe (> 2x baseline)
2. Run `npm run audit:bundle` to compare
3. Check for large new dependencies

### Scenario 4: Data/API Issues

**Symptoms:** Forms not submitting, PDF generation failing
**Detection:**
- Vercel Functions logs
- PostHog → Form submission events drop

**Action:**
1. Check API route logs
2. Verify environment variables
3. Rollback if needed

---

## Monitoring Dashboards

| Service | URL | What to Check |
|---------|-----|---------------|
| Vercel Analytics | https://vercel.com/analytics | Edge latency, function duration |
| Vercel Logs | https://vercel.com/[team]/[project]/logs | Error logs, function invocations |
| PostHog | https://app.posthog.com | Event tracking, user sessions |
| Status Page | /status | System health (if applicable) |

---

## Incident Response Contacts

| Role | Contact | When to Escalate |
|------|---------|------------------|
| Engineering Lead | [TBD] | Production errors, rollback decisions |
| Product Owner | [TBD] | Feature rollback, user communication |
| DevOps/Platform | [TBD] | Infrastructure issues, Vercel problems |

---

## Post-Incident Checklist

- [ ] Rollback confirmed working
- [ ] Incident documented
- [ ] Root cause identified
- [ ] Fix implemented and tested locally
- [ ] Fix deployed to preview environment
- [ ] Preview verified working
- [ ] Production redeploy approved
- [ ] Post-deploy monitoring (15 min)

---

## Prevention Measures

### Before Every Deploy

```bash
# Run full quality check
npm run predeploy

# Verify bundle size hasn't regressed
npm run audit:bundle

# Check for TypeScript errors
npm run typecheck
```

### Vercel Preview Deployments

- Every PR gets a preview deployment
- Test critical flows on preview before merge
- Check Lighthouse scores on preview

### Feature Flags (Future)

Consider implementing feature flags for:
- Major UI changes
- New integrations
- Experimental features

---

## Recovery Time Objectives

| Metric | Target |
|--------|--------|
| Time to Detect | < 5 minutes |
| Time to Rollback | < 2 minutes |
| Time to Full Recovery | < 15 minutes |

---

## Version History

| Date | Change |
|------|--------|
| 2026-01-22 | Initial rollback plan created |
