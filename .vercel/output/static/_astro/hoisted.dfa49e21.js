import{s as l,a as o}from"./api.51f19d40.js";import"./hoisted.d1eadcf0.js";class h{constructor(e,t,i){if(this.searchTimeout=null,this.minSearchLength=2,this.debounceTime=300,this.isSearching=!1,this.lastQuery="",this.inputElement=document.getElementById(e),this.resultsContainer=document.getElementById(t),this.loadingIndicator=document.getElementById(i),!this.inputElement||!this.resultsContainer){console.error("SearchBar: Required DOM elements not found");return}this.inputElement.addEventListener("input",this.handleInput.bind(this)),this.inputElement.addEventListener("keydown",this.handleKeyDown.bind(this)),this.initFromUrl()}handleInput(){const e=this.inputElement.value.trim();if(this.searchTimeout&&(window.clearTimeout(this.searchTimeout),this.searchTimeout=null),e.length<this.minSearchLength){this.resultsContainer.innerHTML=`
        <div class="text-center py-12 text-gray-500">
          <p>Vui lòng nhập ít nhất ${this.minSearchLength} ký tự để tìm kiếm</p>
        </div>
      `,this.hideLoading(),this.lastQuery="";return}e!==this.lastQuery&&(this.showLoading(),this.searchTimeout=window.setTimeout(()=>{this.performSearch(e),this.updateUrlParam(e)},this.debounceTime))}handleKeyDown(e){if(e.key==="Enter"){const t=this.inputElement.value.trim();this.searchTimeout&&(window.clearTimeout(this.searchTimeout),this.searchTimeout=null),t.length>=this.minSearchLength&&(this.showLoading(),this.performSearch(t),this.updateUrlParam(t))}}async performSearch(e){if(!this.isSearching){this.isSearching=!0,this.lastQuery=e;try{const[t,i]=await Promise.all([l(e),o(e)]),r=this.generateMealResultsHtml(t),a=this.generateDrinkResultsHtml(i),n=`
        <h2 class="text-2xl font-bold mb-6">Kết quả tìm kiếm cho "${e}"</h2>
        
        ${r}
        ${a}
        
        ${!t.length&&!i.length?`
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <p class="text-gray-600 mb-2">Không tìm thấy kết quả nào phù hợp</p>
            <p class="text-gray-500 text-sm">Hãy thử từ khóa khác hoặc kiểm tra lỗi chính tả</p>
          </div>
        `:""}
      `;this.resultsContainer.innerHTML=n}catch(t){console.error("Search error:",t),this.resultsContainer.innerHTML=`
        <div class="text-center py-12 bg-red-50 rounded-lg">
          <p class="text-red-600 mb-2">Đã xảy ra lỗi khi tìm kiếm</p>
          <p class="text-red-500 text-sm">Vui lòng thử lại sau</p>
        </div>
      `}finally{this.hideLoading(),this.isSearching=!1}}}generateMealResultsHtml(e){return e.length?`
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Món ăn (${e.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${e.map(t=>`
            <a href="/recipe/meal/${t.idMeal}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${t.strMealThumb}" 
                  alt="${t.strMeal}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${t.strMeal}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${t.strCategory?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${t.strCategory}
                    </span>
                  `:""}
                  
                  ${t.strArea?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${t.strArea}
                    </span>
                  `:""}
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `:""}generateDrinkResultsHtml(e){return e.length?`
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Đồ uống (${e.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${e.map(t=>`
            <a href="/recipe/drink/${t.idDrink}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${t.strDrinkThumb}" 
                  alt="${t.strDrink}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                ${t.strAlcoholic?`
                  <span class="absolute top-2 right-2 badge badge-primary">
                    ${t.strAlcoholic}
                  </span>
                `:""}
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${t.strDrink}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${t.strCategory?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${t.strCategory}
                    </span>
                  `:""}
                  
                  ${t.strGlass?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${t.strGlass}
                    </span>
                  `:""}
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `:""}showLoading(){this.loadingIndicator&&this.loadingIndicator.classList.remove("hidden")}hideLoading(){this.loadingIndicator&&this.loadingIndicator.classList.add("hidden")}updateUrlParam(e){const t=new URL(window.location.href);t.searchParams.set("q",e),window.history.replaceState({},"",t.toString())}initFromUrl(){const t=new URLSearchParams(window.location.search).get("q");t&&t.length>=this.minSearchLength&&(this.inputElement.value=t,this.showLoading(),this.performSearch(t))}}document.addEventListener("DOMContentLoaded",()=>{const s="search-input",e="search-results",t="search-loading";document.getElementById(s)&&new h(s,e,t)});document.querySelectorAll("[data-search-hint]").forEach(s=>{s.addEventListener("click",()=>{const e=s.getAttribute("data-search-hint"),t=document.getElementById("search-input");t&&e&&(t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})))})});
