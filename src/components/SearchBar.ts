/**
 * SearchBar component for real-time search functionality
 * This is a vanilla TypeScript component that works without any framework dependencies
 */

import { searchRecipes } from '../lib/fuse';
import { searchMealsByName, searchDrinksByName } from '../lib/api';
import type { SavedRecipe } from '../lib/fuse';
import type { Meal, Drink } from '../lib/api';

// Core search functionality
export class SearchBar {
  private inputElement: HTMLInputElement;
  private resultsContainer: HTMLElement;
  private loadingIndicator: HTMLElement;
  private searchTimeout: number | null = null;
  private minSearchLength = 2;
  private debounceTime = 300; // ms
  private isSearching = false;
  private lastQuery = '';

  constructor(inputId: string, resultsContainerId: string, loadingIndicatorId: string) {
    // Get DOM elements
    this.inputElement = document.getElementById(inputId) as HTMLInputElement;
    this.resultsContainer = document.getElementById(resultsContainerId) as HTMLElement;
    this.loadingIndicator = document.getElementById(loadingIndicatorId) as HTMLElement;
    
    if (!this.inputElement || !this.resultsContainer) {
      console.error('SearchBar: Required DOM elements not found');
      return;
    }
    
    // Set up event listeners
    this.inputElement.addEventListener('input', this.handleInput.bind(this));
    this.inputElement.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Initialize with URL params if present
    this.initFromUrl();
  }
  
  private handleInput(): void {
    const query = this.inputElement.value.trim();
    
    // Clear previous timeout
    if (this.searchTimeout) {
      window.clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
    
    // Clear results if query is too short
    if (query.length < this.minSearchLength) {
      this.resultsContainer.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <p>Vui lòng nhập ít nhất ${this.minSearchLength} ký tự để tìm kiếm</p>
        </div>
      `;
      this.hideLoading();
      this.lastQuery = '';
      return;
    }
    
    // Don't perform the same search again
    if (query === this.lastQuery) {
      return;
    }
    
    // Show loading indicator
    this.showLoading();
    
    // Debounce search
    this.searchTimeout = window.setTimeout(() => {
      this.performSearch(query);
      // Update browser history
      this.updateUrlParam(query);
    }, this.debounceTime);
  }
  
  private handleKeyDown(e: KeyboardEvent): void {
    // Execute search immediately on Enter
    if (e.key === 'Enter') {
      const query = this.inputElement.value.trim();
      
      if (this.searchTimeout) {
        window.clearTimeout(this.searchTimeout);
        this.searchTimeout = null;
      }
      
      if (query.length >= this.minSearchLength) {
        this.showLoading();
        this.performSearch(query);
        this.updateUrlParam(query);
      }
    }
  }
  
  private async performSearch(query: string): Promise<void> {
    if (this.isSearching) return;
    
    this.isSearching = true;
    this.lastQuery = query;
    
    try {
      // Perform different searches in parallel
      const [mealResults, drinkResults] = await Promise.all([
        searchMealsByName(query),
        searchDrinksByName(query)
      ]);
      
      // Create sections for the results
      const mealResultsHtml = this.generateMealResultsHtml(mealResults);
      const drinkResultsHtml = this.generateDrinkResultsHtml(drinkResults);
      
      // Combine results
      const combinedResults = `
        <h2 class="text-2xl font-bold mb-6">Kết quả tìm kiếm cho "${query}"</h2>
        
        ${mealResultsHtml}
        ${drinkResultsHtml}
        
        ${!mealResults.length && !drinkResults.length ? `
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <p class="text-gray-600 mb-2">Không tìm thấy kết quả nào phù hợp</p>
            <p class="text-gray-500 text-sm">Hãy thử từ khóa khác hoặc kiểm tra lỗi chính tả</p>
          </div>
        ` : ''}
      `;
      
      this.resultsContainer.innerHTML = combinedResults;
    } catch (error) {
      console.error('Search error:', error);
      this.resultsContainer.innerHTML = `
        <div class="text-center py-12 bg-red-50 rounded-lg">
          <p class="text-red-600 mb-2">Đã xảy ra lỗi khi tìm kiếm</p>
          <p class="text-red-500 text-sm">Vui lòng thử lại sau</p>
        </div>
      `;
    } finally {
      this.hideLoading();
      this.isSearching = false;
    }
  }
  
  private generateMealResultsHtml(meals: Meal[]): string {
    if (!meals.length) return '';
    
    return `
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Món ăn (${meals.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${meals.map(meal => `
            <a href="/recipe/meal/${meal.idMeal}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${meal.strMealThumb}" 
                  alt="${meal.strMeal}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${meal.strMeal}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${meal.strCategory ? `
                    <span class="badge bg-gray-100 text-gray-800">
                      ${meal.strCategory}
                    </span>
                  ` : ''}
                  
                  ${meal.strArea ? `
                    <span class="badge bg-gray-100 text-gray-800">
                      ${meal.strArea}
                    </span>
                  ` : ''}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }
  
  private generateDrinkResultsHtml(drinks: Drink[]): string {
    if (!drinks.length) return '';
    
    return `
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Đồ uống (${drinks.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${drinks.map(drink => `
            <a href="/recipe/drink/${drink.idDrink}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${drink.strDrinkThumb}" 
                  alt="${drink.strDrink}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                ${drink.strAlcoholic ? `
                  <span class="absolute top-2 right-2 badge badge-primary">
                    ${drink.strAlcoholic}
                  </span>
                ` : ''}
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${drink.strDrink}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${drink.strCategory ? `
                    <span class="badge bg-gray-100 text-gray-800">
                      ${drink.strCategory}
                    </span>
                  ` : ''}
                  
                  ${drink.strGlass ? `
                    <span class="badge bg-gray-100 text-gray-800">
                      ${drink.strGlass}
                    </span>
                  ` : ''}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }
  
  private showLoading(): void {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.remove('hidden');
    }
  }
  
  private hideLoading(): void {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('hidden');
    }
  }
  
  private updateUrlParam(query: string): void {
    // Update URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.replaceState({}, '', url.toString());
  }
  
  private initFromUrl(): void {
    // Check if there's a query parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    
    if (query && query.length >= this.minSearchLength) {
      this.inputElement.value = query;
      this.showLoading();
      this.performSearch(query);
    }
  }
}

// Intialize the search functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const searchInputId = 'search-input';
  const resultsContainerId = 'search-results';
  const loadingIndicatorId = 'search-loading';
  
  if (document.getElementById(searchInputId)) {
    new SearchBar(searchInputId, resultsContainerId, loadingIndicatorId);
  }
});

export default SearchBar; 