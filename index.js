import{a as y,S as g}from"./assets/vendor-DBMDmZZa.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const b="47404996-12b53dec464063fd6255bb496",L="https://pixabay.com/api/";async function f(t,r=1,n=15){const s=`${L}?key=${b}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${n}`;try{return(await y.get(s)).data}catch(e){throw console.error("Error fetching images:",e),e}}function h(t){return t.map(({webformatURL:r,largeImageURL:n,tags:s,likes:e,views:o,comments:i,downloads:m})=>`
        <div class="photo-card">
        <a href="${n}">
            <img src="${r}" alt="${s}" loading="lazy" />
        </a>
        <div class="info">
            <p><b>Likes:</b> ${e}</p>
            <p><b>Views:</b> ${o}</p>
            <p><b>Comments:</b> ${i}</p>
            <p><b>Downloads:</b> ${m}</p>
        </div>
        </div>
        `).join("")}const v=document.querySelector("#search-form"),l=document.querySelector(".gallery"),d=document.querySelector(".load-more");let c="",a=1;const u=15,p=new g(".gallery a");v.addEventListener("submit",$);d.addEventListener("click",S);async function $(t){if(t.preventDefault(),c=t.currentTarget.elements.searchQuery.value.trim(),!c){alert("Search query cannot be empty!");return}a=1,l.innerHTML="",d.classList.add("hidden");try{const{hits:r,totalHits:n}=await f(c,a,u);if(r.length===0){alert("Sorry, no images match your search query.");return}l.innerHTML=h(r),p.refresh(),n>u&&d.classList.remove("hidden")}catch(r){console.error("Error:",r)}}async function S(){a+=1;try{const{hits:t,totalHits:r}=await f(c,a,u);l.insertAdjacentHTML("beforeend",h(t)),p.refresh(),a*u>=r&&(d.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results.")),w()}catch(t){console.error("Error:",t)}}function w(){const{height:t}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
