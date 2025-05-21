/**
 * Pairing system using TensorFlow Universal Sentence Encoder
 * to recommend drink pairings for meals based on semantic similarity
 */

// Thêm khai báo module cho TypeScript
declare module '@tensorflow/tfjs';
declare module '@tensorflow-models/universal-sentence-encoder';

import * as tf from '@tensorflow/tfjs';
import { load as loadUSE } from '@tensorflow-models/universal-sentence-encoder';
import { Meal, Drink, getDrinkById, searchDrinksByName } from './api';

// Type for embedding vectors
type EmbeddingVector = Float32Array | number[];

// Type for paired recommendations
export interface PairingResult {
  drink: Drink;
  score: number;
  reason: string;
}

// Cache for the model to avoid reloading
let useModel: any = null;

// Rule-based pairings for specific meal types
const PAIRING_RULES = [
  { 
    mealCategory: 'Seafood', 
    drinkCategories: ['Ordinary Drink', 'Cocktail'],
    drinkIngredients: ['gin', 'vodka', 'white rum', 'tequila', 'lemon', 'lime', 'citrus'],
    bonus: 0.2,
    reason: 'Citrus and spirit drinks complement seafood flavors'
  },
  { 
    mealCategory: 'Beef', 
    drinkCategories: ['Ordinary Drink', 'Cocktail'],
    drinkIngredients: ['whiskey', 'bourbon', 'rye', 'brandy'],
    bonus: 0.2,
    reason: 'Robust whiskey-based drinks complement hearty beef dishes' 
  },
  { 
    mealCategory: 'Chicken', 
    drinkCategories: ['Ordinary Drink'],
    drinkIngredients: ['gin', 'vodka', 'white wine'],
    bonus: 0.15,
    reason: 'Light spirits pair well with chicken dishes'
  },
  { 
    mealCategory: 'Dessert', 
    drinkCategories: ['Shake', 'Coffee / Tea', 'Ordinary Drink', 'Cocktail'],
    drinkIngredients: ['coffee', 'cream', 'milk', 'chocolate', 'vanilla', 'baileys', 'kahlua'],
    bonus: 0.25,
    reason: 'Creamy or sweet drinks enhance dessert flavors'
  },
  { 
    mealCategory: 'Pasta', 
    drinkCategories: ['Ordinary Drink', 'Other/Unknown'],
    drinkIngredients: ['wine', 'vermouth', 'campari', 'aperol'],
    bonus: 0.2,
    reason: 'Italian-style aperitifs complement pasta dishes'
  },
  { 
    mealCategory: 'Vegetarian', 
    drinkCategories: ['Other/Unknown', 'Soft Drink'],
    drinkIngredients: ['fruit', 'herb', 'cucumber', 'citrus'],
    bonus: 0.15,
    reason: 'Fresh, plant-based ingredients in drinks complement vegetarian meals'
  },
  { 
    mealCategory: 'Breakfast', 
    drinkCategories: ['Coffee / Tea', 'Shake', 'Soft Drink'],
    drinkIngredients: ['orange', 'coffee', 'milk', 'juice'],
    bonus: 0.3,
    reason: 'Breakfast-friendly drinks to start the day'
  },
  { 
    mealCategory: 'Spicy', 
    drinkCategories: ['Ordinary Drink', 'Beer'],
    drinkIngredients: ['lime', 'lemon', 'citrus', 'beer'],
    bonus: 0.25,
    reason: 'Cooling drinks that balance spicy food'
  }
];

/**
 * Initialize the Universal Sentence Encoder model
 */
async function initModel() {
  if (useModel) {
    return useModel;
  }

  try {
    console.log('Loading Universal Sentence Encoder model...');
    // First ensure TensorFlow.js is ready
    await tf.ready();
    // Then load the Universal Sentence Encoder model
    useModel = await loadUSE();
    console.log('Model loaded successfully');
    return useModel;
  } catch (error) {
    console.error('Error loading USE model:', error);
    throw new Error('Failed to load text embedding model');
  }
}

/**
 * Generate text embedding for a given text
 */
async function generateEmbedding(text: string): Promise<EmbeddingVector> {
  const model = await initModel();
  const embeddings = await model.embed([text]);
  const embedding = await embeddings.array();
  return embedding[0]; // Return the first (and only) embedding
}

/**
 * Calculate cosine similarity between two embedding vectors
 */
function cosineSimilarity(a: EmbeddingVector, b: EmbeddingVector): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same dimensionality');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Apply rule-based bonuses to the base similarity score
 */
function applyRuleBasedBonus(meal: Meal, drink: Drink, baseScore: number): { score: number, reason: string | null } {
  let bestBonus = 0;
  let bestReason: string | null = null;

  // Get lowercase drink ingredients for matching
  const drinkIngredientKeys = Object.keys(drink).filter(key => 
    key.startsWith('strIngredient') && drink[key]
  );
  
  const drinkIngredients = drinkIngredientKeys
    .map(key => drink[key].toLowerCase())
    .filter(Boolean);

  // Check against each rule
  for (const rule of PAIRING_RULES) {
    const mealMatches = meal.strCategory.toLowerCase().includes(rule.mealCategory.toLowerCase());
    const drinkCategoryMatches = rule.drinkCategories.some(
      cat => drink.strCategory.toLowerCase().includes(cat.toLowerCase())
    );
    
    const ingredientMatches = rule.drinkIngredients.some(ingredient => 
      drinkIngredients.some(drinkIng => drinkIng.includes(ingredient))
    );

    // Apply bonus if there's a match
    if ((mealMatches && drinkCategoryMatches) || (mealMatches && ingredientMatches)) {
      if (rule.bonus > bestBonus) {
        bestBonus = rule.bonus;
        bestReason = rule.reason;
      }
    }
  }

  return { 
    score: baseScore + bestBonus,
    reason: bestReason
  };
}

/**
 * Get drink pairing recommendations for a meal
 */
export async function getDrinkPairingForMeal(meal: Meal, limit = 5): Promise<PairingResult[]> {
  try {
    // Create a rich description from the meal data
    const mealDescription = `${meal.strMeal} ${meal.strCategory} ${meal.strArea} ${meal.strTags || ''}`;
    const mealEmbedding = await generateEmbedding(mealDescription);
    
    // Get a variety of drinks to compare
    // First get drinks from the meal's first letter for some variety
    const firstLetterDrinks = await searchDrinksByName(meal.strMeal.charAt(0));
    
    // Then get some popular drink categories
    const popularCategories = ['Cocktail', 'Ordinary Drink', 'Beer', 'Soft Drink', 'Coffee / Tea', 'Shot'];
    let categoryPromises = popularCategories.map(async (category) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      const data = await response.json();
      // Return just a few from each category
      return (data.drinks || []).slice(0, 3);
    });
    
    const categoryResults = await Promise.all(categoryPromises);
    
    // Combine all the drink IDs, removing duplicates
    const allDrinkIds = new Set<string>();
    
    firstLetterDrinks.forEach(drink => allDrinkIds.add(drink.idDrink));
    categoryResults.forEach(categoryDrinks => 
      categoryDrinks.forEach(drink => allDrinkIds.add(drink.idDrink))
    );
    
    // For each drink ID, get full details and calculate similarity
    const drinkPromises = Array.from(allDrinkIds).map(async (id) => {
      const drink = await getDrinkById(id);
      if (!drink) return null;
      
      // Create a description for the drink similar to the meal
      const drinkDescription = `${drink.strDrink} ${drink.strCategory} ${drink.strAlcoholic} ${drink.strGlass} ${drink.strTags || ''}`;
      const drinkEmbedding = await generateEmbedding(drinkDescription);
      
      // Calculate base cosine similarity
      const similarity = cosineSimilarity(mealEmbedding, drinkEmbedding);
      
      // Apply rule-based bonuses
      const { score, reason } = applyRuleBasedBonus(meal, drink, similarity);
      
      return {
        drink,
        score,
        reason: reason || 'Good semantic match based on flavor profile'
      };
    });
    
    const pairings = (await Promise.all(drinkPromises))
      .filter(Boolean) as PairingResult[];
    
    // Sort by score and return top results
    return pairings
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    
  } catch (error) {
    console.error('Error generating drink pairings:', error);
    return [];
  }
} 