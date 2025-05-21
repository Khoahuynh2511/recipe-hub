import{s as dt,a as gt}from"./api.51f19d40.js";import"./hoisted.c4028def.js";function b(s){return Array.isArray?Array.isArray(s):nt(s)==="[object Array]"}const ft=1/0;function pt(s){if(typeof s=="string")return s;let t=s+"";return t=="0"&&1/s==-ft?"-0":t}function mt(s){return s==null?"":pt(s)}function w(s){return typeof s=="string"}function st(s){return typeof s=="number"}function xt(s){return s===!0||s===!1||yt(s)&&nt(s)=="[object Boolean]"}function rt(s){return typeof s=="object"}function yt(s){return rt(s)&&s!==null}function m(s){return s!=null}function H(s){return!s.trim().length}function nt(s){return s==null?s===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(s)}const Mt="Incorrect 'index' type",wt=s=>`Invalid value for key ${s}`,vt=s=>`Pattern length exceeds max of ${s}.`,bt=s=>`Missing ${s} property in key`,Et=s=>`Property 'weight' in key '${s}' must be a positive integer`,X=Object.prototype.hasOwnProperty;class It{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach(r=>{let n=it(r);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight}),this._keys.forEach(r=>{r.weight/=e})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function it(s){let t=null,e=null,r=null,n=1,i=null;if(w(s)||b(s))r=s,t=J(s),e=B(s);else{if(!X.call(s,"name"))throw new Error(bt("name"));const c=s.name;if(r=c,X.call(s,"weight")&&(n=s.weight,n<=0))throw new Error(Et(c));t=J(c),e=B(c),i=s.getFn}return{path:t,id:e,weight:n,src:r,getFn:i}}function J(s){return b(s)?s:s.split(".")}function B(s){return b(s)?s.join("."):s}function St(s,t){let e=[],r=!1;const n=(i,c,o)=>{if(m(i))if(!c[o])e.push(i);else{let a=c[o];const l=i[a];if(!m(l))return;if(o===c.length-1&&(w(l)||st(l)||xt(l)))e.push(mt(l));else if(b(l)){r=!0;for(let h=0,d=l.length;h<d;h+=1)n(l[h],c,o+1)}else c.length&&n(l,c,o+1)}};return n(s,w(t)?t.split("."):t,0),r?e:e[0]}const $t={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},Lt={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(s,t)=>s.score===t.score?s.idx<t.idx?-1:1:s.score<t.score?-1:1},_t={location:0,threshold:.6,distance:100},At={useExtendedSearch:!1,getFn:St,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var u={...Lt,...$t,..._t,...At};const Rt=/[^ ]+/g;function kt(s=1,t=3){const e=new Map,r=Math.pow(10,t);return{get(n){const i=n.match(Rt).length;if(e.has(i))return e.get(i);const c=1/Math.pow(i,.5*s),o=parseFloat(Math.round(c*r)/r);return e.set(i,o),o},clear(){e.clear()}}}class G{constructor({getFn:t=u.getFn,fieldNormWeight:e=u.fieldNormWeight}={}){this.norm=kt(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((e,r)=>{this._keysMap[e.id]=r})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,w(this.docs[0])?this.docs.forEach((t,e)=>{this._addString(t,e)}):this.docs.forEach((t,e)=>{this._addObject(t,e)}),this.norm.clear())}add(t){const e=this.size();w(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,r=this.size();e<r;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!m(t)||H(t))return;let r={v:t,i:e,n:this.norm.get(t)};this.records.push(r)}_addObject(t,e){let r={i:e,$:{}};this.keys.forEach((n,i)=>{let c=n.getFn?n.getFn(t):this.getFn(t,n.path);if(m(c)){if(b(c)){let o=[];const a=[{nestedArrIndex:-1,value:c}];for(;a.length;){const{nestedArrIndex:l,value:h}=a.pop();if(m(h))if(w(h)&&!H(h)){let d={v:h,i:l,n:this.norm.get(h)};o.push(d)}else b(h)&&h.forEach((d,g)=>{a.push({nestedArrIndex:g,value:d})})}r.$[i]=o}else if(w(c)&&!H(c)){let o={v:c,n:this.norm.get(c)};r.$[i]=o}}}),this.records.push(r)}toJSON(){return{keys:this.keys,records:this.records}}}function ct(s,t,{getFn:e=u.getFn,fieldNormWeight:r=u.fieldNormWeight}={}){const n=new G({getFn:e,fieldNormWeight:r});return n.setKeys(s.map(it)),n.setSources(t),n.create(),n}function Ct(s,{getFn:t=u.getFn,fieldNormWeight:e=u.fieldNormWeight}={}){const{keys:r,records:n}=s,i=new G({getFn:t,fieldNormWeight:e});return i.setKeys(r),i.setIndexRecords(n),i}function j(s,{errors:t=0,currentLocation:e=0,expectedLocation:r=0,distance:n=u.distance,ignoreLocation:i=u.ignoreLocation}={}){const c=t/s.length;if(i)return c;const o=Math.abs(r-e);return n?c+o/n:o?1:c}function Tt(s=[],t=u.minMatchCharLength){let e=[],r=-1,n=-1,i=0;for(let c=s.length;i<c;i+=1){let o=s[i];o&&r===-1?r=i:!o&&r!==-1&&(n=i-1,n-r+1>=t&&e.push([r,n]),r=-1)}return s[i-1]&&i-r>=t&&e.push([r,i-1]),e}const _=32;function Ot(s,t,e,{location:r=u.location,distance:n=u.distance,threshold:i=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:a=u.includeMatches,ignoreLocation:l=u.ignoreLocation}={}){if(t.length>_)throw new Error(vt(_));const h=t.length,d=s.length,g=Math.max(0,Math.min(r,d));let f=i,p=g;const x=o>1||a,$=x?Array(d):[];let v;for(;(v=s.indexOf(t,p))>-1;){let y=j(t,{currentLocation:v,expectedLocation:g,distance:n,ignoreLocation:l});if(f=Math.min(y,f),p=v+h,x){let E=0;for(;E<h;)$[v+E]=1,E+=1}}p=-1;let R=[],L=1,O=h+d;const ut=1<<h-1;for(let y=0;y<h;y+=1){let E=0,I=O;for(;E<I;)j(t,{errors:y,currentLocation:g+I,expectedLocation:g,distance:n,ignoreLocation:l})<=f?E=I:O=I,I=Math.floor((O-E)/2+E);O=I;let Q=Math.max(1,g-I+1),D=c?d:Math.min(g+I,d)+h,k=Array(D+2);k[D+1]=(1<<y)-1;for(let M=D;M>=Q;M-=1){let N=M-1,Y=e[s.charAt(N)];if(x&&($[N]=+!!Y),k[M]=(k[M+1]<<1|1)&Y,y&&(k[M]|=(R[M+1]|R[M])<<1|1|R[M+1]),k[M]&ut&&(L=j(t,{errors:y,currentLocation:N,expectedLocation:g,distance:n,ignoreLocation:l}),L<=f)){if(f=L,p=N,p<=g)break;Q=Math.max(1,2*g-p)}}if(j(t,{errors:y+1,currentLocation:g,expectedLocation:g,distance:n,ignoreLocation:l})>f)break;R=k}const P={isMatch:p>=0,score:Math.max(.001,L)};if(x){const y=Tt($,o);y.length?a&&(P.indices=y):P.isMatch=!1}return P}function Nt(s){let t={};for(let e=0,r=s.length;e<r;e+=1){const n=s.charAt(e);t[n]=(t[n]||0)|1<<r-e-1}return t}class ot{constructor(t,{location:e=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:l=u.ignoreLocation}={}){if(this.options={location:e,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:l},this.pattern=a?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(g,f)=>{this.chunks.push({pattern:g,alphabet:Nt(g),startIndex:f})},d=this.pattern.length;if(d>_){let g=0;const f=d%_,p=d-f;for(;g<p;)h(this.pattern.substr(g,_),g),g+=_;if(f){const x=d-_;h(this.pattern.substr(x),x)}}else h(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:r}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let p={isMatch:!0,score:0};return r&&(p.indices=[[0,t.length-1]]),p}const{location:n,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,ignoreLocation:l}=this.options;let h=[],d=0,g=!1;this.chunks.forEach(({pattern:p,alphabet:x,startIndex:$})=>{const{isMatch:v,score:R,indices:L}=Ot(t,p,x,{location:n+$,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,includeMatches:r,ignoreLocation:l});v&&(g=!0),d+=R,v&&L&&(h=[...h,...L])});let f={isMatch:g,score:g?d/this.chunks.length:1};return g&&r&&(f.indices=h),f}}class S{constructor(t){this.pattern=t}static isMultiMatch(t){return Z(t,this.multiRegex)}static isSingleMatch(t){return Z(t,this.singleRegex)}search(){}}function Z(s,t){const e=s.match(t);return e?e[1]:null}class jt extends S{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class Ft extends S{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const r=t.indexOf(this.pattern)===-1;return{isMatch:r,score:r?0:1,indices:[0,t.length-1]}}}class Pt extends S{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class Dt extends S{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}}class Ht extends S{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class Bt extends S{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}}class at extends S{constructor(t,{location:e=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:l=u.ignoreLocation}={}){super(t),this._bitapSearch=new ot(t,{location:e,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:l})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class lt extends S{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e=0,r;const n=[],i=this.pattern.length;for(;(r=t.indexOf(this.pattern,e))>-1;)e=r+i,n.push([r,e-1]);const c=!!n.length;return{isMatch:c,score:c?0:1,indices:n}}}const K=[jt,lt,Pt,Dt,Bt,Ht,Ft,at],q=K.length,Kt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,zt="|";function Ut(s,t={}){return s.split(zt).map(e=>{let r=e.trim().split(Kt).filter(i=>i&&!!i.trim()),n=[];for(let i=0,c=r.length;i<c;i+=1){const o=r[i];let a=!1,l=-1;for(;!a&&++l<q;){const h=K[l];let d=h.isMultiMatch(o);d&&(n.push(new h(d,t)),a=!0)}if(!a)for(l=-1;++l<q;){const h=K[l];let d=h.isSingleMatch(o);if(d){n.push(new h(d,t));break}}}return n})}const Vt=new Set([at.type,lt.type]);class Wt{constructor(t,{isCaseSensitive:e=u.isCaseSensitive,includeMatches:r=u.includeMatches,minMatchCharLength:n=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:c=u.findAllMatches,location:o=u.location,threshold:a=u.threshold,distance:l=u.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:r,minMatchCharLength:n,findAllMatches:c,ignoreLocation:i,location:o,threshold:a,distance:l},this.pattern=e?t:t.toLowerCase(),this.query=Ut(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let i=0,c=[],o=0;for(let a=0,l=e.length;a<l;a+=1){const h=e[a];c.length=0,i=0;for(let d=0,g=h.length;d<g;d+=1){const f=h[d],{isMatch:p,indices:x,score:$}=f.search(t);if(p){if(i+=1,o+=$,r){const v=f.constructor.type;Vt.has(v)?c=[...c,...x]:c.push(x)}}else{o=0,i=0,c.length=0;break}}if(i){let d={isMatch:!0,score:o/i};return r&&(d.indices=c),d}}return{isMatch:!1,score:1}}}const z=[];function Gt(...s){z.push(...s)}function U(s,t){for(let e=0,r=z.length;e<r;e+=1){let n=z[e];if(n.condition(s,t))return new n(s,t)}return new ot(s,t)}const F={AND:"$and",OR:"$or"},V={PATH:"$path",PATTERN:"$val"},W=s=>!!(s[F.AND]||s[F.OR]),Qt=s=>!!s[V.PATH],Yt=s=>!b(s)&&rt(s)&&!W(s),tt=s=>({[F.AND]:Object.keys(s).map(t=>({[t]:s[t]}))});function ht(s,t,{auto:e=!0}={}){const r=n=>{let i=Object.keys(n);const c=Qt(n);if(!c&&i.length>1&&!W(n))return r(tt(n));if(Yt(n)){const a=c?n[V.PATH]:i[0],l=c?n[V.PATTERN]:n[a];if(!w(l))throw new Error(wt(a));const h={keyId:B(a),pattern:l};return e&&(h.searcher=U(l,t)),h}let o={children:[],operator:i[0]};return i.forEach(a=>{const l=n[a];b(l)&&l.forEach(h=>{o.children.push(r(h))})}),o};return W(s)||(s=tt(s)),r(s)}function Xt(s,{ignoreFieldNorm:t=u.ignoreFieldNorm}){s.forEach(e=>{let r=1;e.matches.forEach(({key:n,norm:i,score:c})=>{const o=n?n.weight:null;r*=Math.pow(c===0&&o?Number.EPSILON:c,(o||1)*(t?1:i))}),e.score=r})}function Jt(s,t){const e=s.matches;t.matches=[],m(e)&&e.forEach(r=>{if(!m(r.indices)||!r.indices.length)return;const{indices:n,value:i}=r;let c={indices:n,value:i};r.key&&(c.key=r.key.src),r.idx>-1&&(c.refIndex=r.idx),t.matches.push(c)})}function Zt(s,t){t.score=s.score}function qt(s,t,{includeMatches:e=u.includeMatches,includeScore:r=u.includeScore}={}){const n=[];return e&&n.push(Jt),r&&n.push(Zt),s.map(i=>{const{idx:c}=i,o={item:t[c],refIndex:c};return n.length&&n.forEach(a=>{a(i,o)}),o})}class A{constructor(t,e={},r){this.options={...u,...e},this.options.useExtendedSearch,this._keyStore=new It(this.options.keys),this.setCollection(t,r)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof G))throw new Error(Mt);this._myIndex=e||ct(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){m(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const e=[];for(let r=0,n=this._docs.length;r<n;r+=1){const i=this._docs[r];t(i,r)&&(this.removeAt(r),r-=1,n-=1,e.push(i))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:r,includeScore:n,shouldSort:i,sortFn:c,ignoreFieldNorm:o}=this.options;let a=w(t)?w(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return Xt(a,{ignoreFieldNorm:o}),i&&a.sort(c),st(e)&&e>-1&&(a=a.slice(0,e)),qt(a,this._docs,{includeMatches:r,includeScore:n})}_searchStringList(t){const e=U(t,this.options),{records:r}=this._myIndex,n=[];return r.forEach(({v:i,i:c,n:o})=>{if(!m(i))return;const{isMatch:a,score:l,indices:h}=e.searchIn(i);a&&n.push({item:i,idx:c,matches:[{score:l,value:i,norm:o,indices:h}]})}),n}_searchLogical(t){const e=ht(t,this.options),r=(o,a,l)=>{if(!o.children){const{keyId:d,searcher:g}=o,f=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(a,d),searcher:g});return f&&f.length?[{idx:l,item:a,matches:f}]:[]}const h=[];for(let d=0,g=o.children.length;d<g;d+=1){const f=o.children[d],p=r(f,a,l);if(p.length)h.push(...p);else if(o.operator===F.AND)return[]}return h},n=this._myIndex.records,i={},c=[];return n.forEach(({$:o,i:a})=>{if(m(o)){let l=r(e,o,a);l.length&&(i[a]||(i[a]={idx:a,item:o,matches:[]},c.push(i[a])),l.forEach(({matches:h})=>{i[a].matches.push(...h)}))}}),c}_searchObjectList(t){const e=U(t,this.options),{keys:r,records:n}=this._myIndex,i=[];return n.forEach(({$:c,i:o})=>{if(!m(c))return;let a=[];r.forEach((l,h)=>{a.push(...this._findMatches({key:l,value:c[h],searcher:e}))}),a.length&&i.push({idx:o,item:c,matches:a})}),i}_findMatches({key:t,value:e,searcher:r}){if(!m(e))return[];let n=[];if(b(e))e.forEach(({v:i,i:c,n:o})=>{if(!m(i))return;const{isMatch:a,score:l,indices:h}=r.searchIn(i);a&&n.push({score:l,key:t,value:i,idx:c,norm:o,indices:h})});else{const{v:i,n:c}=e,{isMatch:o,score:a,indices:l}=r.searchIn(i);o&&n.push({score:a,key:t,value:i,norm:c,indices:l})}return n}}A.version="6.6.2";A.createIndex=ct;A.parseIndex=Ct;A.config=u;A.parseQuery=ht;Gt(Wt);let C=null,T=null;const et={keys:[{name:"title",weight:2},{name:"ingredients",weight:1.5},{name:"tags",weight:1},{name:"cuisine",weight:.8},{name:"instructions",weight:.5}],includeScore:!0,threshold:.4,minMatchCharLength:2};async function te(){if(T)return T;try{if(!C){const s=await fetch("/openrecipes.min.json");if(!s.ok)throw new Error(`Failed to load OpenRecipes: ${s.status}`);C=await s.json(),console.log(`Loaded ${C.length} recipes for search`)}return T=new A(C,et),T}catch(s){return console.error("Error initializing Fuse search:",s),C=[],T=new A(C,et),T}}async function ee(s,t=20){if(!s.trim())return[];try{return(await te()).search(s,{limit:t})}catch(e){return console.error("Error searching recipes:",e),[]}}class se{constructor(t,e,r){if(this.searchTimeout=null,this.minSearchLength=2,this.debounceTime=300,this.isSearching=!1,this.lastQuery="",this.inputElement=document.getElementById(t),this.resultsContainer=document.getElementById(e),this.loadingIndicator=document.getElementById(r),!this.inputElement||!this.resultsContainer){console.error("SearchBar: Required DOM elements not found");return}this.inputElement.addEventListener("input",this.handleInput.bind(this)),this.inputElement.addEventListener("keydown",this.handleKeyDown.bind(this)),this.initFromUrl()}handleInput(){const t=this.inputElement.value.trim();if(this.searchTimeout&&(window.clearTimeout(this.searchTimeout),this.searchTimeout=null),t.length<this.minSearchLength){this.resultsContainer.innerHTML=`
        <div class="text-center py-12 text-gray-500">
          <p>Vui lòng nhập ít nhất ${this.minSearchLength} ký tự để tìm kiếm</p>
        </div>
      `,this.hideLoading(),this.lastQuery="";return}t!==this.lastQuery&&(this.showLoading(),this.searchTimeout=window.setTimeout(()=>{this.performSearch(t),this.updateUrlParam(t)},this.debounceTime))}handleKeyDown(t){if(t.key==="Enter"){const e=this.inputElement.value.trim();this.searchTimeout&&(window.clearTimeout(this.searchTimeout),this.searchTimeout=null),e.length>=this.minSearchLength&&(this.showLoading(),this.performSearch(e),this.updateUrlParam(e))}}async performSearch(t){if(!this.isSearching){this.isSearching=!0,this.lastQuery=t;try{const[e,r,n]=await Promise.all([ee(t,20),dt(t),gt(t)]),i=this.generateMealResultsHtml(r),c=this.generateDrinkResultsHtml(n),o=this.generateOpenRecipesHtml(e),a=`
        <h2 class="text-2xl font-bold mb-6">Kết quả tìm kiếm cho "${t}"</h2>
        
        ${i}
        ${c}
        ${o}
        
        ${!r.length&&!n.length&&!e.length?`
          <div class="text-center py-12 bg-gray-50 rounded-lg">
            <p class="text-gray-600 mb-2">Không tìm thấy kết quả nào phù hợp</p>
            <p class="text-gray-500 text-sm">Hãy thử từ khóa khác hoặc kiểm tra lỗi chính tả</p>
          </div>
        `:""}
      `;this.resultsContainer.innerHTML=a}catch(e){console.error("Search error:",e),this.resultsContainer.innerHTML=`
        <div class="text-center py-12 bg-red-50 rounded-lg">
          <p class="text-red-600 mb-2">Đã xảy ra lỗi khi tìm kiếm</p>
          <p class="text-red-500 text-sm">Vui lòng thử lại sau</p>
        </div>
      `}finally{this.hideLoading(),this.isSearching=!1}}}generateMealResultsHtml(t){return t.length?`
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Món ăn (${t.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${t.map(e=>`
            <a href="/recipe/meal/${e.idMeal}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${e.strMealThumb}" 
                  alt="${e.strMeal}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${e.strMeal}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${e.strCategory?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${e.strCategory}
                    </span>
                  `:""}
                  
                  ${e.strArea?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${e.strArea}
                    </span>
                  `:""}
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `:""}generateDrinkResultsHtml(t){return t.length?`
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Đồ uống (${t.length})
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${t.map(e=>`
            <a href="/recipe/drink/${e.idDrink}" class="card group h-full flex flex-col">
              <div class="relative pb-[65%] overflow-hidden">
                <img 
                  src="${e.strDrinkThumb}" 
                  alt="${e.strDrink}"
                  loading="lazy"
                  class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                ${e.strAlcoholic?`
                  <span class="absolute top-2 right-2 badge badge-primary">
                    ${e.strAlcoholic}
                  </span>
                `:""}
              </div>
              
              <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  ${e.strDrink}
                </h3>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-3">
                  ${e.strCategory?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${e.strCategory}
                    </span>
                  `:""}
                  
                  ${e.strGlass?`
                    <span class="badge bg-gray-100 text-gray-800">
                      ${e.strGlass}
                    </span>
                  `:""}
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `:""}generateOpenRecipesHtml(t){return t.length?`
      <section class="mb-10">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          OpenRecipes (${t.length})
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${t.map(({item:e})=>`
            <div class="card h-full flex flex-col p-4">
              <h3 class="font-semibold text-lg mb-2 text-gray-800">
                ${e.title}
              </h3>
              
              ${e.cuisine?`
                <div class="mb-3">
                  <span class="badge badge-secondary">
                    ${e.cuisine}
                  </span>
                </div>
              `:""}
              
              <div class="mt-2 text-sm text-gray-600 line-clamp-3 mb-3">
                <strong>Nguyên liệu:</strong> ${e.ingredients.substring(0,100)}${e.ingredients.length>100?"...":""}
              </div>
              
              <div class="mt-auto flex flex-wrap gap-1">
                ${e.tags.slice(0,3).map(r=>`
                  <span class="badge bg-gray-100 text-gray-800 text-xs">
                    ${r}
                  </span>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `:""}showLoading(){this.loadingIndicator&&this.loadingIndicator.classList.remove("hidden")}hideLoading(){this.loadingIndicator&&this.loadingIndicator.classList.add("hidden")}updateUrlParam(t){const e=new URL(window.location.href);e.searchParams.set("q",t),window.history.replaceState({},"",e.toString())}initFromUrl(){const e=new URLSearchParams(window.location.search).get("q");e&&e.length>=this.minSearchLength&&(this.inputElement.value=e,this.showLoading(),this.performSearch(e))}}document.addEventListener("DOMContentLoaded",()=>{const s="search-input",t="search-results",e="search-loading";document.getElementById(s)&&new se(s,t,e)});document.querySelectorAll("[data-search-hint]").forEach(s=>{s.addEventListener("click",()=>{const t=s.getAttribute("data-search-hint"),e=document.getElementById("search-input");e&&t&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))})});
