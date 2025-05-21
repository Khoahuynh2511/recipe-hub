/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, j as renderComponent, g as addAttribute } from '../astro_b1f64e7e.mjs';
import 'html-escaper';
import 'clsx';
import { k as getRandomMeal, l as getRandomDrink, $ as $$RecipeCard, b as $$MainLayout } from './_area__3ea8db43.mjs';

const $$Astro = createAstro("https://recipe-hub.vercel.app");
const $$LoadingSkeleton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoadingSkeleton;
  const { type, count = 1 } = Astro2.props;
  return renderTemplate`${type === "card" && Array.from({ length: count }).map(() => renderTemplate`${maybeRenderHead()}<div class="card h-full flex flex-col"><div class="relative pb-[65%] overflow-hidden bg-gray-200 loading-skeleton"></div><div class="p-4 flex-1 flex flex-col"><div class="h-6 bg-gray-200 rounded w-3/4 mb-3 loading-skeleton"></div><div class="h-4 bg-gray-200 rounded w-1/2 mb-6 loading-skeleton"></div><div class="flex gap-2 mt-auto"><div class="h-5 bg-gray-200 rounded-full w-16 loading-skeleton"></div><div class="h-5 bg-gray-200 rounded-full w-20 loading-skeleton"></div></div></div></div>`)}${type === "detail" && renderTemplate`<div class="w-full"><div class="flex flex-col md:flex-row gap-8"><div class="w-full md:w-2/5"><div class="pb-[100%] relative bg-gray-200 rounded-lg loading-skeleton"></div></div><div class="w-full md:w-3/5 space-y-4"><div class="h-8 bg-gray-200 rounded w-3/4 loading-skeleton"></div><div class="h-6 bg-gray-200 rounded w-1/3 loading-skeleton"></div><div class="flex gap-2 my-4"><div class="h-6 bg-gray-200 rounded-full w-20 loading-skeleton"></div><div class="h-6 bg-gray-200 rounded-full w-24 loading-skeleton"></div></div><div class="space-y-2 pt-4"><div class="h-5 bg-gray-200 rounded w-full loading-skeleton"></div><div class="h-5 bg-gray-200 rounded w-full loading-skeleton"></div><div class="h-5 bg-gray-200 rounded w-3/4 loading-skeleton"></div></div></div></div><div class="mt-8 space-y-3"><div class="h-7 bg-gray-200 rounded w-1/4 loading-skeleton"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${Array.from({ length: 6 }).map(() => renderTemplate`<div class="h-6 bg-gray-200 rounded w-full loading-skeleton"></div>`)}</div><div class="mt-6 h-7 bg-gray-200 rounded w-1/4 loading-skeleton"></div><div class="space-y-3">${Array.from({ length: 3 }).map(() => renderTemplate`<div class="h-5 bg-gray-200 rounded w-full loading-skeleton"></div>`)}</div></div></div>`}${type === "list" && renderTemplate`<div class="w-full space-y-4">${Array.from({ length: count }).map(() => renderTemplate`<div class="flex items-center gap-3 p-3 border rounded-md"><div class="w-16 h-16 bg-gray-200 rounded loading-skeleton"></div><div class="flex-1"><div class="h-5 bg-gray-200 rounded w-3/4 mb-2 loading-skeleton"></div><div class="h-4 bg-gray-200 rounded w-1/2 loading-skeleton"></div></div></div>`)}</div>`}`;
}, "D:/recipe-hub/src/components/LoadingSkeleton.astro", void 0);

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const [meal, drink] = await Promise.all([
    getRandomMeal(),
    getRandomDrink()
  ]);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Home", "description": "Discover recipes and drinks from around the world" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16"> <div class="container mx-auto px-6 text-center"> <h1 class="text-4xl md:text-5xl font-bold mb-6">
Discover Culinary Recipes
</h1> <p class="text-xl mb-8 max-w-2xl mx-auto">
Search thousands of food recipes and drinks. Save your favorites and create shopping lists for ingredients.
</p> <div class="flex flex-wrap justify-center gap-4"> <a href="/search" class="btn bg-white text-primary-700 hover:bg-gray-100">
Find Recipes
</a> <a href="/explore" class="btn bg-primary-500 text-white hover:bg-primary-400">
Explore
</a> </div> </div> </section>  <section class="py-16 px-6"> <div class="container mx-auto"> <div class="flex justify-between items-center mb-8"> <h2 class="text-2xl md:text-3xl font-bold">Random Recipes</h2> <a href="/" class="btn btn-outline flex items-center gap-1" aria-label="Refresh random recipes"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg>
Refresh
</a> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <!-- Meal of the Day --> <div> <h3 class="text-xl font-semibold mb-4 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg>
Meal of the Day
</h3> ${meal ? renderTemplate`${renderComponent($$result2, "RecipeCard", $$RecipeCard, { "id": meal.idMeal, "type": "meal", "title": meal.strMeal, "image": meal.strMealThumb, "category": meal.strCategory, "area": meal.strArea, "tags": meal.strTags })}` : renderTemplate`${renderComponent($$result2, "LoadingSkeleton", $$LoadingSkeleton, { "type": "card" })}`} </div> <!-- Drink of the Day --> <div> <h3 class="text-xl font-semibold mb-4 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>
Drink of the Day
</h3> ${drink ? renderTemplate`${renderComponent($$result2, "RecipeCard", $$RecipeCard, { "id": drink.idDrink, "type": "drink", "title": drink.strDrink, "image": drink.strDrinkThumb, "category": drink.strCategory, "glass": drink.strGlass, "alcoholic": drink.strAlcoholic })}` : renderTemplate`${renderComponent($$result2, "LoadingSkeleton", $$LoadingSkeleton, { "type": "card" })}`} </div> </div> </div> </section>  <section class="py-16 px-6 bg-gray-50"> <div class="container mx-auto"> <h2 class="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <!-- Feature 1 --> <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <h3 class="text-lg font-semibold mb-2">Smart Search</h3> <p class="text-gray-600">
Search recipes by name, ingredients, or cuisine type with the most accurate results.
</p> </div> <!-- Feature 2 --> <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> </div> <h3 class="text-lg font-semibold mb-2">Recipe Storage</h3> <p class="text-gray-600">
Save your favorite recipes to your personal cookbook for easy access anytime, anywhere.
</p> </div> <!-- Feature 3 --> <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </div> <h3 class="text-lg font-semibold mb-2">Shopping List</h3> <p class="text-gray-600">
Create shopping lists from your chosen recipes, organized by ingredient type and easy to export.
</p> </div> </div> </div> </section>  <section class="py-16 px-6 bg-secondary-600 text-white"> <div class="container mx-auto text-center"> <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to Explore?</h2> <p class="text-lg mb-8 max-w-2xl mx-auto">
Thousands of recipes are waiting for you to discover. Start searching now!
</p> <a href="/search" class="btn bg-white text-secondary-700 hover:bg-gray-100">
Start Searching
</a> </div> </section> ` })}`;
}, "D:/recipe-hub/src/pages/index.astro", void 0);

const $$file$1 = "D:/recipe-hub/src/pages/index.astro";
const $$url$1 = "";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const popularMeals = [
    { id: "52772", name: "Teriyaki Chicken Casserole", thumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg", category: "Chicken", area: "Japanese" },
    { id: "52771", name: "Spicy Arrabiata Penne", thumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", category: "Pasta", area: "Italian" },
    { id: "52770", name: "Spaghetti Bolognese", thumb: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg", category: "Pasta", area: "Italian" },
    { id: "52773", name: "Honey Teriyaki Salmon", thumb: "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg", category: "Seafood", area: "Japanese" },
    { id: "52774", name: "Pad See Ew", thumb: "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg", category: "Chicken", area: "Thai" },
    { id: "52765", name: "Chicken Enchilada Casserole", thumb: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg", category: "Chicken", area: "Mexican" },
    { id: "52787", name: "Beef Wellington", thumb: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg", category: "Beef", area: "British" },
    { id: "52896", name: "Full English Breakfast", thumb: "https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg", category: "Breakfast", area: "British" },
    { id: "52785", name: "Dal fry", thumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", category: "Vegetarian", area: "Indian" }
  ];
  const mealsByCategory = popularMeals.reduce((acc, meal) => {
    const category = meal.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(meal);
    return acc;
  }, {});
  const title = "Food & Drink Pairings";
  const description = "Discover the perfect pairings between food and drinks. Find complementary flavors to enhance your dining experience.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="max-w-5xl mx-auto"> <!-- Hero Section --> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-bold mb-4">Perfect Food & Drink Pairings</h1> <p class="text-gray-600 text-lg max-w-3xl mx-auto">
Elevate your dining experience with expert pairing recommendations. Find the ideal drink to complement any meal.
</p> </div> <!-- How It Works --> <div class="bg-gray-50 rounded-xl p-6 mb-12"> <h2 class="text-2xl font-bold mb-6 text-center">How It Works</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="flex flex-col items-center text-center"> <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mb-4"> <span class="font-bold text-lg">1</span> </div> <h3 class="font-medium text-lg mb-2">Select a Meal</h3> <p class="text-gray-600">
Choose from our collection of recipes or browse by category
</p> </div> <div class="flex flex-col items-center text-center"> <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mb-4"> <span class="font-bold text-lg">2</span> </div> <h3 class="font-medium text-lg mb-2">View Recommendations</h3> <p class="text-gray-600">
Our algorithm analyzes flavors to suggest complementary drinks
</p> </div> <div class="flex flex-col items-center text-center"> <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mb-4"> <span class="font-bold text-lg">3</span> </div> <h3 class="font-medium text-lg mb-2">Enjoy the Perfect Match</h3> <p class="text-gray-600">
Experience how the right pairing enhances both food and drink
</p> </div> </div> </div> <!-- Browse By Category --> <h2 class="text-2xl font-bold mb-6">Browse Meals for Pairing</h2> ${Object.keys(mealsByCategory).map((category) => renderTemplate`<div class="mb-10"> <h3 class="text-xl font-medium mb-4 flex items-center"> <span class="badge badge-primary mr-2">${category}</span> <span>Dishes</span> </h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${mealsByCategory[category].map((meal) => renderTemplate`<a${addAttribute(`/pairing/meal/${meal.id}`, "href")} class="card hover:shadow-lg flex flex-col"> <img${addAttribute(`${meal.thumb}/preview`, "src")}${addAttribute(meal.name, "alt")} class="w-full h-48 object-cover" loading="lazy"> <div class="p-4 flex-grow flex flex-col"> <h4 class="font-bold mb-2">${meal.name}</h4> <div class="flex gap-2 mb-2"> <span class="badge badge-secondary"> ${meal.area} </span> </div> <p class="text-gray-600 text-sm mt-2">
Find the perfect drinks to complement this ${category.toLowerCase()} dish
</p> <div class="mt-auto pt-4"> <span class="text-primary-600 font-medium flex items-center">
View Pairings
<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </span> </div> </div> </a>`)} </div> </div>`)} <!-- Pairing Principles --> <div class="bg-primary-50 rounded-xl p-6 mb-12"> <h2 class="text-2xl font-bold mb-6">Principles of Great Pairings</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-white rounded-lg p-4 shadow-sm"> <h3 class="font-medium text-lg mb-2 text-primary-700">Complementary Flavors</h3> <p class="text-gray-600">
Look for drinks that either complement or pleasantly contrast with your food. 
              Smoky barbecue pairs well with robust beverages, while spicy foods often match 
              with cooling or sweet drinks.
</p> </div> <div class="bg-white rounded-lg p-4 shadow-sm"> <h3 class="font-medium text-lg mb-2 text-primary-700">Regional Pairings</h3> <p class="text-gray-600">
Foods often pair well with drinks from the same region - there's a reason 
              Italian wines go perfectly with Italian food, and sake complements Japanese cuisine so well.
</p> </div> <div class="bg-white rounded-lg p-4 shadow-sm"> <h3 class="font-medium text-lg mb-2 text-primary-700">Balance Intensity</h3> <p class="text-gray-600">
Match the intensity of flavors. Delicate dishes pair best with subtle drinks, 
              while bold, flavorful foods can stand up to more assertive beverages.
</p> </div> <div class="bg-white rounded-lg p-4 shadow-sm"> <h3 class="font-medium text-lg mb-2 text-primary-700">Consider Texture</h3> <p class="text-gray-600">
Texture matters in pairing. Carbonated beverages can cut through rich, fatty foods, 
              while creamy drinks can complement or contrast with various food textures.
</p> </div> </div> </div> </div> </div> ` })}`;
}, "D:/recipe-hub/src/pages/pairing/index.astro", void 0);

const $$file = "D:/recipe-hub/src/pages/pairing/index.astro";
const $$url = "/pairing";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
