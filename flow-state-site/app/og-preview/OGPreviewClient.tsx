'use client';

import React, { useState, useCallback } from 'react';

interface OGPreviewClientProps {
  siteUrl: string;
}

const PRESET_ROUTES = [
  { label: 'Homepage', path: '/' },
  { label: 'ROI Calculator', path: '/roi' },
  { label: 'Contact', path: '/contact' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Solutions - Dry Van', path: '/solutions/dry-van' },
  { label: 'Solutions - Intermodal', path: '/solutions/intermodal' },
  { label: 'Network Effect', path: '/network-effect' },
  { label: 'Singularity', path: '/singularity' },
  { label: 'Security', path: '/security' },
];

const AB_VARIANTS = [
  { value: '', label: 'None (Default)' },
  { value: 'a', label: 'A: The Chaos Tax / You Already Pay It' },
  { value: 'b', label: 'B: Yard Blind Spots / Cost More Than You Think' },
  { value: 'c', label: 'C: Every Minute Counts / Stop Losing Them' },
];

const EXTERNAL_VALIDATORS = [
  { name: 'Facebook Debugger', url: 'https://developers.facebook.com/tools/debug/?q=' },
  { name: 'LinkedIn Inspector', url: 'https://www.linkedin.com/post-inspector/inspect/' },
  { name: 'Twitter Card Validator', url: 'https://cards-dev.twitter.com/validator' },
  { name: 'Open Graph Debugger', url: 'https://www.opengraph.xyz/' },
];

export default function OGPreviewClient({ siteUrl }: OGPreviewClientProps) {
  const [selectedPath, setSelectedPath] = useState('/');
  const [customPath, setCustomPath] = useState('');
  const [copied, setCopied] = useState(false);
  const [ogParams, setOgParams] = useState({
    title: '',
    subtitle: '',
    type: 'default',
    variant: '',
  });

  const activePath = customPath || selectedPath;
  const fullUrl = `${siteUrl}${activePath}`;
  
  // Build OG API URL with optional params
  const ogApiUrl = buildOgApiUrl(siteUrl, ogParams);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="space-y-8">
      {/* Route Selector */}
      <section className="bg-carbon/50 border border-neon/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Select Page</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {PRESET_ROUTES.map((route) => (
            <button
              key={route.path}
              onClick={() => {
                setSelectedPath(route.path);
                setCustomPath('');
              }}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                selectedPath === route.path && !customPath
                  ? 'bg-neon text-void font-semibold'
                  : 'bg-carbon border border-steel/20 text-steel hover:border-neon/40'
              }`}
            >
              {route.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
            placeholder="Custom path (e.g., /solutions/my-page)"
            className="flex-1 px-4 py-2 bg-void border border-steel/20 rounded-lg text-white placeholder:text-steel/50 focus:border-neon focus:outline-none"
          />
          <button
            onClick={() => setCustomPath('')}
            className="px-4 py-2 bg-carbon border border-steel/20 rounded-lg text-steel hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-steel">Full URL:</span>
          <code className="text-neon text-sm bg-void px-2 py-1 rounded flex-1 overflow-x-auto">
            {fullUrl}
          </code>
          <button
            onClick={() => handleCopy(fullUrl)}
            className="px-3 py-1 bg-neon text-void text-sm font-semibold rounded hover:bg-neon/90 transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </section>

      {/* OG Image Preview */}
      <section className="bg-carbon/50 border border-neon/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">OG Image Preview</h2>
        
        <div className="bg-void rounded-lg p-4 mb-4">
          <div className="aspect-[1200/630] bg-carbon/30 rounded-lg overflow-hidden border border-steel/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ogApiUrl}
              alt="OG Preview"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-steel mt-2 text-center">
            1200×630px (Facebook/LinkedIn optimal size)
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-steel">API URL:</span>
          <code className="text-neon/80 bg-void px-2 py-1 rounded flex-1 overflow-x-auto text-xs">
            {ogApiUrl}
          </code>
          <button
            onClick={() => handleCopy(ogApiUrl)}
            className="px-3 py-1 bg-carbon border border-steel/20 text-steel rounded hover:text-white transition-colors"
          >
            Copy
          </button>
        </div>
      </section>

      {/* Custom OG Parameters */}
      <section className="bg-carbon/50 border border-neon/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Test Custom Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-steel mb-1">Title</label>
            <input
              type="text"
              value={ogParams.title}
              onChange={(e) => setOgParams({ ...ogParams, title: e.target.value })}
              placeholder="Custom title"
              className="w-full px-3 py-2 bg-void border border-steel/20 rounded-lg text-white placeholder:text-steel/50 focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-steel mb-1">Subtitle</label>
            <input
              type="text"
              value={ogParams.subtitle}
              onChange={(e) => setOgParams({ ...ogParams, subtitle: e.target.value })}
              placeholder="Custom subtitle"
              className="w-full px-3 py-2 bg-void border border-steel/20 rounded-lg text-white placeholder:text-steel/50 focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-steel mb-1">Type</label>
            <select
              value={ogParams.type}
              onChange={(e) => setOgParams({ ...ogParams, type: e.target.value })}
              className="w-full px-3 py-2 bg-void border border-steel/20 rounded-lg text-white focus:border-neon focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="solution">Solution</option>
              <option value="guide">Guide</option>
              <option value="case-study">Case Study</option>
            </select>
          </div>
        </div>

        {/* A/B Test Variant Selector */}
        <div className="mb-4">
          <label className="block text-sm text-steel mb-2">A/B Test Variant</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {AB_VARIANTS.map((v) => (
              <button
                key={v.value}
                onClick={() => setOgParams({ ...ogParams, variant: v.value })}
                className={`px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                  ogParams.variant === v.value
                    ? 'bg-neon text-void font-semibold'
                    : 'bg-carbon border border-steel/20 text-steel hover:border-neon/40'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setOgParams({ title: '', subtitle: '', type: 'default', variant: '' })}
          className="px-4 py-2 bg-carbon border border-steel/20 rounded-lg text-steel hover:text-white transition-colors"
        >
          Reset Parameters
        </button>
      </section>

      {/* External Validators */}
      <section className="bg-carbon/50 border border-neon/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">External Validators</h2>
        <p className="text-sm text-steel mb-4">
          Use these tools to validate how your OG images appear on different platforms.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EXTERNAL_VALIDATORS.map((validator) => (
            <a
              key={validator.name}
              href={`${validator.url}${encodeURIComponent(fullUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-carbon border border-steel/20 rounded-lg text-center text-sm text-steel hover:text-white hover:border-neon/40 transition-colors"
            >
              {validator.name}
              <span className="ml-1 text-xs">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Social Platform Previews */}
      <section className="bg-carbon/50 border border-neon/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Platform Previews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facebook Preview */}
          <div>
            <h3 className="text-sm font-semibold text-steel mb-2">Facebook</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="aspect-[1.91/1] bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogApiUrl}
                  alt="Facebook preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 uppercase">{siteUrl.replace('https://', '')}</p>
                <p className="font-semibold text-gray-900 text-sm">YardFlow - Stop the Variance Tax</p>
                <p className="text-xs text-gray-600">The first yard network system...</p>
              </div>
            </div>
          </div>

          {/* LinkedIn Preview */}
          <div>
            <h3 className="text-sm font-semibold text-steel mb-2">LinkedIn</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="aspect-[1.91/1] bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogApiUrl}
                  alt="LinkedIn preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 border-t border-gray-200">
                <p className="font-semibold text-gray-900 text-sm">YardFlow - Stop the Variance Tax</p>
                <p className="text-xs text-gray-500">{siteUrl.replace('https://', '')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function buildOgApiUrl(siteUrl: string, params: { title: string; subtitle: string; type: string; variant: string }): string {
  const url = new URL('/api/og', siteUrl);
  
  if (params.title) {
    url.searchParams.set('title', params.title);
  }
  if (params.subtitle) {
    url.searchParams.set('subtitle', params.subtitle);
  }
  if (params.type && params.type !== 'default') {
    url.searchParams.set('type', params.type);
  }
  if (params.variant) {
    url.searchParams.set('variant', params.variant);
  }
  
  return url.toString();
}
