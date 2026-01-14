import React from 'react';
import Link from 'next/link';
import { LOGO_VARIANTS, DEFAULT_VARIANT, getActiveVariant } from '@/lib/branding';

export const metadata = {
  title: 'Logo Variants - Internal Testing',
  robots: { index: false, follow: false },
};

export default function LogoTestPage() {
  const activeVariant = getActiveVariant();
  
  return (
    <div className="min-h-screen bg-void p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Logo Variant Testing</h1>
          <p className="text-steel mb-2">
            Current active variant: <span className="text-neon font-mono">{activeVariant}</span>
          </p>
          <p className="text-steel/70 text-sm">
            To change: Set <code className="text-neon bg-carbon px-2 py-1 rounded">NEXT_PUBLIC_LOGO_VARIANT</code> env var or edit <code className="text-neon bg-carbon px-2 py-1 rounded">lib/branding.ts</code> DEFAULT_VARIANT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(LOGO_VARIANTS).map(([key, variant]) => (
            <div 
              key={key}
              className={`p-8 rounded-lg border-2 transition-all ${
                key === activeVariant 
                  ? 'border-neon bg-neon/10'
                  : 'border-steel/30 bg-carbon/30'
              }`}
            >
              <div className="flex items-start gap-6 mb-6">
                {/* Logo Preview */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 flex items-center justify-center bg-void rounded-lg border border-steel/30">
                    <div 
                      className="text-neon"
                      dangerouslySetInnerHTML={{ 
                        __html: variant.svg.replace('viewBox="0 0 32 32"', 'viewBox="0 0 32 32" width="64" height="64"')
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white capitalize">{key}</h2>
                    {key === activeVariant && (
                      <span className="px-2 py-1 text-xs font-bold bg-neon text-void rounded">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-steel/80 text-sm mb-4">{variant.description}</p>
                  <code className="text-xs font-mono text-steel/60 bg-carbon px-2 py-1 rounded">
                    '{key}'
                  </code>
                </div>
              </div>

              {/* Multiple size previews */}
              <div className="pt-6 border-t border-steel/20">
                <p className="text-xs text-steel/60 mb-3 uppercase tracking-wider">Size Previews</p>
                <div className="flex items-center gap-4">
                  {[24, 36, 48, 64].map(size => (
                    <div 
                      key={size}
                      className="flex flex-col items-center gap-2"
                    >
                      <div 
                        className="text-neon flex items-center justify-center"
                        style={{ width: size, height: size }}
                        dangerouslySetInnerHTML={{ 
                          __html: variant.svg.replace('viewBox="0 0 32 32"', `viewBox="0 0 32 32" width="${size}" height="${size}"`)
                        }}
                      />
                      <span className="text-xs text-steel/50">{size}px</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OG Preview */}
              <div className="mt-6 pt-6 border-t border-steel/20">
                <p className="text-xs text-steel/60 mb-3 uppercase tracking-wider">OG Image Preview</p>
                <div className="bg-[#0A0E14] p-6 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 32 32"
                    width="80"
                    height="80"
                    fill="none"
                    stroke="#00FFA3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: variant.svg }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-carbon/30 border border-steel/30 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-3">How to Switch</h3>
          <ol className="space-y-2 text-steel/80 text-sm list-decimal list-inside">
            <li>Open <code className="text-neon bg-carbon px-1 rounded">lib/branding.ts</code></li>
            <li>Find line 13: <code className="text-neon bg-carbon px-1 rounded">export const ACTIVE_VARIANT</code></li>
            <li>Change the value to your preferred variant key</li>
            <li>Save, rebuild, and push</li>
            <li>New logo appears everywhere (header, OG images, social cards)</li>
          </ol>
          <div className="mt-4 pt-4 border-t border-steel/20">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-neon hover:underline"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
