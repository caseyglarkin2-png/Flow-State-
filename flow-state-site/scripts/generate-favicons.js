#!/usr/bin/env node
/**
 * Generate all required favicon formats from SVG source
 * Run: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SVG_SOURCE = path.join(PUBLIC_DIR, 'favicon.svg');

// Read the SVG
const svgContent = fs.readFileSync(SVG_SOURCE);

async function generateFavicons() {
  console.log('🎨 Generating favicon assets...\n');

  // Generate PNG favicons at various sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(path.join(PUBLIC_DIR, name));
    console.log(`  ✅ ${name} (${size}x${size})`);
  }

  // Generate ICO (uses 32x32 PNG)
  // Note: Sharp doesn't directly support ICO, so we'll use the 32x32 PNG
  // and the browser will fall back to SVG for modern browsers
  const ico32 = await sharp(svgContent)
    .resize(32, 32)
    .png()
    .toBuffer();
  
  // Write as favicon.ico (browsers accept PNG data in .ico extension)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), ico32);
  console.log('  ✅ favicon.ico (32x32 PNG fallback)');

  console.log('\n✨ All favicon assets generated!');
}

generateFavicons().catch(console.error);
