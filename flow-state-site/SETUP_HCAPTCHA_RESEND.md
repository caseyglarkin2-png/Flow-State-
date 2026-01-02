# Quick Setup Guide: hCaptcha + Resend

**Goal:** Get forms working with bot protection and email delivery in ~15 minutes.

---

## Step 1: hCaptcha Setup (5 minutes)

### 1.1 Sign up
1. Go to: https://www.hcaptcha.com/
2. Click **"Sign Up"** (top right)
3. Use `casey@freightroll.com` as your account email
4. Verify your email

### 1.2 Create a Site
1. After login, click **"New Site"** button
2. **Site Name:** Flow State Production
3. **Hostnames:** Add these two:
   - `flow-state-klbt.vercel.app`
   - `localhost` (for local development)
4. **Difficulty:** Select "Easy" (balanced security + UX)
5. Click **"Save"**

### 1.3 Get Your Keys
After creating the site, you'll see two keys:

**Copy these exactly:**
- **Sitekey** (starts with a hex string like `a1b2c3d4-...`) → This is PUBLIC
- **Secret Key** (starts with `0x...`) → This is SERVER-ONLY

---

## Step 2: Resend Setup (5 minutes)

### 2.1 Sign up
1. Go to: https://resend.com/
2. Click **"Start Building"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or use `casey@freightroll.com`

### 2.2 Verify Your Domain (OPTIONAL - can skip for now)
If you want emails to come from `@freightroll.com`:
1. Go to **Domains** → **Add Domain**
2. Enter: `freightroll.com`
3. Add the DNS records shown to your domain registrar
4. Wait for verification (~5-10 minutes)

**OR** skip this and use Resend's default `onboarding@resend.dev` sender for testing.

### 2.3 Get Your API Key
1. Go to **API Keys** in the left sidebar
2. Click **"Create API Key"**
3. **Name:** Flow State Production
4. **Permission:** Full Access (for now)
5. Click **"Create"**
6. **Copy the key immediately** (starts with `re_...`) — You won't see it again!

---

## Step 3: Add to Vercel (3 minutes)

### 3.1 Open Vercel Dashboard
1. Go to: https://vercel.com/
2. Find your `flow-state-klbt` project
3. Click on it → **Settings** → **Environment Variables**

### 3.2 Add Variables
Click **"Add New"** for each:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | (paste your hCaptcha sitekey) | Production, Preview, Development |
| `HCAPTCHA_SECRET` | (paste your hCaptcha secret key) | Production only ⚠️ |
| `RESEND_API_KEY` | `re_...` (paste your Resend key) | Production only ⚠️ |
| `LEADS_TO_EMAIL` | `casey@freightroll.com` | Production, Preview, Development |

**Important:**
- `NEXT_PUBLIC_*` variables are visible in the browser (safe for client-side)
- Secret keys should ONLY be in Production environment (not exposed)

### 3.3 Trigger Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** → **Redeploy**
4. Check ✅ **"Use existing Build Cache"**
5. Click **"Redeploy"**

Wait ~2 minutes for deployment to complete.

---

## Step 4: Test It (2 minutes)

### 4.1 Test Contact Form
1. Visit: https://flow-state-klbt.vercel.app/contact
2. Fill out the form with test data
3. **Verify hCaptcha appears** (checkbox or image challenge)
4. Click Submit
5. **Check your email** (`casey@freightroll.com`) for notification

### 4.2 Test ROI PDF
1. Visit: https://flow-state-klbt.vercel.app/roi
2. Adjust inputs (facilities, trucks, etc.)
3. Scroll down → Click **"Board-ready ROI PDF"**
4. Fill out your info in the modal
5. Complete captcha → Submit
6. **PDF should download** + you get an email notification

---

## Local Development Setup

If you want to test locally before pushing:

### Create `.env.local` file:
```bash
cd /workspaces/Flow-State-/flow-state-site
nano .env.local
```

### Paste this (with your real keys):
```env
# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITEKEY=your-sitekey-here
HCAPTCHA_SECRET=your-secret-here

# Resend
RESEND_API_KEY=re_your_key_here

# Email
LEADS_TO_EMAIL=casey@freightroll.com

# Optional
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

Save (Ctrl+O, Enter, Ctrl+X) and restart dev server:
```bash
npm run dev
```

Visit http://localhost:3000/contact and test!

---

## Troubleshooting

### ❌ "Captcha verification failed"
- **Check:** Is `HCAPTCHA_SECRET` set in Vercel **Production** environment?
- **Check:** Did you redeploy after adding the env var?
- **Check:** Are you testing on the correct domain (not a random preview URL)?

### ❌ "Form submission unavailable"
- **Check:** Is `NEXT_PUBLIC_HCAPTCHA_SITEKEY` visible in browser?
  - Open DevTools → Console → Type `process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY`
  - Should show your sitekey (not `undefined`)

### ❌ "Email not arriving"
- **Check:** Is `RESEND_API_KEY` set in Vercel?
- **Check:** Spam folder
- **Check:** Resend dashboard → **Logs** to see delivery status
- **Try:** Use a different email address (Gmail sometimes blocks onboarding@ senders)

### ❌ "Too many requests"
- **Normal:** Rate limiting is working (10 req/min for forms)
- **Solution:** Wait 1 minute and try again

---

## Next Steps (Optional)

### Set up custom domain for emails
Instead of `onboarding@resend.dev`, send from `noreply@freightroll.com`:
1. Verify `freightroll.com` domain in Resend
2. Update email sender in code (or use Resend's default)

### Add HubSpot webhook (if you use HubSpot)
1. Get webhook URL from HubSpot
2. Add to Vercel: `HUBSPOT_WEBHOOK_URL=https://...`
3. Leads will auto-sync to HubSpot CRM

---

## Summary Checklist

- [ ] hCaptcha account created
- [ ] Site added with `flow-state-klbt.vercel.app` hostname
- [ ] Sitekey and Secret copied
- [ ] Resend account created
- [ ] API key created and copied
- [ ] All 4 env vars added to Vercel Production
- [ ] Vercel redeployed
- [ ] Contact form tested (captcha appears)
- [ ] Email received at `casey@freightroll.com`
- [ ] ROI PDF tested (download works)

**Estimated time:** 15-20 minutes total

**Need help?** Email the key values to yourself so you don't lose them!
