/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, g as addAttribute, m as maybeRenderHead, h as renderHead, i as renderSlot, j as renderComponent } from '../astro_5234216a.mjs';
import 'html-escaper';
import 'clsx';

const $$Astro$2 = createAstro("https://recipe-hub.netlify.app");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title,
    description = "Discover delicious food recipes and drinks from around the world",
    image = "/images/default-og.jpg"
  } = Astro2.props;
  const siteUrl = "https://recipe-hub.netlify.app" ;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/icons/logo.png"><title>${title} | RecipeHub</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url.href, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, siteUrl).href, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url.href, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, siteUrl).href, "content")}><!-- Preload fonts --><link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">${maybeRenderHead()}<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet" type="text/css"></noscript><!-- PWA tags --><meta name="theme-color" content="#38a169"><link rel="manifest" href="/manifest.json"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><!-- Service worker registration -->${renderHead()}</head> <body class="min-h-screen bg-gray-50 text-gray-900 flex flex-col"> <header class="bg-white shadow-sm sticky top-0 z-10"> <div class="container mx-auto px-4 py-3 flex items-center justify-between"> <!-- Logo --> <a href="/" class="flex items-center gap-2"> <img src="/icons/logo.png" alt="RecipeHub Logo" class="h-8"> <span class="font-display font-bold text-xl text-primary-600">RecipeHub</span> </a> <!-- Navigation --> <nav class="hidden md:flex items-center gap-6"> <a href="/" class="text-gray-700 hover:text-primary-600 font-medium">Home</a> <a href="/explore" class="text-gray-700 hover:text-primary-600 font-medium">Explore</a> <a href="/search" class="text-gray-700 hover:text-primary-600 font-medium">Search</a> </nav> <!-- Mobile menu button --> <button id="mobile-menu-button" class="md:hidden flex items-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100" aria-label="Menu"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> <!-- Shopping list / Cookbook button --> <button id="toggle-sidebar" class="ml-4 flex items-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100" aria-label="Saved recipes and shopping list"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </button> </div> <!-- Mobile Navigation --> <div id="mobile-menu" class="md:hidden hidden bg-white border-t border-gray-100"> <div class="container mx-auto px-4 py-3 flex flex-col gap-3"> <a href="/" class="text-gray-700 hover:text-primary-600 py-2 font-medium">Home</a> <a href="/explore" class="text-gray-700 hover:text-primary-600 py-2 font-medium">Explore</a> <a href="/search" class="text-gray-700 hover:text-primary-600 py-2 font-medium">Search</a> </div> </div> </header> <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-gray-800 text-white py-6"> <div class="container mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div> <h3 class="text-lg font-semibold mb-3">RecipeHub</h3> <p class="text-gray-300 text-sm">
Discover delicious food recipes and drinks from around the world
</p> </div> <div> <h3 class="text-lg font-semibold mb-3">Links</h3> <ul class="space-y-2 text-gray-300 text-sm"> <li><a href="/" class="hover:text-primary-300">Home</a></li> <li><a href="/explore" class="hover:text-primary-300">Explore</a></li> <li><a href="/search" class="hover:text-primary-300">Search</a></li> </ul> </div> <div> <h3 class="text-lg font-semibold mb-3">Data Sources</h3> <ul class="space-y-2 text-gray-300 text-sm"> <li><a href="https://www.themealdb.com" target="_blank" class="hover:text-primary-300">TheMealDB</a></li> <li><a href="https://www.thecocktaildb.com" target="_blank" class="hover:text-primary-300">TheCocktailDB</a></li> <li><a href="https://tasty.co" target="_blank" class="hover:text-primary-300">Tasty</a></li> </ul> </div> <div> <h3 class="text-lg font-semibold mb-3">Installation</h3> <p class="text-gray-300 text-sm mb-2">
Add RecipeHub to your home screen for quick access
</p> <button id="install-app" class="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors hidden">
Install App
</button> </div> </div> <div class="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm"> <p>© ${( new Date()).getFullYear()} RecipeHub. All rights reserved.</p> </div> </div> </footer> <!-- Shopping List / Cookbook Sidebar --> <div id="sidebar" class="fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-xl transform translate-x-full transition-transform duration-300 z-50"> <div class="h-full flex flex-col"> <div class="p-4 border-b flex items-center justify-between"> <h2 class="text-lg font-semibold">Recipes & Shopping</h2> <button id="close-sidebar" class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div class="flex-1 overflow-y-auto p-4"> <!-- Tab Navigation --> <div class="flex border-b mb-4"> <button id="tab-cookbook" class="flex-1 py-2 px-4 font-medium border-b-2 border-primary-500 text-primary-600">
Cookbook
</button> <button id="tab-shopping" class="flex-1 py-2 px-4 font-medium border-b-2 border-transparent text-gray-500">
Shopping
</button> </div> <!-- Cookbook Panel --> <div id="cookbook-panel" class="space-y-4"> <div id="cookbook-list" class="space-y-3"> <div class="text-center py-8 text-gray-500" id="cookbook-empty"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> <p>No saved recipes yet</p> <p class="text-sm">Click "Save Recipe" on a recipe page to save it</p> </div> </div> </div> <!-- Shopping List Panel --> <div id="shopping-panel" class="hidden space-y-4"> <div class="flex items-center justify-between mb-2"> <h3 class="font-medium">Shopping List</h3> <div class="flex gap-2"> <button id="export-shopping-list" class="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100" title="Export CSV"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path> </svg> </button> <button id="clear-shopping-list" class="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100" title="Clear All"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> </div> <div id="shopping-list" class="space-y-2"> <div class="text-center py-8 text-gray-500" id="shopping-empty"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> <p>Shopping list is empty</p> <p class="text-sm">Add ingredients from recipes to start your list</p> </div> </div> </div> </div> </div> </div> </body></html>`;
}, "D:/recipe-hub/src/layouts/MainLayout.astro", void 0);

const $$Astro$1 = createAstro("https://recipe-hub.netlify.app");
const $$RecipeCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RecipeCard;
  const { id, type, title, image, category, tags, area, glass, alcoholic } = Astro2.props;
  const recipeLink = `/recipe/${type}/${id}`;
  const tagArray = tags ? tags.split(",").filter(Boolean).map((tag) => tag.trim()) : [];
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(recipeLink, "href")} class="card group h-full flex flex-col"> <div class="relative pb-[65%] overflow-hidden"> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} loading="lazy" class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> ${type === "drink" && alcoholic && renderTemplate`<span class="absolute top-2 right-2 badge badge-primary"> ${alcoholic} </span>`} </div> <div class="p-4 flex-1 flex flex-col"> <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2"> ${title} </h3> <div class="flex flex-wrap gap-2 mt-auto pt-3"> ${category && renderTemplate`<span class="badge bg-gray-100 text-gray-800"> ${category} </span>`} ${area && renderTemplate`<span class="badge bg-gray-100 text-gray-800"> ${area} </span>`} ${glass && renderTemplate`<span class="badge bg-gray-100 text-gray-800"> ${glass} </span>`} ${tagArray.slice(0, 2).map((tag) => renderTemplate`<span class="badge badge-secondary"> ${tag} </span>`)} </div> </div> </a>`;
}, "D:/recipe-hub/src/components/RecipeCard.astro", void 0);

const MEAL_DB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const COCKTAIL_DB_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
async function fetchApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
async function getRandomMeal() {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/random.php`);
  return data.meals?.[0] || null;
}
async function getMealById(id) {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
  return data.meals?.[0] || null;
}
async function getMealCategories() {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/list.php?c=list`);
  return data.meals || [];
}
async function getMealsByCategory(category) {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}
async function getMealAreas() {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/list.php?a=list`);
  return data.meals || [];
}
async function getMealsByArea(area) {
  const data = await fetchApi(`${MEAL_DB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}
async function getRandomDrink() {
  const data = await fetchApi(`${COCKTAIL_DB_BASE_URL}/random.php`);
  return data.drinks?.[0] || null;
}
async function getDrinkById(id) {
  const data = await fetchApi(`${COCKTAIL_DB_BASE_URL}/lookup.php?i=${id}`);
  return data.drinks?.[0] || null;
}
async function searchDrinksByName(query) {
  const data = await fetchApi(`${COCKTAIL_DB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return data.drinks || [];
}
async function getDrinkCategories() {
  const data = await fetchApi(`${COCKTAIL_DB_BASE_URL}/list.php?c=list`);
  return data.drinks || [];
}
async function getDrinksByCategory(category) {
  const data = await fetchApi(`${COCKTAIL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.drinks || [];
}
function extractIngredients(item) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : ""
      });
    }
  }
  return ingredients;
}
function formatTags(tags) {
  if (!tags)
    return [];
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

const $$Astro = createAstro("https://recipe-hub.netlify.app");
const prerender = false;
const $$area = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$area;
  const { area } = Astro2.params;
  const meals = await getMealsByArea(area);
  const title = `${area} Cuisine`;
  const description = `Explore traditional dishes from ${area}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-6 py-8"> <div class="mb-10"> <a href="/explore" class="text-primary-600 hover:text-primary-500 inline-flex items-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to explore
</a> <h1 class="text-3xl md:text-4xl font-bold flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${title} </h1> </div> ${meals.length > 0 ? renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ${meals.map((meal) => renderTemplate`${renderComponent($$result2, "RecipeCard", $$RecipeCard, { "id": meal.idMeal, "type": "meal", "title": meal.strMeal, "image": meal.strMealThumb, "area": area, "category": meal.strCategory, "tags": meal.strTags })}`)} </div>` : renderTemplate`<div class="text-center py-16"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h2 class="text-2xl font-bold mb-2">No meals found</h2> <p class="text-gray-600 mb-8">
No meals found from the ${area} region
</p> <a href="/explore" class="btn btn-primary">
Back to explore
</a> </div>`} </div> ` })}`;
}, "D:/recipe-hub/src/pages/area/[area].astro", void 0);

const $$file = "D:/recipe-hub/src/pages/area/[area].astro";
const $$url = "/area/[area]";

const _area_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$area,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$RecipeCard as $, _area_ as _, getDrinksByCategory as a, $$MainLayout as b, getDrinkById as c, getMealById as d, extractIngredients as e, formatTags as f, getMealsByCategory as g, getMealCategories as h, getMealAreas as i, getDrinkCategories as j, getRandomMeal as k, getRandomDrink as l, searchDrinksByName as s };
