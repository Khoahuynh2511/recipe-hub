/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_b1f64e7e.mjs';
import 'html-escaper';
import { s as searchDrinksByName, c as getDrinkById, d as getMealById, b as $$MainLayout, e as extractIngredients, f as formatTags } from './_area__3ea8db43.mjs';
import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/universal-sentence-encoder';
import { createStore, get, set } from 'idb-keyval';

let useModel = null;
const PAIRING_RULES = [
  {
    mealCategory: "Seafood",
    drinkCategories: ["Ordinary Drink", "Cocktail"],
    drinkIngredients: ["gin", "vodka", "white rum", "tequila", "lemon", "lime", "citrus"],
    bonus: 0.2,
    reason: "Citrus and spirit drinks complement seafood flavors"
  },
  {
    mealCategory: "Beef",
    drinkCategories: ["Ordinary Drink", "Cocktail"],
    drinkIngredients: ["whiskey", "bourbon", "rye", "brandy"],
    bonus: 0.2,
    reason: "Robust whiskey-based drinks complement hearty beef dishes"
  },
  {
    mealCategory: "Chicken",
    drinkCategories: ["Ordinary Drink"],
    drinkIngredients: ["gin", "vodka", "white wine"],
    bonus: 0.15,
    reason: "Light spirits pair well with chicken dishes"
  },
  {
    mealCategory: "Dessert",
    drinkCategories: ["Shake", "Coffee / Tea", "Ordinary Drink", "Cocktail"],
    drinkIngredients: ["coffee", "cream", "milk", "chocolate", "vanilla", "baileys", "kahlua"],
    bonus: 0.25,
    reason: "Creamy or sweet drinks enhance dessert flavors"
  },
  {
    mealCategory: "Pasta",
    drinkCategories: ["Ordinary Drink", "Other/Unknown"],
    drinkIngredients: ["wine", "vermouth", "campari", "aperol"],
    bonus: 0.2,
    reason: "Italian-style aperitifs complement pasta dishes"
  },
  {
    mealCategory: "Vegetarian",
    drinkCategories: ["Other/Unknown", "Soft Drink"],
    drinkIngredients: ["fruit", "herb", "cucumber", "citrus"],
    bonus: 0.15,
    reason: "Fresh, plant-based ingredients in drinks complement vegetarian meals"
  },
  {
    mealCategory: "Breakfast",
    drinkCategories: ["Coffee / Tea", "Shake", "Soft Drink"],
    drinkIngredients: ["orange", "coffee", "milk", "juice"],
    bonus: 0.3,
    reason: "Breakfast-friendly drinks to start the day"
  },
  {
    mealCategory: "Spicy",
    drinkCategories: ["Ordinary Drink", "Beer"],
    drinkIngredients: ["lime", "lemon", "citrus", "beer"],
    bonus: 0.25,
    reason: "Cooling drinks that balance spicy food"
  }
];
async function initModel() {
  if (useModel) {
    return useModel;
  }
  try {
    console.log("Loading Universal Sentence Encoder model...");
    await tf.ready();
    useModel = await load();
    console.log("Model loaded successfully");
    return useModel;
  } catch (error) {
    console.error("Error loading USE model:", error);
    throw new Error("Failed to load text embedding model");
  }
}
async function generateEmbedding(text) {
  const model = await initModel();
  const embeddings = await model.embed([text]);
  const embedding = await embeddings.array();
  return embedding[0];
}
function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimensionality");
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
function applyRuleBasedBonus(meal, drink, baseScore) {
  let bestBonus = 0;
  let bestReason = null;
  const drinkIngredientKeys = Object.keys(drink).filter(
    (key) => key.startsWith("strIngredient") && drink[key]
  );
  const drinkIngredients = drinkIngredientKeys.map((key) => drink[key].toLowerCase()).filter(Boolean);
  for (const rule of PAIRING_RULES) {
    const mealMatches = meal.strCategory.toLowerCase().includes(rule.mealCategory.toLowerCase());
    const drinkCategoryMatches = rule.drinkCategories.some(
      (cat) => drink.strCategory.toLowerCase().includes(cat.toLowerCase())
    );
    const ingredientMatches = rule.drinkIngredients.some(
      (ingredient) => drinkIngredients.some((drinkIng) => drinkIng.includes(ingredient))
    );
    if (mealMatches && drinkCategoryMatches || mealMatches && ingredientMatches) {
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
async function getDrinkPairingForMeal(meal, limit = 5) {
  try {
    const mealDescription = `${meal.strMeal} ${meal.strCategory} ${meal.strArea} ${meal.strTags || ""}`;
    const mealEmbedding = await generateEmbedding(mealDescription);
    const firstLetterDrinks = await searchDrinksByName(meal.strMeal.charAt(0));
    const popularCategories = ["Cocktail", "Ordinary Drink", "Beer", "Soft Drink", "Coffee / Tea", "Shot"];
    let categoryPromises = popularCategories.map(async (category) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      const data = await response.json();
      return (data.drinks || []).slice(0, 3);
    });
    const categoryResults = await Promise.all(categoryPromises);
    const allDrinkIds = /* @__PURE__ */ new Set();
    firstLetterDrinks.forEach((drink) => allDrinkIds.add(drink.idDrink));
    categoryResults.forEach(
      (categoryDrinks) => categoryDrinks.forEach((drink) => allDrinkIds.add(drink.idDrink))
    );
    const drinkPromises = Array.from(allDrinkIds).map(async (id) => {
      const drink = await getDrinkById(id);
      if (!drink)
        return null;
      const drinkDescription = `${drink.strDrink} ${drink.strCategory} ${drink.strAlcoholic} ${drink.strGlass} ${drink.strTags || ""}`;
      const drinkEmbedding = await generateEmbedding(drinkDescription);
      const similarity = cosineSimilarity(mealEmbedding, drinkEmbedding);
      const { score, reason } = applyRuleBasedBonus(meal, drink, similarity);
      return {
        drink,
        score,
        reason: reason || "Good semantic match based on flavor profile"
      };
    });
    const pairings = (await Promise.all(drinkPromises)).filter(Boolean);
    return pairings.sort((a, b) => b.score - a.score).slice(0, limit);
  } catch (error) {
    console.error("Error generating drink pairings:", error);
    return [];
  }
}

const $$Astro$1 = createAstro("https://recipe-hub.vercel.app");
const prerender$1 = false;
const $$id$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$id$1;
  const { id } = Astro2.params;
  let meal = null;
  let pairings = [];
  let error = null;
  if (id) {
    try {
      meal = await getMealById(id);
      if (meal) {
        pairings = await getDrinkPairingForMeal(meal, 6);
      }
    } catch (e) {
      console.error("Error getting meal or pairings:", e);
      error = e.message;
    }
  }
  const title = meal ? `Drink Pairings for ${meal.strMeal}` : "Pairing Not Found";
  const description = meal ? `Discover the perfect drinks to pair with ${meal.strMeal}. Find complementary flavors to enhance your meal.` : "The recipe pairing you are looking for does not exist.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> ${meal ? renderTemplate`<div class="max-w-5xl mx-auto"> <!-- Header --> <div class="mb-8"> <div class="flex items-center gap-4 mb-4"> <a${addAttribute(`/recipe/meal/${id}`, "href")} class="flex items-center text-gray-600 hover:text-primary-600"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Recipe
</a> </div> <h1 class="text-3xl font-bold mb-2">Drink Pairings for ${meal.strMeal}</h1> <p class="text-gray-600 mb-6">
Discover drinks that complement the flavors of this ${meal.strCategory.toLowerCase()} dish.
</p> <!-- Recipe Summary --> <div class="flex flex-col sm:flex-row gap-6 mb-8 p-4 bg-gray-50 rounded-lg"> <img${addAttribute(`${meal.strMealThumb}/preview`, "src")}${addAttribute(meal.strMeal, "alt")} class="w-24 h-24 object-cover rounded-md"> <div> <h2 class="font-medium text-lg">${meal.strMeal}</h2> <div class="flex flex-wrap gap-2 mt-2"> ${meal.strCategory && renderTemplate`<span class="badge badge-primary"> ${meal.strCategory} </span>`} ${meal.strArea && renderTemplate`<span class="badge badge-secondary"> ${meal.strArea} </span>`} </div> </div> </div> </div> <!-- Pairings --> <h2 class="text-xl font-bold mb-4">Recommended Drink Pairings</h2> ${pairings.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"> ${pairings.map(({ drink, score, reason }) => renderTemplate`<div class="card hover:shadow-lg"> <img${addAttribute(`${drink.strDrinkThumb}/preview`, "src")}${addAttribute(drink.strDrink, "alt")} class="w-full h-48 object-cover"> <div class="p-4"> <div class="flex justify-between items-start"> <h3 class="font-bold">${drink.strDrink}</h3> <span class="badge bg-primary-100 text-primary-800"> ${Math.round(score * 100)}% Match
</span> </div> <div class="mt-2"> <span class="badge bg-gray-100 text-gray-800"> ${drink.strCategory} </span> ${drink.strAlcoholic && renderTemplate`<span class="badge bg-gray-100 text-gray-800 ml-1"> ${drink.strAlcoholic} </span>`} </div> <p class="text-sm text-gray-600 mt-3">${reason}</p> <a${addAttribute(`/recipe/drink/${drink.idDrink}`, "href")} class="btn btn-primary w-full mt-4">
View Recipe
</a> </div> </div>`)} </div>` : renderTemplate`<div class="text-center py-12 bg-gray-50 rounded-lg"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h3 class="text-lg font-medium mb-2">No Pairings Found</h3> <p class="text-gray-600">
We couldn't find drink pairings for this meal. Please try again later.
</p> </div>`} <!-- Pairing Tips --> <div class="bg-primary-50 rounded-lg p-6 mb-8"> <h3 class="text-lg font-medium mb-3 text-primary-800">Pairing Tips</h3> <ul class="space-y-2 text-primary-900"> <li class="flex items-start gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Consider the intensity of flavors - match delicate foods with delicate drinks.</span> </li> <li class="flex items-start gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Think about complementary or contrasting flavors to enhance the experience.</span> </li> <li class="flex items-start gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Cleanse the palate between bites with bright, acidic, or carbonated drinks.</span> </li> </ul> </div> </div>` : renderTemplate`<div class="text-center py-16"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h1 class="text-2xl font-bold mb-2">Pairing Not Found</h1> <p class="text-gray-600 mb-8">
The recipe or pairing you are looking for does not exist or has been removed.
${error && renderTemplate`<span class="block mt-2 text-red-500">${error}</span>`} </p> <div class="flex justify-center gap-4"> <a href="/" class="btn btn-primary">Return Home</a> <a href="/explore" class="btn btn-outline">Explore Recipes</a> </div> </div>`} </div> ` })}`;
}, "D:/recipe-hub/src/pages/pairing/meal/[id].astro", void 0);

const $$file$1 = "D:/recipe-hub/src/pages/pairing/meal/[id].astro";
const $$url$1 = "/pairing/meal/[id]";

const _id_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id$1,
  file: $$file$1,
  prerender: prerender$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const recipeStore = createStore("recipe-hub-db", "user-data");
const KEYS = {
  COOKBOOK: "cookbook",
  SHOPPING_LIST: "shopping-list",
  FAVORITES: "favorites",
  RECENT_VIEWS: "recent-views"
};
const isBrowser = typeof window !== "undefined";
function isIndexedDBAvailable() {
  try {
    return isBrowser && typeof indexedDB !== "undefined";
  } catch (e) {
    return false;
  }
}
function isLocalStorageAvailable() {
  try {
    return isBrowser && typeof localStorage !== "undefined";
  } catch (e) {
    return false;
  }
}
const localStorageFallback = {
  async get(key) {
    try {
      if (!isLocalStorageAvailable())
        return void 0;
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : void 0;
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return void 0;
    }
  },
  async set(key, value) {
    try {
      if (!isLocalStorageAvailable())
        return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    }
  },
  async del(key) {
    try {
      if (!isLocalStorageAvailable())
        return;
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing from localStorage:", e);
    }
  }
};
async function getData(key) {
  if (!isBrowser)
    return void 0;
  try {
    if (isIndexedDBAvailable()) {
      return await get(key, recipeStore);
    } else {
      return await localStorageFallback.get(key);
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return void 0;
  }
}
async function setData(key, value) {
  if (!isBrowser)
    return;
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
async function addToRecentViews(id, type) {
  if (!isBrowser)
    return;
  const views = await getData(KEYS.RECENT_VIEWS) || [];
  const filteredViews = views.filter((item) => !(item.id === id && item.type === type));
  filteredViews.unshift({
    id,
    type,
    date: Date.now()
  });
  const limitedViews = filteredViews.slice(0, 10);
  await setData(KEYS.RECENT_VIEWS, limitedViews);
}

const $$Astro = createAstro("https://recipe-hub.vercel.app");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { type, id } = Astro2.params;
  let recipe = null;
  let ingredients = [];
  let tags = [];
  let title = "";
  let image = "";
  let instructions = "";
  if (type === "meal") {
    recipe = await getMealById(id);
    if (recipe) {
      title = recipe.strMeal;
      image = recipe.strMealThumb;
      instructions = recipe.strInstructions;
      ingredients = extractIngredients(recipe);
      tags = formatTags(recipe.strTags);
    }
  } else if (type === "drink") {
    recipe = await getDrinkById(id);
    if (recipe) {
      title = recipe.strDrink;
      image = recipe.strDrinkThumb;
      instructions = recipe.strInstructions;
      ingredients = extractIngredients(recipe);
      tags = formatTags(recipe.strTags);
    }
  }
  if (recipe && id && type) {
    addToRecentViews(id, type);
  }
  const metaDescription = recipe ? `Detailed recipe for ${title}. Discover how to make it and the ingredients for this dish.` : "The recipe you are looking for does not exist or has been removed.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title || "Not Found", "description": metaDescription }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> ${recipe ? renderTemplate`<div class="max-w-5xl mx-auto"> <!-- Recipe Header --> <div class="flex flex-col md:flex-row gap-8 mb-10"> <!-- Recipe Image --> <div class="w-full md:w-2/5"> <div class="rounded-lg overflow-hidden shadow-md"> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="w-full h-auto object-cover aspect-square"> </div> </div> <!-- Recipe Info --> <div class="w-full md:w-3/5"> <h1 class="text-3xl font-bold mb-3">${title}</h1> <div class="flex flex-wrap gap-2 mb-4"> ${type === "meal" && recipe.strCategory && renderTemplate`<span class="badge badge-primary"> ${recipe.strCategory} </span>`} ${type === "meal" && recipe.strArea && renderTemplate`<span class="badge badge-secondary"> ${recipe.strArea} </span>`} ${type === "drink" && recipe.strCategory && renderTemplate`<span class="badge badge-primary"> ${recipe.strCategory} </span>`} ${type === "drink" && recipe.strAlcoholic && renderTemplate`<span class="badge badge-secondary"> ${recipe.strAlcoholic} </span>`} ${type === "drink" && recipe.strGlass && renderTemplate`<span class="badge bg-gray-100 text-gray-800"> ${recipe.strGlass} </span>`} ${tags.map((tag) => renderTemplate`<span class="badge bg-gray-100 text-gray-800"> ${tag} </span>`)} </div> <!-- Action Buttons --> <div class="flex flex-wrap gap-3 mb-6"> <button id="save-recipe" class="btn btn-primary"${addAttribute(id, "data-id")}${addAttribute(type, "data-type")}> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg>
Save Recipe
</button> <button id="add-to-shopping" class="btn btn-outline"${addAttribute(id, "data-id")}${addAttribute(type, "data-type")}${addAttribute(title, "data-title")}> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
Add Ingredients
</button> ${type === "meal" && renderTemplate`<a${addAttribute(`/pairing/meal/${id}`, "href")} class="btn btn-outline"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>
Suggested Drinks
</a>`} </div> </div> </div> <!-- Ingredients & Instructions --> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"> <!-- Ingredients --> <div class="md:col-span-1"> <h2 class="text-xl font-bold mb-4">Ingredients</h2> <ul class="space-y-2"> ${ingredients.map(({ ingredient, measure }) => renderTemplate`<li class="flex items-start gap-2"> <span class="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </span> <span> <strong>${measure}</strong> ${ingredient} </span> </li>`)} </ul> </div> <!-- Instructions --> <div class="md:col-span-2"> <h2 class="text-xl font-bold mb-4">Instructions</h2> <div class="prose max-w-none"> ${instructions.split("\n").map((paragraph) => renderTemplate`<p class="mb-4">${paragraph}</p>`)} </div> </div> </div> <!-- Additional Info (Video, Source, etc) --> ${type === "meal" && recipe.strYoutube && renderTemplate`<div class="mb-10"> <h2 class="text-xl font-bold mb-4">Video Tutorial</h2> <div class="aspect-video"> <iframe width="100%" height="100%"${addAttribute(recipe.strYoutube.replace("watch?v=", "embed/"), "src")}${addAttribute(`Video tutorial for ${title}`, "title")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-lg"></iframe> </div> </div>`} </div>` : renderTemplate`<div class="text-center py-16"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h1 class="text-2xl font-bold mb-2">Recipe Not Found</h1> <p class="text-gray-600 mb-8">
The recipe you are looking for does not exist or has been removed.
</p> <div class="flex justify-center gap-4"> <a href="/" class="btn btn-primary">Return Home</a> <a href="/search" class="btn btn-outline">Find Other Recipes</a> </div> </div>`} </div> ` })} `;
}, "D:/recipe-hub/src/pages/recipe/[type]/[id].astro", void 0);

const $$file = "D:/recipe-hub/src/pages/recipe/[type]/[id].astro";
const $$url = "/recipe/[type]/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_$1 as _, _id_ as a };
