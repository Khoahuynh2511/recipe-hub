/**
 * Fuse.js setup for fuzzy search on OpenRecipes data
 */

// Thêm khai báo module cho TypeScript
declare module 'fuse.js';

import Fuse from 'fuse.js';

// Type definition for OpenRecipes data
export interface OpenRecipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
  tags: string[];
}

// Cache for the loaded data and Fuse instance
let recipesData: OpenRecipe[] | null = null;
let fuseInstance: Fuse<OpenRecipe> | null = null;

// Fuse.js search options
const fuseOptions: Fuse.IFuseOptions<OpenRecipe> = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'ingredients', weight: 1.5 },
    { name: 'tags', weight: 1 },
    { name: 'cuisine', weight: 0.8 },
    { name: 'instructions', weight: 0.5 },
  ],
  includeScore: true,
  threshold: 0.4,
  minMatchCharLength: 2,
};

/**
 * Initialize Fuse.js with OpenRecipes data
 * Loads the data from openrecipes.min.json if not already loaded
 */
export async function initFuse(): Promise<Fuse<OpenRecipe>> {
  if (fuseInstance) {
    return fuseInstance;
  }

  try {
    if (!recipesData) {
      // Load recipes data if not already loaded
      const response = await fetch('/openrecipes.min.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load OpenRecipes: ${response.status}`);
      }
      
      recipesData = await response.json();
      console.log(`Loaded ${recipesData!.length} recipes for search`);
    }
    
    // Create new Fuse instance
    fuseInstance = new Fuse(recipesData!, fuseOptions);
    return fuseInstance;
  } catch (error) {
    console.error('Error initializing Fuse search:', error);
    // Create with empty data as fallback
    recipesData = [];
    fuseInstance = new Fuse(recipesData, fuseOptions);
    return fuseInstance;
  }
}

/**
 * Search recipes with Fuse.js
 * @param query Search query
 * @param limit Maximum number of results (default 20)
 * @returns Array of matching recipes with scores
 */
export async function searchRecipes(query: string, limit = 20): Promise<Fuse.FuseResult<OpenRecipe>[]> {
  if (!query.trim()) {
    return [];
  }
  
  try {
    const fuse = await initFuse();
    const results = fuse.search(query, { limit });
    return results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

/**
 * Get a recipe by ID
 * @param id Recipe ID
 * @returns Recipe or null if not found
 */
export async function getRecipeById(id: string): Promise<OpenRecipe | null> {
  try {
    if (!recipesData) {
      await initFuse();
    }
    
    return recipesData?.find(recipe => recipe.id === id) || null;
  } catch (error) {
    console.error('Error getting recipe by ID:', error);
    return null;
  }
} 