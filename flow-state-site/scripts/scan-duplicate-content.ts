#!/usr/bin/env tsx
/**
 * DUPLICATE CONTENT SCANNER
 * 
 * Scans all pages and components for duplicate strings to prevent content bloat.
 * Run: npm run content:scan-duplicates
 */

import fs from 'fs';
import path from 'path';

const MIN_PHRASE_LENGTH = 15; // Only flag strings this long or longer
const MIN_OCCURRENCES = 2; // Must appear at least this many times

type DuplicateEntry = {
  text: string;
  count: number;
  locations: Array<{ file: string; line: number }>;
};

function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'out' && file !== '_next') {
        walkDir(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (!file.includes('.test.') && !file.includes('.spec.') && file !== 'types.ts') {
        fileList.push(filePath);
      }
    }
  }
  
  return fileList;
}

async function scanForDuplicates() {
  console.log('🔍 Scanning for duplicate content across pages and components...\n');

  // Get all TSX/TS files in app and components
  const appFiles = walkDir(path.join(process.cwd(), 'app'));
  const componentFiles = walkDir(path.join(process.cwd(), 'components'));
  const files = [...appFiles, ...componentFiles];

  const stringCounts = new Map<string, DuplicateEntry>();

  // Extract strings from JSX text content
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Extract text between > and < in JSX
      const jsxTextMatches = line.matchAll(/>\s*([^<>{]+?)\s*</g);
      for (const match of jsxTextMatches) {
        const text = match[1].trim();
        if (text.length >= MIN_PHRASE_LENGTH && !text.startsWith('{') && !text.startsWith('//')) {
          const normalized = text.replace(/\s+/g, ' ').trim();
          
          if (!stringCounts.has(normalized)) {
            stringCounts.set(normalized, {
              text: normalized,
              count: 0,
              locations: [],
            });
          }
          
          const entry = stringCounts.get(normalized)!;
          entry.count++;
          entry.locations.push({
            file: file.replace(process.cwd(), ''),
            line: index + 1,
          });
        }
      }

      // Extract string literals in code
      const stringMatches = line.matchAll(/['"`]([^'"`]{15,}?)['"`]/g);
      for (const match of stringMatches) {
        const text = match[1].trim();
        if (text.length >= MIN_PHRASE_LENGTH && !text.includes('\\') && !text.includes('http')) {
          const normalized = text.replace(/\s+/g, ' ').trim();
          
          if (!stringCounts.has(normalized)) {
            stringCounts.set(normalized, {
              text: normalized,
              count: 0,
              locations: [],
            });
          }
          
          const entry = stringCounts.get(normalized)!;
          entry.count++;
          entry.locations.push({
            file: file.replace(process.cwd() + '/', ''),
            line: index + 1,
          });
        }
      }
    });
  }

  // Filter and sort duplicates
  const duplicates = Array.from(stringCounts.values())
    .filter((entry) => entry.count >= MIN_OCCURRENCES)
    .sort((a, b) => b.count - a.count);

  console.log(`Found ${duplicates.length} duplicate strings\n`);
  console.log('═'.repeat(80));

  // Report by category
  const highPriority = duplicates.filter((d) => d.count >= 5);
  const mediumPriority = duplicates.filter((d) => d.count >= 3 && d.count < 5);
  const lowPriority = duplicates.filter((d) => d.count === 2);

  if (highPriority.length > 0) {
    console.log('\n🚨 HIGH PRIORITY (5+ occurrences) - Move to /content/copy.ts:\n');
    highPriority.forEach((dup) => {
      console.log(`  "${dup.text.slice(0, 60)}..." (${dup.count}×)`);
      dup.locations.forEach((loc) => {
        console.log(`    - ${loc.file}:${loc.line}`);
      });
      console.log('');
    });
  }

  if (mediumPriority.length > 0) {
    console.log('\n⚠️  MEDIUM PRIORITY (3-4 occurrences) - Consider extracting:\n');
    mediumPriority.forEach((dup) => {
      console.log(`  "${dup.text.slice(0, 60)}..." (${dup.count}×)`);
      dup.locations.slice(0, 3).forEach((loc) => {
        console.log(`    - ${loc.file}:${loc.line}`);
      });
      console.log('');
    });
  }

  console.log(`\n📊 SUMMARY:`);
  console.log(`  High priority duplicates: ${highPriority.length}`);
  console.log(`  Medium priority duplicates: ${mediumPriority.length}`);
  console.log(`  Low priority duplicates: ${lowPriority.length}`);
  console.log(`  Total duplicate strings: ${duplicates.length}`);
  console.log('');
  console.log('💡 TIP: Move repeated copy to /content/copy.ts and import from there.');
  console.log('');

  // Exit with error if high priority duplicates found
  if (highPriority.length > 0) {
    console.log('⚠️  High priority duplicates found. Consider refactoring before shipping.');
    process.exit(1);
  }
}

scanForDuplicates().catch((err) => {
  console.error('Error scanning duplicates:', err);
  process.exit(1);
});
