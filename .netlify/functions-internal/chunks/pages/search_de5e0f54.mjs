/* empty css                            */import { f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_5234216a.mjs';
import 'html-escaper';
import 'clsx';
import { b as $$MainLayout } from './_area__4cd0eaa4.mjs';

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Search", "description": "Search for recipes and drinks by name, ingredients, or type" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-6 py-8 max-w-6xl"> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-bold mb-4">Find Recipes</h1> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
Enter keywords to search for food, drinks, or ingredients you want.
        Results will be displayed below.
</p> </div> <div class="w-full max-w-3xl mx-auto mb-8 relative"> <div class="relative"> <input type="text" id="search-input" placeholder="Search for food recipes or drinks..." class="w-full p-4 pl-12 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> </div> <!-- Loading indicator --> <div id="search-loading" class="absolute right-4 top-4 hidden"> <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div> </div> <!-- Search hints --> <div class="mt-2 flex flex-wrap gap-2 justify-center"> <button class="text-sm text-gray-600 hover:text-primary-600 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" data-search-hint="chicken">
Chicken
</button> <button class="text-sm text-gray-600 hover:text-primary-600 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" data-search-hint="beef">
Beef
</button> <button class="text-sm text-gray-600 hover:text-primary-600 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" data-search-hint="cocktail">
Cocktail
</button> <button class="text-sm text-gray-600 hover:text-primary-600 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" data-search-hint="dessert">
Dessert
</button> <button class="text-sm text-gray-600 hover:text-primary-600 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" data-search-hint="vegetarian">
Vegetarian
</button> </div> </div> <!-- Results container --> <div id="search-results" class="min-h-[50vh]"> <div class="text-center py-12 text-gray-500"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> <p class="text-xl mb-2">Enter keywords to start searching</p> <p class="text-gray-400">Results will appear here</p> </div> </div> </div> ` })} `;
}, "D:/recipe-hub/src/pages/search.astro", void 0);

const $$file = "D:/recipe-hub/src/pages/search.astro";
const $$url = "/search";

export { $$Search as default, $$file as file, $$url as url };
