import { NextResponse } from 'next/server';
import { verifyHCaptcha } from '@/lib/hcaptcha';
import { getClientIp, isRateLimited } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/email';
import { postWebhook } from '@/lib/webhooks';

type LeadPayload = {
  leadType: 'quote' | 'founding' | 'demo' | 'roi_pdf' | 'yardbuilder_pdf';
  name: string;
  email: string;
  company: string;
  role?: string;
  facilityCount?: string;
  message?: string;
  website?: string; // honeypot
  captchaToken?: string;
  meta?: Record<string, unknown>;
};

export async function handleLeadPost(req: Request) {
  const ip = getClientIp(req);
  if (
    isRateLimited(`lead:${ip}`, {
      windowMs: 60_000,
      max: 10,
    })
  ) {
    return NextResponse.json({ ok: false, message: 'Too many requests. Try again soon.' }, { status: 429 });
  }

  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!payload.name || !payload.email || !payload.company) {
    return NextResponse.json({ ok: false, message: 'Missing required fields.' }, { status: 400 });
  }

  const captchaOk = await verifyHCaptcha(payload.captchaToken);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, message: 'Captcha failed. Please retry.' }, { status: 400 });
  }

  const leadTo = process.env.LEADS_TO_EMAIL || 'founding@flow-state.ai';

  const subject = `[Flow State] ${payload.leadType.toUpperCase()} lead — ${payload.company}`;
  const text = [
    `Lead Type: ${payload.leadType}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    payload.role ? `Role: ${payload.role}` : null,
    payload.facilityCount ? `Facility Count: ${payload.facilityCount}` : null,
    payload.message ? `Message: ${payload.message}` : null,
    payload.meta ? `Meta: ${JSON.stringify(payload.meta)}` : null,
    `IP: ${ip}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await sendEmail({ to: leadTo, subject, text });
  } catch {
    // ignore
  }

  await postWebhook(process.env.HUBSPOT_WEBHOOK_URL, {
    event: 'lead',
    leadType: payload.leadType,
    name: payload.name,
    email: payload.email,
    company: payload.company,
    role: payload.role,
    facilityCount: payload.facilityCount ? Number(payload.facilityCount) : undefined,
    message: payload.message,
    ip,
    meta: payload.meta,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
