'use client';

import React, { useMemo, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { analytics } from '@/lib/analytics';
import { trackEvent } from '@/lib/analytics';

type Props = {
  title?: string;
  subtitle?: string;
  endpoint: '/api/pdf/roi' | '/api/pdf/yardbuilder';
  emailEndpoint?: '/api/email/roi';
  buildPayload: (lead: { name: string; email: string; company: string }) => unknown;
  eventName:
    | 'roi_export_pdf'
    | 'roi_pdf_exported'
    | 'roi_email_to_finance'
    | 'pdf_generated_roi'
    | 'pdf_generated_yardbuilder';
};

export default function BoardReadyExportCTA({
  title = 'Board-ready export',
  subtitle = 'Generate a clean PDF you can forward internally. Modeled estimates; results vary.',
  endpoint,
  emailEndpoint,
  buildPayload,
  eventName,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>('');

  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? '';
  const canUseCaptcha = Boolean(hcaptchaSiteKey);

  const disabledReason = useMemo(() => {
    if (busy) return 'Generating…';
    if (!name || !email || !company) return 'Fill required fields';
    if (!captchaToken && canUseCaptcha) return 'Complete captcha';
    return '';
  }, [busy, name, email, company, captchaToken, canUseCaptcha]);

  const emailDisabledReason = useMemo(() => {
    if (!emailEndpoint) return 'Email not available';
    if (busy) return 'Sending…';
    if (!name || !email || !company) return 'Fill required fields';
    if (!toEmail) return 'Add finance email';
    if (!captchaToken && canUseCaptcha) return 'Complete captcha';
    return '';
  }, [emailEndpoint, busy, name, email, company, toEmail, captchaToken, canUseCaptcha]);

  async function generate() {
    if (disabledReason) return;
    setMsg('');
    setBusy(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(buildPayload({ name, email, company }) as object),
          captchaToken,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setMsg(data.message || 'Failed to generate PDF.');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = endpoint === '/api/pdf/roi' ? 'yardflow-roi-summary.pdf' : 'yardflow-yard-readiness-report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // Track analytics
      if (endpoint === '/api/pdf/roi') {
        analytics.generateROIPDF({ company });
      } else {
        analytics.generateYardBuilderPDF({ company });
      }

      trackEvent(eventName, { endpoint });
      // PASS5 instrumentation (kept alongside legacy eventName for backwards compatibility)
      if (endpoint === '/api/pdf/roi') trackEvent('roi_pdf_exported', { endpoint });
      setMsg('Generated. Check your downloads.');
    } catch {
      setMsg('Network error. Try again.');
    } finally {
      setBusy(false);
    }
  }

  async function emailToFinance() {
    if (emailDisabledReason) return;
    setMsg('');
    setBusy(true);
    try {
      const res = await fetch(emailEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(buildPayload({ name, email, company }) as object),
          toEmail,
          captchaToken,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setMsg(data.message || 'Failed to email PDF.');
        return;
      }

      trackEvent('roi_email_to_finance', { endpoint: emailEndpoint });
      setMsg('Emailed. Check with finance/procurement.');
    } catch {
      setMsg('Network error. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-neon/15 bg-carbon/40 p-6">
      <h3 className="text-xl font-bold text-neon">{title}</h3>
      <p className="text-sm text-steel/80 mt-2">{subtitle}</p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          type="email"
          className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
        />
      </div>

      {emailEndpoint ? (
        <div className="mt-3">
          <input
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            placeholder="Finance/procurement email (optional)"
            type="email"
            className="w-full bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>
      ) : null}

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={generate}
          disabled={Boolean(disabledReason)}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabledReason || 'Export PDF'}
        </button>

        {emailEndpoint ? (
          <button
            type="button"
            onClick={emailToFinance}
            disabled={Boolean(emailDisabledReason)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailDisabledReason || 'Email to finance'}
          </button>
        ) : (
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
        >
          Send to finance / procurement
        </a>
        )}
      </div>

      {canUseCaptcha && (
        <div className="mt-4">
          <HCaptcha
            sitekey={hcaptchaSiteKey}
            onVerify={(token: string) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken('')}
          />
        </div>
      )}

      {msg ? <p className="mt-3 text-xs text-steel/80" role="status">{msg}</p> : null}
    </div>
  );
}
