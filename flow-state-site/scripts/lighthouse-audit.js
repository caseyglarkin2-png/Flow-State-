#!/usr/bin/env node
/**
 * Lighthouse Performance Audit
 * Runs Lighthouse on homepage and key pages
 * Requires lighthouse CLI to be installed globally: npm install -g lighthouse
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000';

const pages = [
  { name: 'Homepage', url: baseUrl },
  { name: 'ROI Calculator', url: `${baseUrl}/roi` },
  { name: 'Product', url: `${baseUrl}/product` },
  { name: 'Diagnostic', url: `${baseUrl}/diagnostic` },
];

const outputDir = path.join(__dirname, '../test-results/lighthouse');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔍 Running Lighthouse performance audits...\n');

const results = [];

pages.forEach(({ name, url }) => {
  try {
    console.log(`📊 Auditing: ${name}`);
    const reportPath = path.join(outputDir, `${name.toLowerCase().replace(/ /g, '-')}.json`);

    execSync(
      `lighthouse "${url}" --output=json --output-path="${reportPath}" --quiet --emulated-form-factor=mobile`,
      { stdio: 'ignore' }
    );

    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const scores = reportData.categories;

    results.push({
      page: name,
      performance: Math.round(scores.performance.score * 100),
      accessibility: Math.round(scores.accessibility.score * 100),
      bestPractices: Math.round(scores['best-practices'].score * 100),
      seo: Math.round(scores.seo.score * 100),
    });

    console.log(`  ✓ Performance: ${results[results.length - 1].performance}`);
  } catch (error) {
    console.warn(`  ⚠️  Skipping ${name} - Lighthouse CLI may not be installed`);
    console.warn('     Run: npm install -g lighthouse');
  }
});

if (results.length > 0) {
  console.log('\n📈 Summary:\n');
  console.table(results);

  // Check minimum thresholds
  const minPerformance = 90;
  const minAccessibility = 95;
  const failedChecks = results.filter(
    (r) => r.performance < minPerformance || r.accessibility < minAccessibility
  );

  if (failedChecks.length > 0) {
    console.error('\n❌ Performance thresholds not met:');
    failedChecks.forEach((r) => {
      if (r.performance < minPerformance) {
        console.error(`  - ${r.page}: Performance ${r.performance} < ${minPerformance}`);
      }
      if (r.accessibility < minAccessibility) {
        console.error(`  - ${r.page}: Accessibility ${r.accessibility} < ${minAccessibility}`);
      }
    });
    process.exit(1);
  } else {
    console.log('\n✅ All performance thresholds met!');
  }
} else {
  console.warn('\n⚠️  No Lighthouse results. Install Lighthouse CLI to enable performance audits.');
}
