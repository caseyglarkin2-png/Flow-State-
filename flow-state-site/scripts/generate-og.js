#!/usr/bin/env node
/**
 * Generate static OG image with correct branding
 * This is a fallback for platforms that don't support dynamic OG images
 * Run: node scripts/generate-og.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Create OG image with correct branding (1200x630)
async function generateOG() {
  console.log('🖼️  Generating static OG image...\n');

  // SVG for OG image with YardFlow by FreightRoll branding
  const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050505;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glowBlue" cx="85%" cy="15%" r="40%">
      <stop offset="0%" style="stop-color:#00B4FF;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#00B4FF;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="glowEmber" cx="15%" cy="85%" r="35%">
      <stop offset="0%" style="stop-color:#FF2A00;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#FF2A00;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  
  <!-- Grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00B4FF" stroke-width="0.5" stroke-opacity="0.05"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Glow effects -->
  <rect width="1200" height="630" fill="url(#glowBlue)"/>
  <rect width="1200" height="630" fill="url(#glowEmber)"/>
  
  <!-- Logo mark -->
  <g transform="translate(70, 60)">
    <circle cx="20" cy="20" r="15" fill="none" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.35"/>
    <path d="M20 20 L20 10 M20 20 L29 24 M20 20 L11 24" fill="none" stroke="#00B4FF" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.9"/>
    <circle cx="20" cy="10" r="2.5" fill="#00B4FF"/>
    <circle cx="29" cy="24" r="2.5" fill="#00B4FF"/>
    <circle cx="11" cy="24" r="2.5" fill="#00B4FF"/>
    <circle cx="20" cy="20" r="3.5" fill="#00B4FF"/>
  </g>
  
  <!-- YardFlow text -->
  <text x="125" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">YardFlow</text>
  <text x="125" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#64748B" letter-spacing="0.05em">by FreightRoll</text>
  
  <!-- Eyebrow -->
  <text x="70" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#00B4FF" letter-spacing="0.15em">YARD NETWORK SYSTEM</text>
  
  <!-- Main headline -->
  <text x="70" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#FFFFFF">Standardize the Yard.</text>
  <text x="70" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#00B4FF">Kill Variance.</text>
  
  <!-- Tagline -->
  <text x="70" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#94A3B8">Stop the Variance Tax. You don't have 50 yards—you have one yard network.</text>
  
  <!-- Bottom tagline -->
  <text x="70" y="570" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#00B4FF" letter-spacing="0.1em">Industrial Fluidity.</text>
  
  <!-- URL -->
  <text x="1130" y="570" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#64748B" text-anchor="end">yardflow.ai</text>
</svg>`;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og.png'));
  
  console.log('  ✅ og.png (1200x630) - YardFlow by FreightRoll branded');
  console.log('\n✨ Static OG image generated!');
}

generateOG().catch(console.error);
