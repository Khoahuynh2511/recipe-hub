import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_0cc83e79.mjs';

const _page0  = () => import('./chunks/generic_d30af347.mjs');
const _page1  = () => import('./chunks/index_da7f0317.mjs');
const _page2  = () => import('./chunks/_category__52fd73e7.mjs');
const _page3  = () => import('./chunks/explore_cde27d3d.mjs');
const _page4  = () => import('./chunks/index_56e6aa5f.mjs');
const _page5  = () => import('./chunks/_id__f86c5b71.mjs');
const _page6  = () => import('./chunks/_id__7a749199.mjs');
const _page7  = () => import('./chunks/search_18dd3d04.mjs');
const _page8  = () => import('./chunks/_area__1619743d.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/category/[type]/[category].astro", _page2],["src/pages/explore.astro", _page3],["src/pages/pairing/index.astro", _page4],["src/pages/pairing/meal/[id].astro", _page5],["src/pages/recipe/[type]/[id].astro", _page6],["src/pages/search.astro", _page7],["src/pages/area/[area].astro", _page8]]);
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
