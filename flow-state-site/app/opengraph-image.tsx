import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Flow State - Put your yard in Flow';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // We can load a font here if needed, but for now we'll use system fonts
  // to ensure reliability.
  
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
          backgroundColor: '#050505',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #111 0%, #050505 50%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid overlay effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.2,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: '#00B4FF',
              marginBottom: 0,
              lineHeight: 1,
              textShadow: '0 0 40px rgba(0,180,255,0.5)',
              display: 'flex',
            }}
          >
            Put your yard
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            in Flow.
          </div>
          
          <div
            style={{
              marginTop: 40,
              fontSize: 32,
              color: '#888',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            Orchestrate the yard. Eliminate turbulence.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
