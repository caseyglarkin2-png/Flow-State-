#!/usr/bin/env node
/**
 * Generate static OG image with Inter font (matches site)
 * Uses Satori (same as Next.js OG) for proper font rendering
 * Run: node scripts/generate-og-inter.js
 */

const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function fetchFont(url) {
  const response = await fetch(url);
  return response.arrayBuffer();
}

async function generateOG() {
  console.log('🎨 Generating OG image with Inter font...\n');

  // Fetch Inter font weights (TTF format)
  const [interSemiBold, interBold, interBlack] = await Promise.all([
    fetchFont('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf'),
    fetchFont('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf'),
    fetchFont('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf'),
  ]);

  console.log('  ✅ Inter fonts loaded');

  // JSX-like structure for Satori (simplified, no dangerouslySetInnerHTML)
  const element = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#050505',
        backgroundImage: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
        position: 'relative',
      },
      children: [
        // Neon glow orb - top right (simulated with gradient)
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 180, 255, 0.12) 0%, transparent 70%)',
              borderRadius: '200px',
            },
          },
        },
        // Ember glow orb - bottom left
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '-100px',
              left: '-50px',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(255, 42, 0, 0.08) 0%, transparent 70%)',
              borderRadius: '175px',
            },
          },
        },
        // Main content container
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              padding: '60px 70px',
            },
            children: [
              // Top section - Logo
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  },
                  children: [
                    // Logo mark (simplified circles)
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        },
                        children: [
                          // Outer ring
                          {
                            type: 'div',
                            props: {
                              style: {
                                position: 'absolute',
                                width: '36px',
                                height: '36px',
                                border: '2px solid rgba(0, 180, 255, 0.35)',
                                borderRadius: '18px',
                              },
                            },
                          },
                          // Center dot
                          {
                            type: 'div',
                            props: {
                              style: {
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#00B4FF',
                                borderRadius: '5px',
                              },
                            },
                          },
                        ],
                      },
                    },
                    // Wordmark
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: 28,
                                fontWeight: 700,
                                color: '#FFFFFF',
                                lineHeight: 1.1,
                                fontFamily: 'Inter',
                              },
                              children: 'YardFlow',
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: 13,
                                color: '#64748B',
                                letterSpacing: '0.03em',
                                fontFamily: 'Inter',
                                fontWeight: 600,
                              },
                              children: 'by FreightRoll',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              // Middle section - Main message
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  },
                  children: [
                    // Eyebrow with accent line
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                width: '28px',
                                height: '2px',
                                backgroundColor: '#00B4FF',
                              },
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#00B4FF',
                                letterSpacing: '0.18em',
                                fontFamily: 'Inter',
                              },
                              children: 'YARD NETWORK SYSTEM',
                            },
                          },
                        ],
                      },
                    },
                    // Headlines
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: 58,
                                fontWeight: 800,
                                color: '#FFFFFF',
                                lineHeight: 1.05,
                                fontFamily: 'Inter',
                                letterSpacing: '-0.02em',
                              },
                              children: 'Standardize the Yard.',
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: 58,
                                fontWeight: 800,
                                color: '#00B4FF',
                                lineHeight: 1.05,
                                fontFamily: 'Inter',
                                letterSpacing: '-0.02em',
                              },
                              children: 'Kill Variance.',
                            },
                          },
                        ],
                      },
                    },
                    // Subtitle
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: 20,
                          color: '#94A3B8',
                          lineHeight: 1.5,
                          fontFamily: 'Inter',
                          fontWeight: 400,
                          maxWidth: '750px',
                        },
                        children: "Stop the Variance Tax. YardFlow standardizes the gate + yard into a deterministic protocol—reducing viscosity and turning chaos into controllable flow.",
                      },
                    },
                  ],
                },
              },
              // Bottom row - tagline and URL
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#00B4FF',
                          letterSpacing: '0.06em',
                          fontFamily: 'Inter',
                        },
                        children: 'Industrial Fluidity.',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: 15,
                          color: '#64748B',
                          fontFamily: 'Inter',
                          fontWeight: 600,
                        },
                        children: 'yardflow.ai',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  // Generate SVG with Satori
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: interSemiBold,
        weight: 600,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: interBold,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: interBlack,
        weight: 800,
        style: 'normal',
      },
    ],
  });

  console.log('  ✅ SVG generated with Satori');

  // Convert SVG to PNG with Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(path.join(PUBLIC_DIR, 'og.png'), pngBuffer);
  
  const stats = fs.statSync(path.join(PUBLIC_DIR, 'og.png'));
  console.log(`  ✅ og.png saved (1200x630, ${Math.round(stats.size / 1024)}KB)`);

  console.log('\n✨ OG image generated with Inter font!');
}

generateOG().catch(console.error);
