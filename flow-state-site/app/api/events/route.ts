import { NextResponse } from 'next/server';

type EventPayload = {
  name: string;
  properties?: Record<string, unknown>;
};

export async function POST(req: Request) {
  let payload: EventPayload;
  try {
    payload = (await req.json()) as EventPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload?.name) return NextResponse.json({ ok: false }, { status: 400 });

  const webhookUrl = process.env.EVENTS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: payload.name,
          properties: payload.properties ?? {},
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
