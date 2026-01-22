import { NextResponse } from 'next/server';
import { version } from '@/package.json';

/**
 * Health check endpoint for uptime monitoring.
 * 
 * @returns JSON with status, timestamp, and version
 * 
 * @example
 * ```bash
 * curl https://yardflow.ai/api/health
 * # {"status":"ok","timestamp":"2026-01-22T00:00:00.000Z","version":"2.0.0"}
 * ```
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: version || '2.0.0',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
