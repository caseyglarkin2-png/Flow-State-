import { LOGO_VARIANTS, type LogoVariant, getActiveVariant } from '@/lib/branding';

export default function LogoPreview() {
  const activeVariant = getActiveVariant();
  const variants = Object.entries(LOGO_VARIANTS) as Array<[LogoVariant, { svg: string; description: string }]>;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E14',
      color: '#E5E9F0',
      padding: '4rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #00FFA3 0%, #00D4AA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          YardFlow Logo Variants
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94A3B8', marginBottom: '3rem' }}>
          Current active: <code style={{ color: '#00FFA3', background: 'rgba(0, 0, 0, 0.3)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>{activeVariant}</code>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {variants.map(([key, variant]) => (
            <div
              key={key}
              style={{
                background: key === activeVariant ? 'rgba(0, 255, 163, 0.08)' : 'linear-gradient(135deg, rgba(0, 255, 163, 0.05) 0%, rgba(0, 212, 170, 0.05) 100%)',
                border: key === activeVariant ? '1px solid rgba(0, 255, 163, 0.8)' : '1px solid rgba(0, 255, 163, 0.2)',
                borderRadius: '1rem',
                padding: '2rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '0.5rem',
                padding: '2rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px'
              }}>
                <svg
                  viewBox="0 0 32 32"
                  style={{
                    width: '120px',
                    height: '120px',
                    fill: 'none',
                    stroke: '#00FFA3',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round'
                  }}
                  dangerouslySetInnerHTML={{ __html: variant.svg }}
                />
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#00FFA3',
                marginBottom: '0.5rem',
                textTransform: 'capitalize'
              }}>
                {key}
              </h3>

              <p style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontFamily: 'monospace',
                marginBottom: '1rem'
              }}>
                variant: &quot;{key}&quot;
              </p>

              <p style={{
                fontSize: '1rem',
                color: '#94A3B8',
                lineHeight: '1.6'
              }}>
                {variant.description}
              </p>

              {key === activeVariant && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(0, 255, 163, 0.1)',
                  border: '1px solid rgba(0, 255, 163, 0.3)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#00FFA3'
                }}>
                  ✓ Currently Active
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(0, 255, 163, 0.05)',
          border: '1px solid rgba(0, 255, 163, 0.2)',
          borderRadius: '1rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#00FFA3',
            marginBottom: '1rem'
          }}>
            How to Change Logo
          </h2>
          <p style={{ color: '#94A3B8', lineHeight: '1.8', fontSize: '1rem' }}>
            Edit <code style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              color: '#00FFA3',
              fontFamily: 'monospace'
            }}>lib/branding.ts</code> and change{' '}
            <code style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              color: '#00FFA3',
              fontFamily: 'monospace'
            }}>DEFAULT_VARIANT</code>, or set{' '}
            <code style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              color: '#00FFA3',
              fontFamily: 'monospace'
            }}>NEXT_PUBLIC_LOGO_VARIANT</code> env var.
            Logo updates everywhere automatically (header, footer, OG images, etc).
          </p>
        </div>
      </div>
    </div>
  );
}
