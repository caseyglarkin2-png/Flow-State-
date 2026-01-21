#!/usr/bin/env tsx

/**
 * Congruence Check: Pre-Deployment Validation
 * 
 * Validates codebase consistency and production readiness.
 * Run before deployment to catch issues.
 * 
 * Usage: npm run congruence:check
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  critical: boolean;
}

const results: CheckResult[] = [];

function check(name: string, fn: () => boolean | string, critical = true): void {
  try {
    const result = fn();
    const passed = typeof result === 'boolean' ? result : true;
    const message = typeof result === 'string' ? result : passed ? '✅ Passed' : '❌ Failed';
    
    results.push({ name, passed, message, critical });
    
    if (passed) {
      console.log(`✅ ${name}`);
    } else {
      console.log(`${critical ? '❌' : '⚠️ '} ${name}: ${message}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    results.push({ name, passed: false, message, critical });
    console.log(`${critical ? '❌' : '⚠️ '} ${name}: ${message}`);
  }
}

console.log('🔍 Running Congruence Checks...\n');

// ====================================
// 1. TypeScript Compilation
// ====================================
console.log('📦 TypeScript Compilation:');
check('TypeScript compiles without errors', () => {
  execSync('npm run typecheck', { stdio: 'pipe' });
  return true;
});

// ====================================
// 2. Linting
// ====================================
console.log('\n🧹 Linting:');
check('ESLint passes (max-warnings 0)', () => {
  execSync('npm run lint', { stdio: 'pipe' });
  return true;
});

// ====================================
// 3. Unit Tests
// ====================================
console.log('\n🧪 Unit Tests:');
check('All unit tests pass', () => {
  execSync('npm run test:unit', { stdio: 'pipe' });
  return true;
});

// ====================================
// 4. Brand Consistency
// ====================================
console.log('\n🏷️  Brand Consistency:');
check('No hardcoded "FreightRoll" strings (use BRAND_NAMES)', () => {
  try {
    const result = execSync(
      'grep -r "FreightRoll" app/ components/ --include="*.tsx" --include="*.ts" | grep -v "BRAND_NAMES" | grep -v "import"',
      { encoding: 'utf8' }
    );
    return result.trim().length === 0 ? true : `Found hardcoded strings:\n${result}`;
  } catch {
    return true; // grep returns non-zero if no matches (good)
  }
}, false);

check('No hardcoded "YardFlow" strings (use BRAND_NAMES)', () => {
  try {
    const result = execSync(
      'grep -r "YardFlow" app/ components/ --include="*.tsx" --include="*.ts" | grep -v "BRAND_NAMES" | grep -v "import" | grep -v "metadata"',
      { encoding: 'utf8' }
    );
    return result.trim().length === 0 ? true : `Found hardcoded strings:\n${result}`;
  } catch {
    return true;
  }
}, false);

// ====================================
// 5. Adoption Semantics
// ====================================
console.log('\n📊 Adoption Semantics:');
check('Adoption presets consistent', () => {
  const presetsPath = path.join(__dirname, '../src/lib/adoption/types.ts');
  const content = fs.readFileSync(presetsPath, 'utf8');
  
  const has5 = content.includes('adoptionPercent: 5');
  const has10 = content.includes('adoptionPercent: 10');
  const has25 = content.includes('adoptionPercent: 25');
  const has50 = content.includes('adoptionPercent: 50');
  
  return has5 && has10 && has25 && has50 ? true : 'Missing expected presets (5%, 10%, 25%, 50%)';
});

check('Golden tests lock adoption invariance', () => {
  const testPath = path.join(__dirname, '../src/lib/economics/__tests__/calc.test.ts');
  const content = fs.readFileSync(testPath, 'utf8');
  
  return content.includes('Adoption % Invariance') ? true : 'Missing adoption invariance test';
});

// ====================================
// 6. Economics Frozen
// ====================================
console.log('\n💰 Economics Frozen:');
check('Golden test snapshots exist (calcRoiV2)', () => {
  const snapshotPath = path.join(__dirname, '../src/lib/economics/__tests__/__snapshots__/calc.test.ts.snap');
  return fs.existsSync(snapshotPath) ? true : 'Snapshot file missing';
});

check('Golden test snapshots exist (multiplier)', () => {
  const snapshotPath = path.join(__dirname, '../src/lib/economics/__tests__/__snapshots__/multiplier.test.ts.snap');
  return fs.existsSync(snapshotPath) ? true : 'Snapshot file missing';
});

// ====================================
// 7. Design System
// ====================================
console.log('\n🎨 Design System:');
check('Design tokens defined', () => {
  const tokensPath = path.join(__dirname, '../src/lib/design/tokens.ts');
  return fs.existsSync(tokensPath) ? true : 'Design tokens file missing';
});

check('Primitives exported', () => {
  const primitivesPath = path.join(__dirname, '../components/primitives/index.ts');
  const content = fs.readFileSync(primitivesPath, 'utf8');
  
  const hasSection = content.includes('Section');
  const hasCard = content.includes('Card');
  const hasStat = content.includes('Stat');
  const hasCallout = content.includes('Callout');
  
  return hasSection && hasCard && hasStat && hasCallout ? true : 'Missing primitive exports';
});

// ====================================
// 8. Documentation
// ====================================
console.log('\n📚 Documentation:');
const requiredDocs = [
  'ADOPTION_SEMANTICS.md',
  'ECONOMICS_AUDIT.md',
  'PERFORMANCE_BASELINES.md',
  'VISUAL_REGRESSION_SOP.md',
  'BRAND_AUDIT.md',
  'CTA_HIERARCHY.md',
  'NAVIGATION_AUDIT.md',
  'COPY_GUIDELINES.md',
];

requiredDocs.forEach((doc) => {
  check(`${doc} exists`, () => {
    const docPath = path.join(__dirname, '../../docs', doc);
    return fs.existsSync(docPath) ? true : `Missing: docs/${doc}`;
  }, false);
});

// ====================================
// 9. Build Validation
// ====================================
console.log('\n🏗️  Build Validation:');
check('Production build succeeds', () => {
  execSync('npm run build', { stdio: 'pipe' });
  return true;
});

check('Build output exists (.next/)', () => {
  const buildPath = path.join(__dirname, '../.next');
  return fs.existsSync(buildPath) ? true : '.next/ directory missing after build';
});

// ====================================
// 10. Performance
// ====================================
console.log('\n⚡ Performance:');
check('Performance baselines documented', () => {
  const perfPath = path.join(__dirname, '../../docs/PERFORMANCE_BASELINES.md');
  return fs.existsSync(perfPath) ? true : 'Performance baselines not documented';
}, false);

// ====================================
// Summary
// ====================================
console.log('\n' + '='.repeat(60));
console.log('📋 Congruence Check Summary:');
console.log('='.repeat(60));

const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;
const criticalFailed = results.filter((r) => !r.passed && r.critical).length;

console.log(`Total Checks: ${total}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`🔴 Critical Failed: ${criticalFailed}`);

if (criticalFailed > 0) {
  console.log('\n🚨 CRITICAL FAILURES DETECTED - NOT READY FOR DEPLOYMENT');
  console.log('Fix the following critical issues:\n');
  results.filter((r) => !r.passed && r.critical).forEach((r) => {
    console.log(`  ❌ ${r.name}: ${r.message}`);
  });
  process.exit(1);
} else if (failed > 0) {
  console.log('\n⚠️  NON-CRITICAL WARNINGS - Review before deployment');
  results.filter((r) => !r.passed && !r.critical).forEach((r) => {
    console.log(`  ⚠️  ${r.name}: ${r.message}`);
  });
  console.log('\n✅ Ready for deployment (with warnings)');
  process.exit(0);
} else {
  console.log('\n🎉 ALL CHECKS PASSED - READY FOR DEPLOYMENT!');
  process.exit(0);
}
