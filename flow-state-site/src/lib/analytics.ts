type PersistedEnvelope<TState> = {
  state?: TState;
  version?: number;
};

function readPersistedState<TState>(key: string): TState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedEnvelope<TState>;
    return (parsed?.state ?? null) as TState | null;
  } catch {
    return null;
  }
}

function getDefaultEventContext(): Record<string, unknown> {
  if (typeof window === 'undefined') return {};

  const personaState = readPersistedState<{ persona: unknown }>('flowstate_persona');
  const laneState = readPersistedState<{ lane: unknown }>('flowstate_lane');

  return {
    persona: personaState?.persona ?? null,
    lane: laneState?.lane ?? null,
    path: window.location.pathname,
    url: window.location.href,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  };
}

export async function trackEvent(name: string, properties?: Record<string, unknown>) {
  // Events are client-only (we attach browser context + send relative fetch).
  if (typeof window === 'undefined') return;

  try {
    const mergedProperties = {
      ...getDefaultEventContext(),
      ...(properties ?? {}),
    };

    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, properties: mergedProperties }),
      keepalive: true,
    });
  } catch {
    // ignore
  }
}
