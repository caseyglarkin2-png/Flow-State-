'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { NEXT_STEPS, PERSONAS, type Persona } from '@/content/config';
import { usePersonaStore } from '@/store/persona';
import { trackEvent } from '@/lib/analytics';

type Props = {
  title?: string;
  className?: string;
  personaOverride?: Persona;
};

export default function NextSteps({ title = 'Next best step', className, personaOverride }: Props) {
  const persona = usePersonaStore((s) => s.persona);
  const setPersona = usePersonaStore((s) => s.setPersona);

  const effectivePersona = personaOverride ?? persona;

  const steps = useMemo(() => {
    if (!effectivePersona) return null;
    return NEXT_STEPS[effectivePersona];
  }, [effectivePersona]);

  return (
    <section className={className ?? ''} aria-label="Next steps">
      <div className="rounded-2xl border border-neon/20 bg-carbon/40 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">{title}</h3>
            <p className="text-sm text-steel mt-1">
              {effectivePersona
                ? `Guided path for ${PERSONAS.find((p) => p.id === effectivePersona)?.label ?? effectivePersona}.`
                : 'Choose a path so the site routes you.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PERSONAS.map((p) => {
              const active = effectivePersona === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPersona(p.id);
                    trackEvent('persona_selected', { persona: p.id, source: 'next_steps' });
                  }}
                  className={
                    active
                      ? 'px-3 py-2 rounded-lg bg-neon text-void font-semibold'
                      : 'px-3 py-2 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors'
                  }
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {steps ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neon/15 bg-void/20 p-5">
              <div className="text-xs uppercase tracking-wide text-steel">Primary</div>
              <Link
                href={steps.primary.href}
                onClick={() => trackEvent('next_step_clicked', { persona: effectivePersona, kind: 'primary', href: steps.primary.href })}
                className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                {steps.primary.label}
              </Link>
            </div>

            <div className="rounded-xl border border-neon/15 bg-void/20 p-5">
              <div className="text-xs uppercase tracking-wide text-steel">Secondary</div>
              <Link
                href={steps.secondary.href}
                onClick={() => trackEvent('next_step_clicked', { persona: effectivePersona, kind: 'secondary', href: steps.secondary.href })}
                className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                {steps.secondary.label}
              </Link>

              <div className="mt-4 flex flex-col gap-2">
                {steps.extras.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    onClick={() => trackEvent('next_step_clicked', { persona: effectivePersona, kind: 'extra', href: x.href })}
                    className="text-sm text-neon hover:underline"
                  >
                    {x.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-steel">Select a persona above to get a tailored path.</p>
        )}
      </div>
    </section>
  );
}
