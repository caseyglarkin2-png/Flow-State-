import { ImageResponse } from 'next/og';
import { getActiveLogo, SITE_METADATA } from '@/lib/branding';

export const runtime = 'edge';

export async function GET() {
  // Load Inter font for proper branding
  const interSemiBold = fetch(
    new URL('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interBold = fetch(
    new URL('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interBlack = fetch(
    new URL('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff', import.meta.url)
  ).then((res) => res.arrayBuffer());

  // Get the active logo (micro version for OG)
  const logoMark = getActiveLogo(20);

  const response = new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505',
          padding: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 180, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 180, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Neon glow orb - top right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 180, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        
        {/* Ember glow orb - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(255, 42, 0, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '60px 70px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top section - Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {/* Active logo from branding.ts */}
            <svg
              viewBox="0 0 32 32"
              width="40"
              height="40"
              fill="none"
              stroke="#00B4FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g dangerouslySetInnerHTML={{ __html: logoMark.svg }} />
            </svg>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  fontFamily: 'Inter',
                }}
              >
                YardFlow
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: '#64748B',
                  letterSpacing: '0.05em',
                  fontFamily: 'Inter',
                }}
              >
                {SITE_METADATA.originLine}
              </span>
            </div>
          </div>

          {/* Middle section - Main message */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  background: '#00B4FF',
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: '#00B4FF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                }}
              >
                {SITE_METADATA.tagline.replace('.', '').toUpperCase()}
              </span>
            </div>

            {/* Main headline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  fontFamily: 'Inter',
                }}
              >
                Variance Is The Villain.
              </span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#00B4FF',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textShadow: '0 0 60px rgba(0, 180, 255, 0.4)',
                  fontFamily: 'Inter',
                }}
              >
                Control Is The Hero.
              </span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#00B4FF',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textShadow: '0 0 60px rgba(0, 180, 255, 0.4)',
                  fontFamily: 'Inter',
                }}
              >
                Control Is The Hero.
              </span>
            </div>

            {/* Subtitle */}
            <span
              style={{
                fontSize: 24,
                color: '#94A3B8',
                maxWidth: '700px',
                lineHeight: 1.4,
                fontFamily: 'Inter',
              }}
            >
              {SITE_METADATA.ogDescription}
            </span>
          </div>

          {/* Bottom section - Stats bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              paddingTop: '30px',
              borderTop: '1px solid rgba(0, 180, 255, 0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                }}
              >
                50%
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'Inter',
                }}
              >
                Turn Time Reduction
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                }}
              >
                2x
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'Inter',
                }}
              >
                Synthetic Capacity
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                }}
              >
                Zero
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'Inter',
                }}
              >
                Ghost Count
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#00B4FF',
                  fontFamily: 'Inter',
                }}
              >
                $120K
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'Inter',
                }}
              >
                Gate Labor Eliminated
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await interBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await interBlack,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );

  // Add cache-busting headers to prevent stale OG images
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}
