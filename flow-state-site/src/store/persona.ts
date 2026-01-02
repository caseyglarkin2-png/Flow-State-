import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Persona } from '@/content/config';

type PersonaState = {
  persona: Persona | null;
  setPersona: (persona: Persona | null) => void;
};

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set) => ({
      persona: null,
      setPersona: (persona) => set({ persona }),
    }),
    {
      name: 'flowstate_persona',
      version: 1,
    },
  ),
);
