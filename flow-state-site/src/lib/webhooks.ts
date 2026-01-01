type WebhookEvent = {
  event: string;
  [key: string]: unknown;
};

export async function postWebhook(url: string | undefined, payload: WebhookEvent): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
  } catch {
    // ignore
  }
}
