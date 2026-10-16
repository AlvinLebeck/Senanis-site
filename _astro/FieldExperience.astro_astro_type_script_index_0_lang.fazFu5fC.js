function e(e){let t=e.trim().split(/\s+/);if(t.length!==6)throw Error(`Each field moment must contain exactly 6 words: "${e}"`);return t}function t(e,t,n){let r=e.map(e=>e[t]),i=(n%r.length+r.length)%r.length,a=r.slice(-i).concat(r.slice(0,-i));for(let n=0;n<e.length;n+=1)e[n][t]=a[n]}function n(e,t){let n=e.length,r=Array.from({length:n},()=>Array(n));for(let i=0;i<n;i+=1){let a=e.map(e=>e[i]),o=t[i];for(let e=0;e<n;e+=1){let t=(e-o+n)%n;r[e][i]=a[t]}}return r}function r(e){let t=[];do t=Array.from({length:e},()=>Math.floor(Math.random()*e));while(t.every(e=>e===0));return t}function i(e,t){return Math.min(e,t-e)}function a(e,t){return e===0?0:e<=t/2?-1:1}function o(e){let t=e.length,n=e.slice();for(let e=t-1;e>=0;--e){let r=n[e];if(i(r,t)===0)continue;let o=(r+a(r,t)+t)%t;if(i(o,t)<i(r,t))return n[e]=o,n}return n}function s(e){let t=[e.slice()],n=e.slice();for(;!n.every(e=>e===0);)n=o(n),t.push(n.slice());return t}function c(e,t){let r=Array.from({length:e.length},()=>[]);return t.forEach(t=>{n(e,t).forEach((e,t)=>{r[t].push(e.join(` `))})}),r}function l(n){let i=JSON.parse(n.dataset.field||`{}`),a=i.moments.map(e),o=a.map(e=>e.slice()),l=Array.from({length:a.length},()=>0);n.innerHTML=`
    <div class="field-shell">
      <div class="field-header">
        <p class="field-kicker">${i.title}</p>
        <h1 class="field-title">${i.poeticTitle||i.title}</h1>
        <p class="field-summary">${i.summary}</p>
      </div>
      <ol class="field-list"></ol>
      <div class="field-controls" aria-label="Rotate word positions"></div>
      <p class="field-meta">Rotate any position, reset, randomize, or wander back to the field's base form.</p>
      <div class="field-actions">
        <button class="pill-button" data-action="reset" type="button">Reset</button>
        <button class="pill-button" data-action="randomize" type="button">Randomize</button>
        <button class="pill-button" data-action="wander" type="button">Wander through this field</button>
      </div>
      <div class="field-wander is-hidden">
        <div class="field-wander-chamber">
          <div class="field-wander-sequence" aria-live="polite" tabindex="0"></div>
        </div>
        <div class="field-wander-links">
          <a href="#" data-action="back">Back to Field</a>
          <span aria-hidden="true">·</span>
          <a href="#" data-action="wander-again">Wander Again</a>
        </div>
      </div>
    </div>
  `;let u=i.poeticTitle||i.title,d=n.querySelector(`.field-title`),f=n.parentElement?.querySelector(`.field-return-link`),p=n.querySelector(`.field-summary`),m=n.querySelector(`.field-list`),h=n.querySelector(`.field-controls`),g=n.querySelector(`.field-meta`),_=n.querySelector(`.field-actions`),v=n.querySelector(`.field-wander`),y=n.querySelector(`.field-wander-chamber`),b=n.querySelector(`.field-wander-sequence`);function x(){m.innerHTML=``,o.forEach(e=>{let t=document.createElement(`li`);t.textContent=e.join(` `),m.appendChild(t)}),h.innerHTML=``,l.forEach((e,n)=>{let r=document.createElement(`button`);r.type=`button`,r.className=`rotate-pill`,r.innerHTML=`<span class="rotate-pill__index">${n+1}</span><span>Rotate</span>`,r.addEventListener(`click`,()=>{t(o,n,1),l[n]=(l[n]+1)%o.length,x()}),h.appendChild(r)})}function S(e){let t=e===`wander`;d.textContent=t?`${u} - Wander`:u,f&&f.classList.toggle(`is-hidden`,t),p.classList.toggle(`is-hidden`,t),m.classList.toggle(`is-hidden`,t),h.classList.toggle(`is-hidden`,t),g.classList.toggle(`is-hidden`,t),_.classList.toggle(`is-hidden`,t),v.classList.toggle(`is-hidden`,!t)}function C(){o=a.map(e=>e.slice()),l=Array.from({length:a.length},()=>0),x()}function w(){C(),l.forEach((e,n)=>{let r=Math.floor(Math.random()*o.length);t(o,n,r),l[n]=r}),x()}function T(e){b.innerHTML=``;let t=e.reduce((e,t)=>Math.max(e,t.length),0),n=Math.max(5,Math.min(t,9));y.style.setProperty(`--wander-visible-lines`,String(n)),b.scrollTop=0,e.forEach(e=>{let t=document.createElement(`section`);t.className=`wander-stanza`;let n=document.createElement(`ul`);n.className=`wander-list`,e.forEach(e=>{let t=document.createElement(`li`);t.textContent=e,n.appendChild(t)}),t.appendChild(n),b.appendChild(t)})}function E(){let e=s(r(a.length));T(c(a,e)),S(`wander`),window.scrollTo({top:0,behavior:`smooth`})}n.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;e.preventDefault();let n=t.dataset.action;n===`reset`&&C(),n===`randomize`&&w(),(n===`wander`||n===`wander-again`)&&E(),n===`back`&&S(`field`)}),C(),S(`field`)}document.querySelectorAll(`[data-field-root='true']`).forEach(e=>{l(e)});