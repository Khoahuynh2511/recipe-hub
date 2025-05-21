import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_6f622e39.mjs';

const _page0  = () => import('./chunks/generic_91a2cb74.mjs');
const _page1  = () => import('./chunks/index_2ff3a29c.mjs');
const _page2  = () => import('./chunks/_category__33c21acc.mjs');
const _page3  = () => import('./chunks/explore_c6f7b6af.mjs');
const _page4  = () => import('./chunks/index_834f6da9.mjs');
const _page5  = () => import('./chunks/_id__30a2da99.mjs');
const _page6  = () => import('./chunks/_id__7afea226.mjs');
const _page7  = () => import('./chunks/search_e026d98b.mjs');
const _page8  = () => import('./chunks/_area__25ebbb71.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/category/[type]/[category].astro", _page2],["src/pages/explore.astro", _page3],["src/pages/pairing/index.astro", _page4],["src/pages/pairing/meal/[id].astro", _page5],["src/pages/recipe/[type]/[id].astro", _page6],["src/pages/search.astro", _page7],["src/pages/area/[area].astro", _page8]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
