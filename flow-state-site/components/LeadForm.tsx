'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { trackEvent } from '@/lib/analytics';
import { usePersonaStore } from '@/store/persona';
import { captureUtmParams, getStoredUtm, type UtmParams } from '@/lib/utm';

/** Type of lead for qualification routing */
type LeadType = 'quote' | 'founding' | 'demo';

/**
 * Props for the LeadForm component.
 */
type LeadFormProps = {
  /** Type of lead: affects routing and follow-up */
  leadType: LeadType;
  /** Form heading displayed above fields */
  title: string;
  /** Optional subheading with additional context */
  subtitle?: string;
};

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  facilityCount: string;
  industry: string;
  timeline: string;
  message: string;
  website: string; // honeypot
};

const INDUSTRY_OPTIONS = [
  { value: '', label: 'Select industry…' },
  { value: '3pl', label: '3PL / Logistics' },
  { value: 'retail', label: 'Retail / Distribution' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'food-bev', label: 'Food & Beverage' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'other', label: 'Other' },
] as const;

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select timeline…' },
  { value: 'this-quarter', label: 'This Quarter' },
  { value: 'next-quarter', label: 'Next Quarter' },
  { value: 'this-year', label: 'This Year' },
  { value: 'evaluating', label: 'Just Evaluating' },
] as const;

const initialState: LeadFormState = {
  name: '',
  email: '',
  company: '',
  role: '',
  facilityCount: '',
  industry: '',
  timeline: '',
  message: '',
  website: '',
};

/**
 * Lead capture form with qualification fields.
 * 
 * Features:
 * - Industry and timeline dropdowns for lead scoring
 * - UTM parameter capture for attribution
 * - Honeypot spam protection
 * - HubSpot webhook integration
 * - Accessible form with ARIA labels
 * 
 * @example
 * ```tsx
 * <LeadForm 
 *   leadType="quote" 
 *   title="Request a Quote" 
 *   subtitle="Get pricing for your network"
 * />
 * ```
 */
export default function LeadForm({ leadType, title, subtitle }: LeadFormProps) {
  const [state, setState] = useState<LeadFormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [utm, setUtm] = useState<UtmParams | null>(null);

  const persona = usePersonaStore((s) => s.persona);

  // Capture UTM params on mount
  useEffect(() => {
    captureUtmParams();
    setUtm(getStoredUtm());
  }, []);

  const disabledReason = useMemo(() => {
    if (submitting) return 'Submitting…';
    if (!state.name || !state.email || !state.company) return 'Fill required fields';
    return '';
  }, [submitting, state.name, state.email, state.company]);

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
          utm: utm || undefined,
          
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

        <div>
          <label className="text-sm text-steel" htmlFor="lead-industry">
            Industry
          </label>
          <select
            id="lead-industry"
            value={state.industry}
            onChange={(e) => setState((s) => ({ ...s, industry: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-steel" htmlFor="lead-timeline">
            Timeline
          </label>
          <select
            id="lead-timeline"
            value={state.timeline}
            onChange={(e) => setState((s) => ({ ...s, timeline: e.target.value }))}
            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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



      {result ? (
        <p 
          className={`text-sm ${result.ok ? 'text-neon' : 'text-ember'}`} 
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {result.message}
        </p>
      ) : null}

      {/* Screen reader announcements for form errors */}
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {disabledReason && disabledReason !== 'Submitting…' && !result && (
          <span>{disabledReason}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={Boolean(disabledReason)}
        className="w-full px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabledReason || 'Submit'}
      </button>

      <p className="text-xs text-steel/70">
        By submitting, you agree we can contact you about YardFlow by FreightRoll.
      </p>
    </form>
  );
}
