import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'mime';
import 'html-escaper';
import 'clsx';
import './chunks/astro_5234216a.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/category/[type]/[category]","type":"page","pattern":"^\\/category\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}],[{"content":"type","dynamic":true,"spread":false}],[{"content":"category","dynamic":true,"spread":false}]],"params":["type","category"],"component":"src/pages/category/[type]/[category].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/explore","type":"page","pattern":"^\\/explore\\/?$","segments":[[{"content":"explore","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/explore.astro","pathname":"/explore","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/pairing","type":"page","pattern":"^\\/pairing\\/?$","segments":[[{"content":"pairing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pairing/index.astro","pathname":"/pairing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/pairing/meal/[id]","type":"page","pattern":"^\\/pairing\\/meal\\/([^/]+?)\\/?$","segments":[[{"content":"pairing","dynamic":false,"spread":false}],[{"content":"meal","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/pairing/meal/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.abd820f2.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/recipe/[type]/[id]","type":"page","pattern":"^\\/recipe\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"recipe","dynamic":false,"spread":false}],[{"content":"type","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["type","id"],"component":"src/pages/recipe/[type]/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.dfa49e21.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/search","type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d1eadcf0.js"},{"type":"external","value":"/_astro/page.ed533972.js"}],"styles":[{"type":"external","src":"/_astro/_area_.d5a5a5a8.css"}],"routeData":{"route":"/area/[area]","type":"page","pattern":"^\\/area\\/([^/]+?)\\/?$","segments":[[{"content":"area","dynamic":false,"spread":false}],[{"content":"area","dynamic":true,"spread":false}]],"params":["area"],"component":"src/pages/area/[area].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://recipe-hub.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/recipe-hub/src/pages/area/[area].astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/category/[type]/[category].astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/explore.astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/pairing/index.astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/pairing/meal/[id].astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/recipe/[type]/[id].astro",{"propagation":"none","containsHead":true}],["D:/recipe-hub/src/pages/search.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000empty-middleware":"_empty-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/src/pages/category/[type]/[category].astro":"chunks/pages/_category__19800499.mjs","/src/pages/explore.astro":"chunks/pages/explore_e1036f59.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_23abc667.mjs","/src/pages/search.astro":"chunks/pages/search_de5e0f54.mjs","\u0000@astrojs-manifest":"manifest_0cc83e79.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_d30af347.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_da7f0317.mjs","\u0000@astro-page:src/pages/category/[type]/[category]@_@astro":"chunks/_category__52fd73e7.mjs","\u0000@astro-page:src/pages/explore@_@astro":"chunks/explore_cde27d3d.mjs","\u0000@astro-page:src/pages/pairing/index@_@astro":"chunks/index_56e6aa5f.mjs","\u0000@astro-page:src/pages/pairing/meal/[id]@_@astro":"chunks/_id__f86c5b71.mjs","\u0000@astro-page:src/pages/recipe/[type]/[id]@_@astro":"chunks/_id__7a749199.mjs","\u0000@astro-page:src/pages/search@_@astro":"chunks/search_18dd3d04.mjs","\u0000@astro-page:src/pages/area/[area]@_@astro":"chunks/_area__1619743d.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.abd820f2.js","/astro/hoisted.js?q=1":"_astro/hoisted.dfa49e21.js","astro:scripts/page.js":"_astro/page.ed533972.js","/astro/hoisted.js?q=2":"_astro/hoisted.d1eadcf0.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/_area_.d5a5a5a8.css","/manifest.json","/manifest.webmanifest","/package.json.bak","/registerSW.js","/service-worker.js","/sw.js","/vercel-runtime.json.bak","/workbox-7e6ebd6d.js","/icons/apple-touch-icon.png","/icons/logo.png","/_astro/api.51f19d40.js","/_astro/hoisted.abd820f2.js","/_astro/hoisted.d1eadcf0.js","/_astro/hoisted.dfa49e21.js","/_astro/page.ed533972.js","/_astro/page.ed533972.js"]});

export { manifest };
