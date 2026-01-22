import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing handler
vi.mock('../../hcaptcha', () => ({
  verifyHCaptcha: vi.fn().mockResolvedValue(true),
}));

vi.mock('../../rateLimit', () => ({
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
  isRateLimited: vi.fn().mockReturnValue(false),
}));

vi.mock('../../email', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../webhooks', () => ({
  postWebhook: vi.fn().mockResolvedValue(undefined),
}));

import { handleLeadPost } from '../leadHandler';
import { postWebhook } from '../../webhooks';
import { sendEmail } from '../../email';

function createMockRequest(body: unknown): Request {
  return new Request('http://localhost/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('leadHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('accepts basic lead payload', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
    });

    const res = await handleLeadPost(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
  });

  it('accepts industry field in payload', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      industry: '3pl',
    });

    const res = await handleLeadPost(req);
    expect(res.status).toBe(200);

    // Verify webhook received industry
    expect(postWebhook).toHaveBeenCalledWith(
      undefined, // HUBSPOT_WEBHOOK_URL not set in test
      expect.objectContaining({
        industry: '3pl',
      })
    );
  });

  it('accepts timeline field in payload', async () => {
    const req = createMockRequest({
      leadType: 'demo',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      timeline: 'this-quarter',
    });

    const res = await handleLeadPost(req);
    expect(res.status).toBe(200);

    // Verify webhook received timeline
    expect(postWebhook).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        timeline: 'this-quarter',
      })
    );
  });

  it('includes industry and timeline in email text', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      industry: 'manufacturing',
      timeline: 'next-quarter',
    });

    await handleLeadPost(req);

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining('Industry: manufacturing'),
      })
    );
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining('Timeline: next-quarter'),
      })
    );
  });

  it('rejects requests missing required fields', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      // missing email and company
    });

    const res = await handleLeadPost(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.message).toBe('Missing required fields.');
  });

  it('accepts utm object in payload and forwards to webhook', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      utm: {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'spring_2026',
      },
    });

    const res = await handleLeadPost(req);
    expect(res.status).toBe(200);

    // Verify webhook received utm
    expect(postWebhook).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        utm: {
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: 'spring_2026',
        },
      })
    );
  });

  it('includes utm in email text', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      utm: {
        utm_source: 'linkedin',
        utm_medium: 'social',
      },
    });

    await handleLeadPost(req);

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining('UTM Source: linkedin'),
      })
    );
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining('UTM Medium: social'),
      })
    );
  });

  it('silently accepts honeypot submissions', async () => {
    const req = createMockRequest({
      leadType: 'quote',
      name: 'Bot User',
      email: 'bot@spam.com',
      company: 'Spam Corp',
      website: 'http://spam.com', // honeypot filled = bot
    });

    const res = await handleLeadPost(req);
    const data = await res.json();

    // Returns success but doesn't send email/webhook
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(sendEmail).not.toHaveBeenCalled();
    expect(postWebhook).not.toHaveBeenCalled();
  });
});
