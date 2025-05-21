/**
 * Store utilities for persisting user data in IndexedDB with localStorage fallback
 * Uses idb-keyval for IndexedDB interactions
 */

// Thêm khai báo module cho TypeScript
declare module 'idb-keyval';

import { get, set, del, createStore } from 'idb-keyval';
import type { Meal, Drink } from './api';

// Create a custom store for our app
const recipeStore = createStore('recipe-hub-db', 'user-data');

// Keys for storing different types of data
const KEYS = {
  COOKBOOK: 'cookbook',
  SHOPPING_LIST: 'shopping-list',
  FAVORITES: 'favorites',
  RECENT_VIEWS: 'recent-views',
};

// Type definitions for stored data
export interface CookbookItem {
  id: string;
  type: 'meal' | 'drink';
  data: Meal | Drink;
  dateAdded: number;
  notes?: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: 'meat' | 'produce' | 'dairy' | 'bakery' | 'dry goods' | 'other';
  recipe?: string; // Name of recipe it's from
  dateAdded: number;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Utility function to check if IndexedDB is available
function isIndexedDBAvailable(): boolean {
  try {
    return isBrowser && typeof indexedDB !== 'undefined';
  } catch (e) {
    return false;
  }
}

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    return isBrowser && typeof localStorage !== 'undefined';
  } catch (e) {
    return false;
  }
}

// localStorage fallback methods
const localStorageFallback = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      if (!isLocalStorageAvailable()) return undefined;
      
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return undefined;
    }
  },
  
  async set<T>(key: string, value: T): Promise<void> {
    try {
      if (!isLocalStorageAvailable()) return;
      
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage:', e);
    }
  },
  
  async del(key: string): Promise<void> {
    try {
      if (!isLocalStorageAvailable()) return;
      
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  }
};

// Generic storage functions with fallback
async function getData<T>(key: string): Promise<T | undefined> {
  // If we're not in a browser environment, return undefined
  if (!isBrowser) return undefined;
  
  try {
    if (isIndexedDBAvailable()) {
      return await get<T>(key, recipeStore);
    } else {
      return await localStorageFallback.get<T>(key);
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return undefined;
  }
}

async function setData<T>(key: string, value: T): Promise<void> {
  // If we're not in a browser environment, do nothing
  if (!isBrowser) return;
  
  try {
    if (isIndexedDBAvailable()) {
      await set(key, value, recipeStore);
    } else {
      await localStorageFallback.set(key, value);
    }
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
}

async function deleteData(key: string): Promise<void> {
  // If we're not in a browser environment, do nothing
  if (!isBrowser) return;
  
  try {
    if (isIndexedDBAvailable()) {
      await del(key, recipeStore);
    } else {
      await localStorageFallback.del(key);
    }
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
  }
}

// Cookbook functions
export async function getCookbook(): Promise<CookbookItem[]> {
  const cookbook = await getData<CookbookItem[]>(KEYS.COOKBOOK);
  return cookbook || [];
}

export async function addToCookbook(item: Omit<CookbookItem, 'dateAdded'>): Promise<void> {
  const cookbook = await getCookbook();
  
  // Check if it already exists
  const exists = cookbook.some(entry => entry.id === item.id && entry.type === item.type);
  
  if (!exists) {
    cookbook.push({
      ...item,
      dateAdded: Date.now(),
    });
    await setData(KEYS.COOKBOOK, cookbook);
  }
}

export async function removeFromCookbook(id: string, type: 'meal' | 'drink'): Promise<void> {
  const cookbook = await getCookbook();
  const updatedCookbook = cookbook.filter(item => !(item.id === id && item.type === type));
  await setData(KEYS.COOKBOOK, updatedCookbook);
}

export async function isInCookbook(id: string, type: 'meal' | 'drink'): Promise<boolean> {
  const cookbook = await getCookbook();
  return cookbook.some(item => item.id === id && item.type === type);
}

// Shopping list functions
export async function getShoppingList(): Promise<ShoppingListItem[]> {
  const list = await getData<ShoppingListItem[]>(KEYS.SHOPPING_LIST);
  return list || [];
}

export async function addToShoppingList(item: Omit<ShoppingListItem, 'dateAdded'>): Promise<void> {
  const list = await getShoppingList();
  
  // Check for duplicates and merge quantities if found
  const existingIndex = list.findIndex(i => 
    i.name.toLowerCase() === item.name.toLowerCase() && i.category === item.category
  );
  
  if (existingIndex >= 0) {
    // Update quantity
    list[existingIndex].quantity = mergeQuantities(list[existingIndex].quantity, item.quantity);
    if (item.recipe && !list[existingIndex].recipe?.includes(item.recipe)) {
      list[existingIndex].recipe = list[existingIndex].recipe 
        ? `${list[existingIndex].recipe}, ${item.recipe}` 
        : item.recipe;
    }
  } else {
    // Add new item
    list.push({
      ...item,
      dateAdded: Date.now(),
    });
  }
  
  await setData(KEYS.SHOPPING_LIST, list);
}

export async function updateShoppingListItem(id: string, updates: Partial<ShoppingListItem>): Promise<void> {
  const list = await getShoppingList();
  const updatedList = list.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
  await setData(KEYS.SHOPPING_LIST, updatedList);
}

export async function removeFromShoppingList(id: string): Promise<void> {
  const list = await getShoppingList();
  const updatedList = list.filter(item => item.id !== id);
  await setData(KEYS.SHOPPING_LIST, updatedList);
}

export async function clearShoppingList(): Promise<void> {
  await setData(KEYS.SHOPPING_LIST, []);
}

// Helper to merge quantities in a reasonable way
function mergeQuantities(existing: string, adding: string): string {
  if (!existing) return adding;
  if (!adding) return existing;
  
  // Try to handle number-based quantities
  const existingNum = parseFloat(existing);
  const addingNum = parseFloat(adding);
  
  if (!isNaN(existingNum) && !isNaN(addingNum)) {
    // Both are numbers, add them
    return `${existingNum + addingNum}`;
  }
  
  // Handle mixed formats or text
  return `${existing}, ${adding}`;
}

// Export shopping list as CSV
export async function exportShoppingListCSV(): Promise<string> {
  const list = await getShoppingList();
  
  // Sort by category
  list.sort((a, b) => a.category.localeCompare(b.category));
  
  // Convert to CSV
  let csv = 'Item,Quantity,Category,Recipe\n';
  
  for (const item of list) {
    const escapedName = item.name.includes(',') ? `"${item.name}"` : item.name;
    const escapedQuantity = item.quantity.includes(',') ? `"${item.quantity}"` : item.quantity;
    const escapedRecipe = item.recipe?.includes(',') ? `"${item.recipe}"` : item.recipe || '';
    
    csv += `${escapedName},${escapedQuantity},${item.category},${escapedRecipe}\n`;
  }
  
  return csv;
}

// Recent views tracking
export async function addToRecentViews(id: string, type: 'meal' | 'drink'): Promise<void> {
  // Skip in non-browser environments
  if (!isBrowser) return;
  
  // Get existing views
  const views = await getData<Array<{id: string, type: string, date: number}>>(KEYS.RECENT_VIEWS) || [];
  
  // Remove if already exists
  const filteredViews = views.filter(item => !(item.id === id && item.type === type));
  
  // Add to the beginning of the array
  filteredViews.unshift({
    id,
    type,
    date: Date.now()
  });
  
  // Keep only the latest 10 views
  const limitedViews = filteredViews.slice(0, 10);
  
  // Save
  await setData(KEYS.RECENT_VIEWS, limitedViews);
}

export async function getRecentViews(): Promise<Array<{id: string, type: string, date: number}>> {
  // Skip in non-browser environments
  if (!isBrowser) return [];
  
  const views = await getData<Array<{id: string, type: string, date: number}>>(KEYS.RECENT_VIEWS);
  return views || [];
} 