/**
 * API helper functions for TheMealDB, CocktailDB, and Tasty
 */

// Type definitions for API responses
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: string; // For dynamic ingredient and measure properties
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strTags: string;
  [key: string]: string; // For dynamic ingredient and measure properties
}

export interface TastyRecipe {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  original_video_url: string;
}

// Base URLs for APIs
const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const COCKTAIL_DB_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const TASTY_API_BASE_URL = 'https://tasty.co/api';

// Helper function to fetch from any API
async function fetchApi<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// TheMealDB API functions
export async function getRandomMeal(): Promise<Meal | null> {
  const data = await fetchApi<{ meals: Meal[] }>(`${MEAL_DB_BASE_URL}/random.php`);
  return data.meals?.[0] || null;
}

export async function getMealById(id: string): Promise<Meal | null> {
  const data = await fetchApi<{ meals: Meal[] }>(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
  return data.meals?.[0] || null;
}

export async function searchMealsByName(query: string): Promise<Meal[]> {
  const data = await fetchApi<{ meals: Meal[] | null }>(`${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return data.meals || [];
}

export async function getMealCategories(): Promise<{ strCategory: string }[]> {
  const data = await fetchApi<{ meals: { strCategory: string }[] }>(`${MEAL_DB_BASE_URL}/list.php?c=list`);
  return data.meals || [];
}

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const data = await fetchApi<{ meals: Meal[] }>(`${MEAL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

export async function getMealAreas(): Promise<{ strArea: string }[]> {
  const data = await fetchApi<{ meals: { strArea: string }[] }>(`${MEAL_DB_BASE_URL}/list.php?a=list`);
  return data.meals || [];
}

export async function getMealsByArea(area: string): Promise<Meal[]> {
  const data = await fetchApi<{ meals: Meal[] }>(`${MEAL_DB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}

// TheCocktailDB API functions
export async function getRandomDrink(): Promise<Drink | null> {
  const data = await fetchApi<{ drinks: Drink[] }>(`${COCKTAIL_DB_BASE_URL}/random.php`);
  return data.drinks?.[0] || null;
}

export async function getDrinkById(id: string): Promise<Drink | null> {
  const data = await fetchApi<{ drinks: Drink[] }>(`${COCKTAIL_DB_BASE_URL}/lookup.php?i=${id}`);
  return data.drinks?.[0] || null;
}

export async function searchDrinksByName(query: string): Promise<Drink[]> {
  const data = await fetchApi<{ drinks: Drink[] | null }>(`${COCKTAIL_DB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return data.drinks || [];
}

export async function getDrinkCategories(): Promise<{ strCategory: string }[]> {
  const data = await fetchApi<{ drinks: { strCategory: string }[] }>(`${COCKTAIL_DB_BASE_URL}/list.php?c=list`);
  return data.drinks || [];
}

export async function getDrinksByCategory(category: string): Promise<Drink[]> {
  const data = await fetchApi<{ drinks: Drink[] }>(`${COCKTAIL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.drinks || [];
}

// Tasty API functions
export async function searchTastyRecipes(query: string): Promise<TastyRecipe[]> {
  try {
    const data = await fetchApi<{ results: TastyRecipe[] }>(`${TASTY_API_BASE_URL}/recipes/search?qs=${encodeURIComponent(query)}&from=0&size=5`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching from Tasty API:', error);
    return [];
  }
}

// Helper to extract ingredients and measures from meal or drink
export function extractIngredients(item: Meal | Drink): { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  
  return ingredients;
}

// Format meal tags to array
export function formatTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  return tags.split(',').map(tag => tag.trim()).filter(Boolean);
} 