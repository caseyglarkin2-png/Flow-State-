import { ImageResponse } from 'next/og';
import { getActiveLogo, SITE_METADATA } from '@/lib/branding';

export const runtime = 'edge';

export async function GET() {
  const logo = getActiveLogo();
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0E14',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 180, 255, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 180, 255, 0.08) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Logo Icon */}
        <svg
          viewBox="0 0 32 32"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '40px',
            fill: 'none',
            stroke: '#00FFA3',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
          dangerouslySetInnerHTML={{ __html: logo.svg }}
        />

        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          YardFlow
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#8B95A5',
            marginBottom: '48px',
          }}
        >
          powered by FreightRoll
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 700,
            color: '#00B4FF',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
            marginBottom: '24px',
          }}
        >
          {SITE_METADATA.tagline}
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#8B95A5',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.5,
          }}
        >
          You don't have 50 yards. You have one yard network.<br/>
          Stop the leak.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
