/**
 * Script to fetch, process and optimize OpenRecipes data
 * This script runs during build time to create a compressed JSON file of recipes
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_URL = 'https://raw.githubusercontent.com/fictivekin/openrecipes/master/recipes.csv';
const OUTPUT_PATH = path.join(__dirname, '../public/openrecipes.min.json');

async function fetchOpenRecipes() {
  console.log('📥 Fetching OpenRecipes data...');
  
  try {
    const response = await fetch(CSV_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log(`✅ CSV data downloaded (${(csvText.length / 1024 / 1024).toFixed(2)} MB)`);
    
    // Parse CSV
    const { data } = Papa.parse(csvText, { header: true });
    console.log(`📊 Parsed ${data.length} recipes from CSV`);
    
    // Filter and transform data
    const filteredRecipes = data
      .filter(recipe => 
        recipe.title && 
        recipe.title.trim() !== '' && 
        recipe.ingredients &&
        recipe.ingredients.split(',').length <= 20
      )
      .map(recipe => ({
        id: generateId(recipe.title),
        title: recipe.title,
        ingredients: recipe.ingredients || '',
        instructions: recipe.instructions || '',
        cuisine: recipe.cuisine || '',
        tags: recipe.tags ? recipe.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
      }));
    
    console.log(`⚙️ Filtered to ${filteredRecipes.length} valid recipes`);
    
    // Write to JSON file
    fs.writeFileSync(
      OUTPUT_PATH, 
      JSON.stringify(filteredRecipes, null, 0),
      'utf8'
    );
    
    const fileStats = fs.statSync(OUTPUT_PATH);
    const fileSizeMB = (fileStats.size / 1024 / 1024).toFixed(2);
    
    console.log(`💾 Saved to ${OUTPUT_PATH} (${fileSizeMB} MB)`);
    
    // Check if file is too large
    if (fileStats.size > 2 * 1024 * 1024) {
      console.warn('⚠️ Warning: JSON file is larger than 2MB target size');
    }
    
  } catch (error) {
    console.error('❌ Error processing OpenRecipes:', error);
    // Create an empty file to prevent build failures
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([]), 'utf8');
    console.log('⚠️ Created empty file instead to continue build process');
  }
}

// Generate deterministic ID from recipe title
function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Run the function
fetchOpenRecipes(); 