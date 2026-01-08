#!/usr/bin/env node

/**
 * Duplicate Content Detector
 * Finds repeated text blocks that should use CanonicalSnippet
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const MIN_PHRASE_LENGTH = 15; // Words in a phrase to check
const SIMILARITY_THRESHOLD = 0.8;

function extractPhrases(text, length = MIN_PHRASE_LENGTH) {
  const words = text
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 0);
  
  const phrases = [];
  for (let i = 0; i <= words.length - length; i++) {
    phrases.push(words.slice(i, i + length).join(' '));
  }
  
  return phrases;
}

function findDuplicates() {
  const pagesDir = path.join(__dirname, '../app');
  const files = glob.sync(`${pagesDir}/**/page.tsx`, { ignore: ['**/node_modules/**'] });
  
  const phraseMap = new Map();
  
  // Build phrase index
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const phrases = extractPhrases(content);
    
    phrases.forEach(phrase => {
      if (!phraseMap.has(phrase)) {
        phraseMap.set(phrase, []);
      }
      phraseMap.get(phrase).push(path.relative(pagesDir, file));
    });
  });
  
  // Find duplicates
  const duplicates = [];
  phraseMap.forEach((files, phrase) => {
    if (files.length > 1) {
      duplicates.push({ phrase, files });
    }
  });
  
  if (duplicates.length === 0) {
    console.log('✅ No duplicate content found!\n');
    return;
  }
  
  console.log(`\n⚠️  Found ${duplicates.length} duplicate content blocks:\n`);
  
  duplicates.slice(0, 10).forEach(({ phrase, files }) => {
    console.log(`📝 "${phrase.slice(0, 60)}..."`);
    console.log(`   Found in: ${files.join(', ')}\n`);
  });
  
  if (duplicates.length > 10) {
    console.log(`   ... and ${duplicates.length - 10} more duplicates\n`);
  }
  
  console.log('💡 Consider moving these to content/copy.ts or CanonicalSnippet\n');
}

findDuplicates();
