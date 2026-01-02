import React from 'react';
import { NextResponse } from 'next/server';
import { getClientIp, isRateLimited } from '@/lib/rateLimit';
import { verifyHCaptcha } from '@/lib/hcaptcha';
import { renderPdfToBuffer } from '@/lib/pdf/render';
import { RoiSummaryPdf, type RoiPdfPayload } from '@/lib/pdf/roiPdf';
import { postWebhook } from '@/lib/webhooks';
import { sendEmail } from '@/lib/email';
import { calcRoiV2 } from '@/lib/roi/calc';
import type { RoiV2Inputs } from '@/lib/roi/types';

export const runtime = 'nodejs';

type RequestBody = {
  lead: { name: string; email: string; company: string };
  inputs: RoiV2Inputs;
  captchaToken?: string;
};

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (
    isRateLimited(`pdf:roi:${ip}`, {
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

  if (!body.inputs) {
    return NextResponse.json({ ok: false, message: 'Missing ROI inputs.' }, { status: 400 });
  }

  const result = calcRoiV2(body.inputs);

  const assumptions = [
    'Modeled savings depend on adoption, operating reality, and baseline process maturity.',
    'Commercial terms reflect per-facility annual subscription plus one-time implementation per facility.',
    'Detention and labor savings are estimates based on provided rates and assumed time reductions.',
  ];

  const payload: RoiPdfPayload = {
    lead: body.lead,
    inputs: body.inputs as unknown as Record<string, unknown>,
    results: {
      totalAnnualSavings: result.totalAnnualSavings,
      baseSavings: result.baseSavings,
      networkBonusSavings: result.networkBonusSavings,
      yearOneRampShare: result.assumptionsUsed?.yearOneRampShare,
      yearOneGrossSavings: result.yearOneGrossSavings,
      yearOneNetGain: result.yearOneNetGain,
      yearOneRoiPercent: result.yearOneRoiPercent,
      paybackMonths: result.paybackMonths,
      fiveYearValue: result.fiveYearValue,
      annualSubscription: result.annualSubscription,
      implementationCost: result.implementationCost,
    },
    assumptions,
    disclaimer:
      'This ROI summary is a modeled estimate based on the inputs provided. It is for planning purposes only and does not guarantee results. Results vary by facility, adoption, and operating conditions.',
  };

  const pdf = await renderPdfToBuffer(React.createElement(RoiSummaryPdf, { payload }));

  const leadTo = process.env.LEADS_TO_EMAIL || 'casey@freightroll.com';
  const subject = `[Flow State] ROI PDF generated — ${body.lead.company}`;
  const text = [
    'An ROI PDF was generated.',
    `Company: ${body.lead.company}`,
    `Name: ${body.lead.name}`,
    `Email: ${body.lead.email}`,
    `Year 1 ROI: ${Math.round(result.yearOneRoiPercent)}%`,
    `Year 1 net gain: $${Math.round(result.yearOneNetGain).toLocaleString()}`,
    `IP: ${ip}`,
  ].join('\n');

  await sendEmail({ to: leadTo, subject, text });
  await postWebhook(process.env.HUBSPOT_WEBHOOK_URL, {
    event: 'pdf_generated_roi',
    lead: body.lead,
    ip,
    results: payload.results,
  });

  const pdfBody = new Uint8Array(pdf);

  return new NextResponse(pdfBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="flow-state-roi-summary.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
