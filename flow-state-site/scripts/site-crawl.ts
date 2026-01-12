/**
 * Site Crawl Script
 * Visits all internal routes, captures screenshots, extracts metadata
 * Usage: npx tsx scripts/site-crawl.ts
 */

import { chromium, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://flow-state-klbt.vercel.app';

const ROUTES = [
  '/',
  '/product',
  '/solutions',
  '/pricing',
  '/roi',
  '/network-effect',
  '/diagnostic',
  '/security',
  '/integrations',
  '/implementation',
  '/contact',
  '/about',
  '/faq',
  '/compare',
  '/compare/legacy-yms',
  '/compare/spreadsheets',
  '/case-studies',
  '/singularity',
  '/singularity/primo',
  '/yardbuilder',
  '/changelog',
  '/privacy',
  '/terms',
  '/status',
  '/press',
];

interface PageAudit {
  route: string;
  url: string;
  title: string;
  h1: string;
  metaDescription: string;
  primaryCTA: { text: string; href: string } | null;
  secondaryCTA: { text: string; href: string } | null;
  allCTAs: { text: string; href: string }[];
  issues: string[];
  screenshot: string;
}

async function extractPageData(page: Page, route: string): Promise<Partial<PageAudit>> {
  const title = await page.title();
  
  const h1 = await page.$eval('h1', el => el.textContent?.trim() || '').catch(() => 'NO H1 FOUND');
  
  const metaDescription = await page.$eval(
    'meta[name="description"]',
    el => el.getAttribute('content') || ''
  ).catch(() => '');

  // Find all CTA-like links (buttons, prominent links)
  const allCTAs = await page.$$eval(
    'a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])',
    (links) => {
      return links
        .filter(link => {
          const classes = link.className || '';
          const text = link.textContent?.trim() || '';
          // Look for button-like elements or prominent CTAs
          return (
            classes.includes('btn') ||
            classes.includes('rounded-lg') ||
            classes.includes('font-semibold') ||
            classes.includes('font-bold') ||
            text.toLowerCase().includes('get') ||
            text.toLowerCase().includes('start') ||
            text.toLowerCase().includes('contact') ||
            text.toLowerCase().includes('calculate') ||
            text.toLowerCase().includes('view') ||
            text.toLowerCase().includes('run') ||
            text.toLowerCase().includes('book') ||
            text.toLowerCase().includes('apply')
          );
        })
        .slice(0, 10)
        .map(link => ({
          text: link.textContent?.trim().replace(/\s+/g, ' ') || '',
          href: link.getAttribute('href') || '',
        }));
    }
  );

  // Identify primary CTA (usually first prominent button in hero/above fold)
  const primaryCTA = allCTAs.find(cta => 
    cta.text.toLowerCase().includes('calculate') ||
    cta.text.toLowerCase().includes('get') ||
    cta.text.toLowerCase().includes('start') ||
    cta.text.toLowerCase().includes('run') ||
    cta.text.toLowerCase().includes('apply')
  ) || allCTAs[0] || null;

  const secondaryCTA = allCTAs.find(cta => cta !== primaryCTA) || null;

  // Check for issues
  const issues: string[] = [];
  
  if (h1 === 'NO H1 FOUND') issues.push('Missing H1');
  if (!metaDescription) issues.push('Missing meta description');
  if (!primaryCTA) issues.push('No clear primary CTA');
  if (allCTAs.some(cta => cta.text.toLowerCase() === 'learn more')) {
    issues.push('Generic "Learn more" CTA detected');
  }

  return {
    title,
    h1,
    metaDescription,
    primaryCTA,
    secondaryCTA,
    allCTAs,
    issues,
  };
}

async function crawlSite() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const screenshotDir = path.join(__dirname, '../docs/audit-screens');
  fs.mkdirSync(screenshotDir, { recursive: true });

  const results: PageAudit[] = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Crawling: ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000); // Let animations settle

      const screenshotName = route === '/' ? 'home.png' : `${route.replace(/\//g, '-').slice(1)}.png`;
      const screenshotPath = path.join(screenshotDir, screenshotName);
      
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const pageData = await extractPageData(page, route);

      results.push({
        route,
        url,
        screenshot: `audit-screens/${screenshotName}`,
        ...pageData,
      } as PageAudit);

    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
      results.push({
        route,
        url,
        title: 'ERROR',
        h1: 'ERROR',
        metaDescription: '',
        primaryCTA: null,
        secondaryCTA: null,
        allCTAs: [],
        issues: [`Failed to load: ${error}`],
        screenshot: '',
      });
    }
  }

  await browser.close();

  // Generate report
  const report = generateReport(results);
  fs.writeFileSync(path.join(__dirname, '../docs/site-crawl-report.md'), report);
  
  console.log('\n✅ Crawl complete. Report saved to docs/site-crawl-report.md');
  
  // Summary
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  console.log(`\nSummary: ${results.length} pages crawled, ${totalIssues} issues found`);
}

function generateReport(results: PageAudit[]): string {
  const timestamp = new Date().toISOString();
  
  let md = `# Site Crawl Report

**Generated:** ${timestamp}  
**Base URL:** ${BASE_URL}  
**Pages Crawled:** ${results.length}

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Pages | ${results.length} |
| Pages with Issues | ${results.filter(r => r.issues.length > 0).length} |
| Missing H1 | ${results.filter(r => r.issues.includes('Missing H1')).length} |
| Missing Meta Description | ${results.filter(r => r.issues.includes('Missing meta description')).length} |
| Generic CTAs | ${results.filter(r => r.issues.some(i => i.includes('Generic'))).length} |

---

## Page-by-Page Audit

`;

  for (const result of results) {
    md += `### ${result.route}

**URL:** ${result.url}  
**Screenshot:** [${result.screenshot}](${result.screenshot})

| Field | Value |
|-------|-------|
| Title | ${result.title} |
| H1 | ${result.h1.substring(0, 80)}${result.h1.length > 80 ? '...' : ''} |
| Meta Description | ${result.metaDescription.substring(0, 100)}${result.metaDescription.length > 100 ? '...' : ''} |
| Primary CTA | ${result.primaryCTA ? `"${result.primaryCTA.text}" → ${result.primaryCTA.href}` : 'None'} |
| Secondary CTA | ${result.secondaryCTA ? `"${result.secondaryCTA.text}" → ${result.secondaryCTA.href}` : 'None'} |

`;

    if (result.issues.length > 0) {
      md += `**Issues:**\n`;
      for (const issue of result.issues) {
        md += `- ⚠️ ${issue}\n`;
      }
    } else {
      md += `**Issues:** ✅ None\n`;
    }

    md += `\n---\n\n`;
  }

  // CTA Flow Analysis
  md += `## CTA Flow Analysis

This section maps where each page's CTA leads, to identify dead ends or broken flows.

| Page | Primary CTA | Destination | Flow Status |
|------|-------------|-------------|-------------|
`;

  for (const result of results) {
    const dest = result.primaryCTA?.href || 'None';
    const destPage = results.find(r => r.route === dest || dest.includes(r.route));
    const status = !result.primaryCTA 
      ? '❌ No CTA' 
      : dest.startsWith('http') && !dest.includes('flow-state')
        ? '↗️ External'
        : destPage 
          ? '✅ Connected' 
          : dest.startsWith('#') 
            ? '📍 Anchor'
            : '⚠️ Check destination';
    
    md += `| ${result.route} | ${result.primaryCTA?.text || 'None'} | ${dest} | ${status} |\n`;
  }

  return md;
}

crawlSite().catch(console.error);
