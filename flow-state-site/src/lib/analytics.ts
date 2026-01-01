export async function trackEvent(name: string, properties?: Record<string, unknown>) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, properties }),
      keepalive: true,
    });
  } catch {
    // ignore
  }
}
