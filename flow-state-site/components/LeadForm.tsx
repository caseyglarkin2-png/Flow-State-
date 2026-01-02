'use client';

import React, { useMemo, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { trackEvent } from '@/lib/analytics';
import { usePersonaStore } from '@/store/persona';

type LeadType = 'quote' | 'founding' | 'demo';

type LeadFormProps = {
  leadType: LeadType;
  title: string;
  subtitle?: string;
};

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  facilityCount: string;
  message: string;
  website: string; // honeypot
};

const initialState: LeadFormState = {
  name: '',
  email: '',
  company: '',
  role: '',
  facilityCount: '',
  message: '',
  website: '',
};

export default function LeadForm({ leadType, title, subtitle }: LeadFormProps) {
  const [state, setState] = useState<LeadFormState>(initialState);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const persona = usePersonaStore((s) => s.persona);

  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? '';
  const canUseCaptcha = Boolean(hcaptchaSiteKey);

  const disabledReason = useMemo(() => {
    if (submitting) return 'Submitting…';
    if (!state.name || !state.email || !state.company) return 'Fill required fields';
    if (!captchaToken && canUseCaptcha) return 'Complete captcha';
    if (!canUseCaptcha && process.env.NODE_ENV === 'production') return 'Captcha not configured';
    return '';
  }, [submitting, state.name, state.email, state.company, captchaToken, canUseCaptcha]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType,
          ...state,
          captchaToken,
        }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setResult({ ok: false, message: data.message || 'Something went wrong. Try again.' });
        return;
      }

      setResult({ ok: true, message: 'Submitted. We’ll reach out shortly.' });

      if (leadType === 'quote') trackEvent('quote_requested', { persona });
      if (leadType === 'demo') trackEvent('demo_booked', { persona, source: 'lead_form' });

      setState(initialState);
      setCaptchaToken('');
    } catch {
      setResult({ ok: false, message: 'Network error. Try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label={title}>
      <div>
        <h2 className="text-2xl font-bold text-neon mb-1">{title}</h2>
        {subtitle ? <p className="text-sm text-steel/80">{subtitle}</p> : null}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            value={state.website}
            onChange={(e) => setState((s) => ({ ...s, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-steel" htmlFor="lead-name">
            Name <span className="text-ember">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-steel" htmlFor="lead-email">
            Work email <span className="text-ember">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-steel" htmlFor="lead-company">
            Company <span className="text-ember">*</span>
          </label>
          <input
            id="lead-company"
            type="text"
            required
            value={state.company}
            onChange={(e) => setState((s) => ({ ...s, company: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-steel" htmlFor="lead-role">
            Role
          </label>
          <input
            id="lead-role"
            type="text"
            value={state.role}
            onChange={(e) => setState((s) => ({ ...s, role: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-steel" htmlFor="lead-facilities">
            Facilities in your network
          </label>
          <input
            id="lead-facilities"
            type="number"
            min={0}
            step={1}
            value={state.facilityCount}
            onChange={(e) => setState((s) => ({ ...s, facilityCount: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-steel" htmlFor="lead-message">
          Message
        </label>
        <textarea
          id="lead-message"
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          rows={4}
          className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
        />
      </div>

      {canUseCaptcha ? (
        <div>
          <HCaptcha
            sitekey={hcaptchaSiteKey}
            onVerify={(token: string) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken('')}
          />
        </div>
      ) : (
        <div className="p-4 border border-steel/20 rounded-lg bg-carbon/30">
          <p className="text-sm text-steel mb-2">
            Form submission is temporarily unavailable.
          </p>
          <p className="text-xs text-steel/70">
            Please email us directly at{' '}
            <a href="mailto:casey@freightroll.com" className="text-neon hover:underline font-semibold">
              casey@freightroll.com
            </a>
          </p>
        </div>
      )}

      {result ? (
        <p className={`text-sm ${result.ok ? 'text-neon' : 'text-ember'}`} role="status">
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={Boolean(disabledReason)}
        className="w-full px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabledReason || 'Submit'}
      </button>

      <p className="text-xs text-steel/70">
        By submitting, you agree we can contact you about Flow State.
      </p>
    </form>
  );
}
