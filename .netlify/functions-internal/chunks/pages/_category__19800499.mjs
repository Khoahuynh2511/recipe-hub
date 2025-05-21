/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_5234216a.mjs';
import 'html-escaper';
import { g as getMealsByCategory, a as getDrinksByCategory, $ as $$RecipeCard, b as $$MainLayout } from './_area__4cd0eaa4.mjs';

const $$Astro = createAstro("https://recipe-hub.netlify.app");
const prerender = false;
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { type, category } = Astro2.params;
  let items = [];
  let title = "";
  let description = "";
  let icon = "";
  if (type === "meal") {
    items = await getMealsByCategory(category);
    title = `Meals in category: ${category}`;
    description = `Explore meals in the ${category} category`;
    icon = "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253";
  } else if (type === "drink") {
    items = await getDrinksByCategory(category);
    title = `Drinks in category: ${category}`;
    description = `Explore drinks in the ${category} category`;
    icon = "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-6 py-8"> <div class="mb-10"> <a href="/explore" class="text-primary-600 hover:text-primary-500 inline-flex items-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to explore
</a> <h1 class="text-3xl md:text-4xl font-bold flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(icon, "d")}></path> </svg> ${title} </h1> </div> ${items.length > 0 ? renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ${items.map((item) => renderTemplate`${renderComponent($$result2, "RecipeCard", $$RecipeCard, { "id": type === "meal" ? item.idMeal : item.idDrink, "type": type, "title": type === "meal" ? item.strMeal : item.strDrink, "image": type === "meal" ? item.strMealThumb : item.strDrinkThumb, "category": category, "tags": item.strTags, "alcoholic": type === "drink" ? item.strAlcoholic : void 0, "glass": type === "drink" ? item.strGlass : void 0 })}`)} </div>` : renderTemplate`<div class="text-center py-16"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h2 class="text-2xl font-bold mb-2">No ${type === "meal" ? "meals" : "drinks"} found</h2> <p class="text-gray-600 mb-8">
No ${type === "meal" ? "meals" : "drinks"} found in the ${category} category
</p> <a href="/explore" class="btn btn-primary">
Back to explore
</a> </div>`} </div> ` })}`;
}, "D:/recipe-hub/src/pages/category/[type]/[category].astro", void 0);

const $$file = "D:/recipe-hub/src/pages/category/[type]/[category].astro";
const $$url = "/category/[type]/[category]";

export { $$category as default, $$file as file, prerender, $$url as url };
