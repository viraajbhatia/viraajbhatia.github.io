#!/usr/bin/env node

/**
 * Flag Gallery Build Script
 * 
 * This script reads all flag images from the /flags folder and generates
 * index.html from index_template.html with the flag gallery populated.
 * 
 * Usage: node build-flags.js
 * 
 * Run this script whenever you add new flags to the /flags folder.
 * 
 * Files:
 *   - index_template.html: The template file (commit this to git) - NEVER MODIFIED
 *   - index.html: Generated output for GitHub Pages
 * 
 * Template placeholders:
 *   - {{FLAGS_PLACEHOLDER}} - Replaced with flag HTML
 *   - {{FLAG_COUNT}} - Replaced with total number of flags
 */

const fs = require('fs');
const path = require('path');

const FLAGS_DIR = path.join(__dirname, 'flags');
const TEMPLATE_FILE = path.join(__dirname, 'index_template.html');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

// Function to format filename to country name
function formatCountryName(filename) {
  // Remove extension
  const name = path.parse(filename).name;
  
  // Handle special cases (typos and abbreviations)
  const specialNames = {
    'uae': 'UAE',
    'usa': 'USA',
    'uk': 'UK',
    'philapiens': 'Philippines',
    'somailia': 'Somalia',
    'hondurus': 'Honduras',
    'vietname': 'Vietnam',
    'vietnam': 'Vietnam',
    'knjkh': 'Unknown'
  };
  
  const lowerName = name.toLowerCase();
  if (specialNames[lowerName]) {
    return specialNames[lowerName];
  }
  
  // Capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Read flags from directory
function getFlags() {
  try {
    const files = fs.readdirSync(FLAGS_DIR);
    const flags = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .map(file => ({
        filename: file,
        name: formatCountryName(file),
        path: `flags/${file}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    
    return flags;
  } catch (error) {
    console.error('Error reading flags directory:', error.message);
    return [];
  }
}

// Generate HTML for flags
function generateFlagsHTML(flags) {
  if (flags.length === 0) {
    return `
              <div class="flag-item">
                <span class="flag-placeholder">🏳️</span>
                <span class="flag-name">No flags yet</span>
              </div>`;
  }
  
  return flags.map(flag => `
              <div class="flag-item" onclick="openFlagModal('${flag.path}', '${flag.name}')">
                <img src="${flag.path}" alt="${flag.name}">
                <span class="flag-name">${flag.name}</span>
              </div>`).join('');
}

// Generate index.html from template (template is NEVER modified)
function generateIndexHTML(flagsHTML, flagCount) {
  try {
    // Check if template exists
    if (!fs.existsSync(TEMPLATE_FILE)) {
      console.error(`❌ Template file not found: ${TEMPLATE_FILE}`);
      console.log('   Make sure index_template.html exists in the project root.');
      return false;
    }

    // Read template (read-only operation)
    let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');
    
    // Replace placeholders
    // {{FLAGS_PLACEHOLDER}} - the comment placeholder for flag HTML
    html = html.replace(
      /<!-- \{\{FLAGS_PLACEHOLDER\}\}.*?-->/,
      flagsHTML.trim()
    );
    
    // {{FLAG_COUNT}} - all occurrences
    html = html.replace(/\{\{FLAG_COUNT\}\}/g, flagCount.toString());
    
    // Write to OUTPUT file only (never write to template)
    fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
    return true;
  } catch (error) {
    console.error('Error generating index.html:', error.message);
    return false;
  }
}

// Main
function main() {
  console.log('🏁 Building Flag Gallery...\n');
  console.log(`📄 Template: index_template.html (read-only)`);
  console.log(`📄 Output:   index.html (generated)\n`);
  
  const flags = getFlags();
  console.log(`📁 Found ${flags.length} flags in /flags folder:`);
  flags.forEach(flag => console.log(`   - ${flag.name} (${flag.filename})`));
  
  const flagsHTML = generateFlagsHTML(flags);
  
  if (generateIndexHTML(flagsHTML, flags.length)) {
    console.log(`\n✅ Successfully generated index.html with ${flags.length} flags!`);
    console.log('🏎️ Refresh your browser to see the changes.');
    console.log('\n📝 Template (index_template.html) was NOT modified.');
  } else {
    console.log('\n❌ Failed to generate index.html');
    process.exit(1);
  }
}

main();
