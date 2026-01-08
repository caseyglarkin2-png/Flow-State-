#!/usr/bin/env node

/**
 * Content Budget Validator
 * Enforces homepage word limit and section count
 */

const fs = require('fs');
const path = require('path');

const HOMEPAGE_WORD_LIMIT = 600;
const HOMEPAGE_SECTION_LIMIT = 5;

function countWords(text) {
  // Remove JSX/TSX syntax, keeping only readable content
  const cleaned = text
    .replace(/<[^>]+>/g, ' ') // Remove JSX tags
    .replace(/\{[^}]+\}/g, ' ') // Remove JSX expressions
    .replace(/['"`]/g, '') // Remove quotes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  return cleaned.split(' ').filter(word => word.length > 0).length;
}

function countSections(content) {
  // Count top-level <section> tags
  const sections = content.match(/<section[^>]*>/g);
  return sections ? sections.length : 0;
}

function extractTextContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract return statement content (the JSX)
  const returnMatch = content.match(/return\s*\(([\s\S]*)\);?\s*}/);
  if (!returnMatch) {
    throw new Error('Could not find return statement in component');
  }
  
  return returnMatch[1];
}

function validateHomepage() {
  const homepagePath = path.join(__dirname, '../app/page.tsx');
  
  if (!fs.existsSync(homepagePath)) {
    console.error('❌ Homepage not found at', homepagePath);
    process.exit(1);
  }
  
  const content = extractTextContent(homepagePath);
  const wordCount = countWords(content);
  const sectionCount = countSections(content);
  
  console.log('\n📊 Homepage Content Budget\n');
  console.log(`Words: ${wordCount} / ${HOMEPAGE_WORD_LIMIT} ${wordCount <= HOMEPAGE_WORD_LIMIT ? '✅' : '❌'}`);
  console.log(`Sections: ${sectionCount} / ${HOMEPAGE_SECTION_LIMIT} ${sectionCount <= HOMEPAGE_SECTION_LIMIT ? '✅' : '❌'}`);
  
  const passed = wordCount <= HOMEPAGE_WORD_LIMIT && sectionCount <= HOMEPAGE_SECTION_LIMIT;
  
  if (!passed) {
    console.error('\n❌ Content budget exceeded!\n');
    if (wordCount > HOMEPAGE_WORD_LIMIT) {
      console.error(`  Remove ${wordCount - HOMEPAGE_WORD_LIMIT} words`);
    }
    if (sectionCount > HOMEPAGE_SECTION_LIMIT) {
      console.error(`  Remove ${sectionCount - HOMEPAGE_SECTION_LIMIT} sections`);
    }
    process.exit(1);
  }
  
  console.log('\n✅ Content budget check passed!\n');
  process.exit(0);
}

// Run validation
validateHomepage();
