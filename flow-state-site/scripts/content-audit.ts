#!/usr/bin/env npx tsx
/**
 * Content Audit Script
 * 
 * Scans all pages for:
 * - Missing metadata (title, description)
 * - Missing OG images
 * - Missing CTAs
 * - Empty pages
 * - Broken internal links
 * 
 * Usage:
 *   npx tsx scripts/content-audit.ts
 *   npm run audit:content
 *   npm run audit:content -- --ci  # JSON output for CI
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const APP_DIR = join(process.cwd(), 'app');
const PUBLIC_DIR = join(process.cwd(), 'public');
const isCI = process.argv.includes('--ci');

// Check if root layout has global OG config
const LAYOUT_PATH = join(APP_DIR, 'layout.tsx');
const layoutContent = existsSync(LAYOUT_PATH) ? readFileSync(LAYOUT_PATH, 'utf-8') : '';
const hasGlobalOG = /openGraph:/.test(layoutContent);

interface PageAudit {
  path: string;
  file: string;
  issues: string[];
  warnings: string[];
  info: string[];
  hasMetadata: boolean;
  hasOgImage: boolean;
  hasCTA: boolean;
  lineCount: number;
  isRedirect: boolean;
}

interface AuditSummary {
  totalPages: number;
  pagesWithIssues: number;
  pagesWithWarnings: number;
  issueBreakdown: Record<string, number>;
}

// T12-001: Add test directories to ignored list
const IGNORED_DIRS = ['api', 'og-preview', 'logo-preview', 'logo-test', '__test-error__', 'test-canvas'];
const CTA_PATTERNS = [
  /Button/,
  /CTAGroup/,
  /LeadForm/,
  /<a[^>]*href/,
  /Link\s+href/,
  /BookDemoButton/,
  /StartButton/,
];

const METADATA_PATTERNS = [
  /export\s+(const|async\s+function)\s+generateMetadata/,
  /export\s+const\s+metadata/,
  /title:/,
  /description:/,
];

const OG_IMAGE_PATTERNS = [
  /openGraph:/,
  /og:image/,
  /ogImage/,
  /\/api\/og/,
];

function getAppPages(dir: string = APP_DIR): string[] {
  const pages: string[] = [];
  
  function walk(currentDir: string): void {
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        const relativePath = relative(APP_DIR, fullPath);
        const dirName = relativePath.split('/').pop() || '';
        
        // Skip ignored directories
        if (IGNORED_DIRS.includes(dirName)) continue;
        
        walk(fullPath);
      } else if (item === 'page.tsx' || item === 'page.jsx') {
        pages.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return pages;
}

function getRoutePath(filePath: string): string {
  const relative_path = relative(APP_DIR, filePath);
  const route = '/' + relative_path.replace(/\/page\.(tsx|jsx)$/, '');
  return route === '/page' ? '/' : route;
}

function auditPage(filePath: string): PageAudit {
  const content = readFileSync(filePath, 'utf-8');
  const route = getRoutePath(filePath);
  const lines = content.split('\n');
  
  // T12-002: Detect redirect pages
  const isRedirectPage = /redirect\(['"]/.test(content) && lines.length < 15;
  
  const audit: PageAudit = {
    path: route,
    file: relative(process.cwd(), filePath),
    issues: [],
    warnings: [],
    info: [],
    hasMetadata: false,
    hasOgImage: false,
    hasCTA: false,
    lineCount: lines.length,
    isRedirect: isRedirectPage,
  };
  
  // Check for metadata
  audit.hasMetadata = METADATA_PATTERNS.some(pattern => pattern.test(content));
  if (!audit.hasMetadata) {
    audit.issues.push('Missing page metadata (title/description)');
  }
  
  // Check for OG image - consider global OG inheritance
  audit.hasOgImage = OG_IMAGE_PATTERNS.some(pattern => pattern.test(content));
  if (!audit.hasOgImage && hasGlobalOG) {
    audit.info.push('Inherits OG from root layout');
  } else if (!audit.hasOgImage) {
    audit.warnings.push('No explicit OG image configuration');
  }
  
  // Check for CTA (skip for redirect pages)
  audit.hasCTA = CTA_PATTERNS.some(pattern => pattern.test(content));
  if (!audit.hasCTA && !isRedirectPage) {
    audit.warnings.push('No CTA (button/link) found');
  }
  
  // Check for empty/thin content (skip for redirect pages - T12-002)
  const codeLines = lines.filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*'));
  if (codeLines.length < 20 && !isRedirectPage) {
    audit.issues.push(`Very thin page (${codeLines.length} code lines)`);
  }
  
  // T12-003: Fix placeholder detection - don't match HTML placeholder attributes
  const placeholderPatterns = [
    /TODO/i,
    /FIXME/i,
    /Lorem ipsum/i,
    /placeholder(?!\s*=)/i,  // Match placeholder NOT followed by = (HTML attribute)
    /Coming soon/i,
  ];
  
  for (const pattern of placeholderPatterns) {
    if (pattern.test(content)) {
      audit.warnings.push(`Contains placeholder text: ${pattern.source}`);
    }
  }
  
  // Check for hardcoded URLs that should be env vars
  const hardcodedUrls = content.match(/https?:\/\/flow-state[^"'\s]*/g) || [];
  if (hardcodedUrls.length > 0) {
    audit.warnings.push(`Hardcoded URLs found (consider env vars): ${hardcodedUrls.length}`);
  }
  
  return audit;
}

function checkPublicAssets(): string[] {
  const issues: string[] = [];
  
  const requiredAssets = [
    'favicon.ico',
    'og-default.png',
    'apple-touch-icon.png',
  ];
  
  for (const asset of requiredAssets) {
    if (!existsSync(join(PUBLIC_DIR, asset))) {
      issues.push(`Missing required public asset: ${asset}`);
    }
  }
  
  return issues;
}

function formatReport(audits: PageAudit[], assetIssues: string[]): void {
  const pagesWithIssues = audits.filter(a => a.issues.length > 0);
  const pagesWithWarnings = audits.filter(a => a.warnings.length > 0 && a.issues.length === 0);
  const cleanPages = audits.filter(a => a.issues.length === 0 && a.warnings.length === 0);
  
  // T12-005: CI mode - JSON output
  if (isCI) {
    const result = {
      totalPages: audits.length,
      pagesWithIssues: pagesWithIssues.length,
      pagesWithWarnings: pagesWithWarnings.length,
      cleanPages: cleanPages.length,
      issues: pagesWithIssues.map(a => ({ path: a.path, issues: a.issues })),
      warnings: pagesWithWarnings.map(a => ({ path: a.path, warnings: a.warnings })),
      assetIssues,
      passed: pagesWithIssues.length === 0 && assetIssues.length === 0,
    };
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.passed ? 0 : 1);
    return;
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 CONTENT AUDIT REPORT');
  console.log('='.repeat(70) + '\n');
  
  // Asset issues
  if (assetIssues.length > 0) {
    console.log('🗂️  PUBLIC ASSETS\n');
    for (const issue of assetIssues) {
      console.log(`   ⚠️  ${issue}`);
    }
    console.log();
  }
  
  // Issues (red)
  if (pagesWithIssues.length > 0) {
    console.log('❌ PAGES WITH ISSUES\n');
    for (const audit of pagesWithIssues) {
      console.log(`   ${audit.path}`);
      console.log(`   └─ ${audit.file}`);
      for (const issue of audit.issues) {
        console.log(`      ❗ ${issue}`);
      }
      for (const warning of audit.warnings) {
        console.log(`      ⚠️  ${warning}`);
      }
      console.log();
    }
  }
  
  // Warnings only (yellow)
  if (pagesWithWarnings.length > 0) {
    console.log('⚠️  PAGES WITH WARNINGS\n');
    for (const audit of pagesWithWarnings) {
      console.log(`   ${audit.path}`);
      for (const warning of audit.warnings) {
        console.log(`      ⚠️  ${warning}`);
      }
    }
    console.log();
  }
  
  // Clean pages (green)
  if (cleanPages.length > 0) {
    console.log('✅ CLEAN PAGES\n');
    for (const audit of cleanPages) {
      console.log(`   ${audit.path} (${audit.lineCount} lines)`);
    }
    console.log();
  }
  
  // Summary
  console.log('='.repeat(70));
  console.log('📊 SUMMARY\n');
  console.log(`   Total pages scanned:    ${audits.length}`);
  console.log(`   Pages with issues:      ${pagesWithIssues.length}`);
  console.log(`   Pages with warnings:    ${pagesWithWarnings.length}`);
  console.log(`   Clean pages:            ${cleanPages.length}`);
  
  // Issue breakdown
  const issueTypes: Record<string, number> = {};
  for (const audit of audits) {
    for (const issue of [...audit.issues, ...audit.warnings]) {
      const key = issue.split(':')[0].split('(')[0].trim();
      issueTypes[key] = (issueTypes[key] || 0) + 1;
    }
  }
  
  if (Object.keys(issueTypes).length > 0) {
    console.log('\n   Issue breakdown:');
    for (const [type, count] of Object.entries(issueTypes).sort((a, b) => b[1] - a[1])) {
      console.log(`      ${count}x ${type}`);
    }
  }
  
  console.log('\n' + '='.repeat(70) + '\n');
  
  // Exit code
  const totalIssues = pagesWithIssues.length + assetIssues.length;
  if (totalIssues > 0) {
    console.log(`⛔ Audit failed with ${totalIssues} issue(s)\n`);
    process.exit(1);
  } else {
    console.log('✨ All pages pass audit!\n');
    process.exit(0);
  }
}

function main(): void {
  console.log('🔍 Scanning pages...\n');
  
  const pages = getAppPages();
  console.log(`Found ${pages.length} pages\n`);
  
  const audits = pages.map(auditPage);
  const assetIssues = checkPublicAssets();
  
  formatReport(audits, assetIssues);
}

main();
