import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 255, 163, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 255, 163, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#00FFA3" strokeWidth="1.5" opacity="0.3" />
            <path d="M8 12h8M12 8v8" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="#00FFA3" opacity="0.4" />
          </svg>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '24px',
          }}
        >
          YARDFLOW
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#8B95A5',
            marginBottom: '48px',
          }}
        >
          by FreightRoll
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#00FFA3',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Yard Network System (YNS)
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#8B95A5',
            textAlign: 'center',
            maxWidth: '900px',
            marginTop: '24px',
            lineHeight: 1.5,
          }}
        >
          You don't have 50 yards. You have one yard network. Orchestrating assets, intelligence, and security across your entire network.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
