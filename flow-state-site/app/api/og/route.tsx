import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
            {/* Network logo */}
            <svg
              viewBox="0 0 32 32"
              width="40"
              height="40"
            >
              <circle cx="16" cy="16" r="3" fill="#00B4FF"/>
              <circle cx="8" cy="8" r="2" fill="#00B4FF"/>
              <circle cx="24" cy="8" r="2" fill="#00B4FF"/>
              <circle cx="8" cy="24" r="2" fill="#00B4FF"/>
              <circle cx="24" cy="24" r="2" fill="#00B4FF"/>
              <line x1="16" y1="13" x2="9" y2="9.5" stroke="#00B4FF" strokeWidth="1.5"/>
              <line x1="16" y1="13" x2="23" y2="9.5" stroke="#00B4FF" strokeWidth="1.5"/>
              <line x1="16" y1="19" x2="9" y2="22.5" stroke="#00B4FF" strokeWidth="1.5"/>
              <line x1="16" y1="19" x2="23" y2="22.5" stroke="#00B4FF" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="14.5" stroke="#00B4FF" strokeWidth="1" opacity="0.3"/>
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
                }}
              >
                YardFlow
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: '#64748B',
                  letterSpacing: '0.05em',
                }}
              >
                powered by FreightRoll
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
                }}
              >
                Yard Network System
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
                }}
              >
                One Network.
              </span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#00B4FF',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textShadow: '0 0 60px rgba(0, 180, 255, 0.4)',
                }}
              >
                Total Visibility.
              </span>
            </div>

            {/* Subtitle */}
            <span
              style={{
                fontSize: 24,
                color: '#94A3B8',
                maxWidth: '700px',
                lineHeight: 1.4,
              }}
            >
              Real-time orchestration of assets, intelligence, and security across every yard in your network.
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
                }}
              >
                40%
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Dwell Reduction
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
                }}
              >
                2.3x
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Gate Throughput
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
                }}
              >
                90%
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Faster Investigation
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
                }}
              >
                $1.2M
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Avg Annual Savings
              </span>
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

  // Add cache-busting headers to prevent stale OG images
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}
