'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Ignite, FlowArrow, Metrics } from '@/components/icons/FlowIcons';

/**
 * YardBuilderHook — The "IKEA Effect" hook on the homepage.
 * Quick address input → instant preview → drives to full YardBuilder or ROI.
 */
export default function YardBuilderHook() {
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<{
    gates: number;
    docks: number;
    spots: number;
    estimatedSavings: string;
  } | null>(null);

  const handleGenerate = () => {
    if (!address.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate quick generation (in production, this would call an API)
    setTimeout(() => {
      // Generate plausible numbers based on address length as a simple heuristic
      const seed = address.length + (companyName.length * 2);
      const gates = Math.max(1, Math.min(4, Math.floor(seed / 15)));
      const docks = Math.max(4, Math.min(24, seed % 20 + 6));
      const spots = Math.max(10, Math.min(80, seed * 2 + 15));
      const estimatedSavings = `$${(150000 + seed * 5000).toLocaleString()}`;

      setPreview({ gates, docks, spots, estimatedSavings });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!preview ? (
        <div className="glass-card p-8 border border-neon/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="company" className="block text-sm text-steel/80 mb-2">
                Company Name <span className="text-steel/50">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Logistics"
                className="w-full px-4 py-3 rounded-lg bg-void border border-steel/30 text-white placeholder-steel/50 focus:border-neon focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm text-steel/80 mb-2">
                Facility Address <span className="text-ember">*</span>
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Industrial Blvd, City, State"
                className="w-full px-4 py-3 rounded-lg bg-void border border-steel/30 text-white placeholder-steel/50 focus:border-neon focus:outline-none transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!address.trim() || isGenerating}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full animate-spin"></div>
                Scanning Satellite Imagery...
              </>
            ) : (
              <>
                <Ignite size={22} className="text-void" />
                Generate Yard Report
              </>
            )}
          </button>

          <p className="text-center text-steel/50 text-sm mt-4">
            No sign-up required. Results in 60 seconds.
          </p>
        </div>
      ) : (
        <div className="glass-card p-8 border border-neon/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-neon font-mono text-sm tracking-widest uppercase mb-1">
                Yard Scan Complete
              </p>
              <h3 className="text-2xl font-bold">
                {companyName || 'Your Facility'} — Quick Analysis
              </h3>
            </div>
            <button
              onClick={() => { setPreview(null); setAddress(''); setCompanyName(''); }}
              className="text-steel/60 hover:text-white text-sm"
            >
              ← Start Over
            </button>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Gate Lanes', value: preview.gates },
              { label: 'Dock Doors', value: preview.docks },
              { label: 'Parking Spots', value: preview.spots },
              { label: 'Est. Annual Savings', value: preview.estimatedSavings, highlight: true },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg text-center ${
                  item.highlight ? 'bg-neon/10 border border-neon/40' : 'bg-void/50'
                }`}
              >
                <p className={`text-3xl font-black mb-1 ${item.highlight ? 'text-neon' : 'text-white'}`}>
                  {item.value}
                </p>
                <p className="text-steel/70 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Mini Yard Visualization */}
          <div className="bg-void/50 rounded-lg p-6 mb-8">
            <p className="text-steel/60 text-xs font-mono mb-4 uppercase">Detected Layout (Simplified)</p>
            <div className="aspect-[2/1] relative border border-steel/20 rounded-lg overflow-hidden">
              {/* Simple yard grid visualization */}
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="hookGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00B4FF" strokeWidth="0.5" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#hookGrid)" />
                
                {/* Gate */}
                <rect x="10" y="80" width="30" height="40" fill="none" stroke="#00B4FF" strokeWidth="2" />
                <text x="25" y="105" fontSize="8" fill="#00B4FF" textAnchor="middle">GATE</text>
                
                {/* Parking spots */}
                {Array.from({ length: Math.min(preview.spots / 10, 6) }).map((_, i) => (
                  <rect 
                    key={i} 
                    x={80 + i * 40} 
                    y="60" 
                    width="35" 
                    height="80" 
                    fill="none" 
                    stroke="#00B4FF" 
                    strokeWidth="1" 
                    opacity="0.4"
                  />
                ))}
                
                {/* Docks */}
                <rect x="340" y="40" width="50" height="120" fill="none" stroke="#FF2A00" strokeWidth="2" />
                <text x="365" y="105" fontSize="8" fill="#FF2A00" textAnchor="middle">DOCKS</text>
                
                {/* Flow arrows */}
                <path d="M 45 100 L 80 100" stroke="#00B4FF" strokeWidth="1" opacity="0.6" markerEnd="url(#arrowhead)" />
                <path d="M 320 100 L 335 100" stroke="#00B4FF" strokeWidth="1" opacity="0.6" />
                
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#00B4FF" opacity="0.6" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/yardbuilder?address=${encodeURIComponent(address)}&company=${encodeURIComponent(companyName)}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold bg-neon text-void hover:bg-white transition-all"
            >
              <FlowArrow size={18} className="text-void" />
              Customize Full Report
            </Link>
            <Link
              href={`/roi?facilities=1&trucksPerDay=${preview.docks * 8}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold border border-neon text-neon hover:bg-neon hover:text-void transition-all"
            >
              <Metrics size={18} />
              Build ROI Model
            </Link>
          </div>

          <p className="text-center text-steel/50 text-sm mt-6">
            Full report includes: detailed layout, ROI projections, and board-ready PDF export.
          </p>
        </div>
      )}
    </div>
  );
}
