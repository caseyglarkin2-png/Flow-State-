import React from 'react';
import { NextResponse } from 'next/server';
import { getClientIp, isRateLimited } from '@/lib/rateLimit';
import { verifyHCaptcha } from '@/lib/hcaptcha';
import { renderPdfToBuffer } from '@/lib/pdf/render';
import { YardReadinessPdf, type YardbuilderPdfPayload } from '@/lib/pdf/yardbuilderPdf';
import { postWebhook } from '@/lib/webhooks';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

type RequestBody = {
  lead: { name: string; email: string; company: string };
  inputs: {
    company: string;
    facilityCount: number;
    shipmentsPerDay: number;
    gateStyle: string;
    pain: string;
  };
  captchaToken?: string;
};

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (
    isRateLimited(`pdf:yardbuilder:${ip}`, {
      windowMs: 60_000,
      max: 6,
    })
  ) {
    return NextResponse.json({ ok: false, message: 'Too many requests. Try again soon.' }, { status: 429 });
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  if (!body.lead?.name || !body.lead?.email || !body.lead?.company) {
    return NextResponse.json({ ok: false, message: 'Missing lead fields.' }, { status: 400 });
  }

  const captchaOk = await verifyHCaptcha(body.captchaToken);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, message: 'Captcha failed. Please retry.' }, { status: 400 });
  }

  const facilityCount = Math.max(1, Number(body.inputs?.facilityCount ?? 1));
  const shipmentsPerDay = Math.max(0, Number(body.inputs?.shipmentsPerDay ?? 0));

  const preview = {
    annualShipments: shipmentsPerDay * 365 * facilityCount,
    focus:
      body.inputs?.pain === 'detention'
        ? 'Defensible timestamps + exception workflow'
        : body.inputs?.pain === 'gate'
          ? 'Gate control loop + standard check-in/out'
          : body.inputs?.pain === 'labor'
            ? 'Repeatable execution + less manual handling'
            : body.inputs?.pain === 'visibility'
              ? 'Ground-truth yard state (not just dots)'
              : 'Throughput stabilization + fewer surprises',
    nextSteps: [
      'Confirm your current check-in/out flow and exception reasons',
      'Identify one pilot facility with clear ownership',
      'Define the KPI you want to make defensible (dwell, detention, labor, throughput)',
    ],
  };

  const payload: YardbuilderPdfPayload = {
    lead: body.lead,
    inputs: {
      company: body.inputs?.company || body.lead.company,
      facilityCount,
      shipmentsPerDay,
      gateStyle: String(body.inputs?.gateStyle || 'guard'),
      pain: String(body.inputs?.pain || 'detention'),
    },
    preview,
    disclaimer:
      'Modeled guidance based on the provided inputs. This document is not a guarantee of performance. Results vary by facility, adoption, and operating conditions.',
  };

  const pdf = await renderPdfToBuffer(React.createElement(YardReadinessPdf, { payload }));

  const leadTo = process.env.LEADS_TO_EMAIL || 'casey@freightroll.com';
  const subject = `[YardFlow by FreightRoll] YardBuilder report generated for ${payload.inputs.company}`;
  const text = [
    'A YardBuilder PDF was generated.',
    `Company: ${payload.inputs.company}`,
    `Name: ${payload.lead.name}`,
    `Email: ${payload.lead.email}`,
    `Facilities: ${facilityCount}`,
    `Shipments/day: ${shipmentsPerDay}`,
    `Gate style: ${payload.inputs.gateStyle}`,
    `Pain: ${payload.inputs.pain}`,
    `IP: ${ip}`,
  ].join('\n');

  await sendEmail({ to: leadTo, subject, text });
  await postWebhook(process.env.HUBSPOT_WEBHOOK_URL, {
    event: 'pdf_generated_yardbuilder',
    lead: payload.lead,
    inputs: payload.inputs,
    ip,
  });

  const pdfBody = new Uint8Array(pdf);

  return new NextResponse(pdfBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="yardflow-yard-readiness-report.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
