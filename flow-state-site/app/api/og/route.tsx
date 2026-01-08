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
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 255, 163, 0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 255, 163, 0.03) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px',
        }}
      >
        {/* Top Label */}
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            color: '#FF5757',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontFamily: 'monospace',
            marginBottom: '30px',
          }}
        >
          THE SILO TRAP
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            You don't have 50 yards.
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: '30px',
            }}
          >
            You have one yard network.
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 900,
              color: '#00FFA3',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              textAlign: 'center',
              textShadow: '0 0 40px rgba(0, 255, 163, 0.5)',
            }}
          >
            But your software treats them like islands.
          </div>
        </div>

        {/* Subheading */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            marginBottom: '40px',
          }}
        >
          YardFlow is a <span style={{ color: '#00FFA3', fontWeight: 600 }}>Yard Network System (YNS)</span>: orchestrating assets, intelligence, and security across your entire network.
        </div>

        {/* Footer Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '20px',
          }}
        >
          <svg
            viewBox="0 0 32 32"
            style={{
              width: '32px',
              height: '32px',
              fill: 'none',
              stroke: '#00FFA3',
              strokeWidth: '1.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            dangerouslySetInnerHTML={{ __html: logo.svg }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              YardFlow
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#64748B',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              powered by FreightRoll
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
