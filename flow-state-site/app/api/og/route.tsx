import { ImageResponse } from 'next/og';
import { getActiveLogo, SITE_METADATA } from '@/lib/branding';

export const runtime = 'edge';

// A/B Test Variants for OG headlines
const OG_VARIANTS: Record<string, { headline1: string; headline2: string; subtitle: string }> = {
  a: {
    headline1: 'Variance Is The Villain.',
    headline2: 'Control Is The Hero.',
    subtitle: 'The first yard network system that makes every facility operate like your best.',
  },
  b: {
    headline1: 'Stop The Variance Tax.',
    headline2: 'Build Your Yard Network.',
    subtitle: 'Standardize operations across all facilities. Reduce detention 50%.',
  },
  c: {
    headline1: '50% Faster Turns.',
    headline2: 'Network Effect Scaling.',
    subtitle: '200K+ drivers. 58 facilities. Same protocol everywhere.',
  },
};

// Map of page-specific content
const PAGE_CONTENT: Record<string, { headline?: string; subtitle?: string; tagline?: string }> = {
  'solutions/dry-van': {
    headline: 'Standardize Dry Van Operations',
    subtitle: 'Eliminate detention variance and unlock network scaling for your dry fleet.',
    tagline: 'Variance Elimination.'
  },
  'solutions/reefer': {
    headline: 'Control Reefer Temperature Variance',
    subtitle: 'Real-time temperature monitoring and automated route optimization for perishables.',
    tagline: 'Cold Chain Control.'
  },
  'solutions/flatbed': {
    headline: 'Optimize Flatbed Load Coordination',
    subtitle: 'Reduce load variance and improve equipment utilization across your flatbed operation.',
    tagline: 'Load Optimization.'
  },
  'solutions/dedicated': {
    headline: 'Lock Dedicated Fleet Economics',
    subtitle: 'Eliminate variance in dedicated operations with standardized protocols and real-time coordination.',
    tagline: 'Fleet Control.'
  },
  'solutions/intermodal': {
    headline: 'Standardize Intermodal Coordination',
    subtitle: 'Reduce handoff variance and improve efficiency across modal transitions.',
    tagline: 'Intermodal Excellence.'
  },
  'guide/cargo-theft-prevention': {
    headline: 'Prevent Cargo Theft',
    subtitle: 'Comprehensive security protocols and real-time monitoring to protect high-value loads.',
    tagline: 'Security First.'
  },
  'guide/network-effect-yard-automation': {
    headline: 'Unlock Network Effect ROI',
    subtitle: 'How Metcalfe\'s Law applies to logistics yards and drives exponential value creation.',
    tagline: 'Network Scaling.'
  },
  'guide/ctpat-tsa-compliance': {
    headline: 'Achieve CTPAT Compliance',
    subtitle: 'Automated security compliance and TSA requirements management for regulated operations.',
    tagline: 'Compliance Ready.'
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageKey = searchParams.get('page') || 'default';
  const customTitle = searchParams.get('title');
  const customSubtitle = searchParams.get('subtitle');
  const variant = searchParams.get('variant') as 'a' | 'b' | 'c' | null;
  const pageContent = PAGE_CONTENT[pageKey];
  const variantContent = variant ? OG_VARIANTS[variant] : null;

  // Use custom params if provided, otherwise fall back to page content
  const displayTitle = customTitle || pageContent?.headline;
  const displaySubtitle = customSubtitle || pageContent?.subtitle;

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
                {(pageContent?.tagline || SITE_METADATA.tagline).replace('.', '').toUpperCase()}
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
              {variantContent ? (
                // A/B test variant headline (dual line)
                <>
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
                    {variantContent.headline1}
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
                    {variantContent.headline2}
                  </span>
                </>
              ) : displayTitle ? (
                // Custom or page-specific headline (single line)
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
                  {displayTitle}
                </span>
              ) : (
                // Default headline (dual line)
                <>
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
                </>
              )}
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
              {displaySubtitle || SITE_METADATA.ogDescription}
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
