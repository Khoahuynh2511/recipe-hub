/**
 * Fuse.js setup for local recipe search
 */

// Thêm khai báo module cho TypeScript
declare module 'fuse.js';

import Fuse from 'fuse.js';

// Type definition for local saved recipes
export interface SavedRecipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
  tags: string[];
}

// Cache for the Fuse instance
let fuseInstance: Fuse<SavedRecipe> | null = null;

// Fuse.js search options
const fuseOptions: Fuse.IFuseOptions<SavedRecipe> = {
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
 * Initialize Fuse.js with saved recipes data
 */
export async function initFuse(): Promise<Fuse<SavedRecipe>> {
  if (fuseInstance) {
    return fuseInstance;
  }

  try {
    // Get saved recipes from localStorage
    const savedRecipes: SavedRecipe[] = JSON.parse(localStorage.getItem('cookbook') || '[]');
    console.log(`Using ${savedRecipes.length} saved recipes for search`);
    
    // Create new Fuse instance
    fuseInstance = new Fuse(savedRecipes, fuseOptions);
    return fuseInstance;
  } catch (error) {
    console.error('Error initializing Fuse search:', error);
    // Create with empty data as fallback
    fuseInstance = new Fuse([], fuseOptions);
    return fuseInstance;
  }
}

/**
 * Search recipes with Fuse.js
 * @param query Search query
 * @param limit Maximum number of results (default 20)
 * @returns Array of matching recipes with scores
 */
export async function searchRecipes(query: string, limit = 20): Promise<Fuse.FuseResult<SavedRecipe>[]> {
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
export async function getRecipeById(id: string): Promise<SavedRecipe | null> {
  try {
    // Get saved recipes from localStorage
    const savedRecipes: SavedRecipe[] = JSON.parse(localStorage.getItem('cookbook') || '[]');
    return savedRecipes.find(recipe => recipe.id === id) || null;
  } catch (error) {
    console.error('Error getting recipe by ID:', error);
    return null;
  }
} 