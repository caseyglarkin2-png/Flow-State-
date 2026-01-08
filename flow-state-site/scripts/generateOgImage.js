const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;

// Flow State branded OG image - dark void background, neon accents
const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Radial glow behind logo -->
    <radialGradient id="glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#00B4FF" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#00B4FF" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0"/>
    </radialGradient>
    <!-- Grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00B4FF" stroke-width="0.5" stroke-opacity="0.08"/>
    </pattern>
    <!-- Horizontal scanline -->
    <linearGradient id="scanline" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00B4FF" stop-opacity="0"/>
      <stop offset="50%" stop-color="#00B4FF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#00B4FF" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#050505"/>
  
  <!-- Grid overlay -->
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <!-- Radial glow -->
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- Scanline accent -->
  <rect x="0" y="520" width="100%" height="1" fill="url(#scanline)"/>

  <!-- Logo mark - concentric rings with dot -->
  <g transform="translate(600, 240)">
    <circle cx="0" cy="0" r="60" fill="none" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.3"/>
    <circle cx="0" cy="0" r="45" fill="none" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.5"/>
    <circle cx="0" cy="0" r="30" fill="none" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.7"/>
    <circle cx="0" cy="0" r="8" fill="#00B4FF"/>
    <!-- Radiating lines -->
    <line x1="0" y1="-70" x2="0" y2="-85" stroke="#00B4FF" stroke-width="1.5" stroke-opacity="0.5"/>
    <line x1="0" y1="70" x2="0" y2="85" stroke="#00B4FF" stroke-width="1.5" stroke-opacity="0.5"/>
    <line x1="-70" y1="0" x2="-85" y2="0" stroke="#00B4FF" stroke-width="1.5" stroke-opacity="0.5"/>
    <line x1="70" y1="0" x2="85" y2="0" stroke="#00B4FF" stroke-width="1.5" stroke-opacity="0.5"/>
  </g>

  <!-- Brand name -->
  <text x="600" y="380" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="900" fill="#FFFFFF" letter-spacing="-2">
    FLOW STATE
  </text>

  <!-- Tagline -->
  <text x="600" y="430" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#00B4FF" letter-spacing="4">
    INDUSTRIAL FLUIDITY
  </text>

  <!-- Subline -->
  <text x="600" y="480" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="400" fill="#888888">
    Yard Orchestration Software
  </text>

  <!-- Bottom accent bar -->
  <rect x="480" y="560" width="240" height="3" rx="1.5" fill="#00B4FF" fill-opacity="0.8"/>

  <!-- Corner accents -->
  <path d="M 30 30 L 30 60 M 30 30 L 60 30" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.4" fill="none"/>
  <path d="M 1170 30 L 1170 60 M 1170 30 L 1140 30" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.4" fill="none"/>
  <path d="M 30 600 L 30 570 M 30 600 L 60 600" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.4" fill="none"/>
  <path d="M 1170 600 L 1170 570 M 1170 600 L 1140 600" stroke="#00B4FF" stroke-width="2" stroke-opacity="0.4" fill="none"/>
</svg>
`;

async function generate() {
  const outputPath = path.join(__dirname, '../public/og.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  console.log(`✅ Generated ${outputPath}`);
}

generate().catch(console.error);
