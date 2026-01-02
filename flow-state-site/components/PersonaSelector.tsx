'use client';

import React from 'react';
import { PERSONAS, type Persona } from '@/content/config';
import { usePersonaStore } from '@/store/persona';
import { trackEvent } from '@/lib/analytics';

type Props = {
  className?: string;
};

export default function PersonaSelector({ className }: Props) {
  const persona = usePersonaStore((s) => s.persona);
  const setPersona = usePersonaStore((s) => s.setPersona);

  function onChange(next: Persona | 'none') {
    const normalized = next === 'none' ? null : next;
    setPersona(normalized);
    trackEvent('persona_selected', { persona: normalized });
  }

  return (
    <label className={className}>
      <span className="sr-only">Select persona</span>
      <select
        value={persona ?? 'none'}
        onChange={(e) => onChange(e.target.value as Persona | 'none')}
        className="bg-carbon border border-steel/20 rounded-lg px-3 py-2 text-sm text-white"
      >
        <option value="none">Persona: Auto</option>
        {PERSONAS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </label>
  );
}
