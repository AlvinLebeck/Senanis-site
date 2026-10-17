function e(e){let t=e.trim().split(/\s+/);if(t.length!==6)throw Error(`Each field moment must contain exactly 6 words: "${e}"`);return t}function t(e,t,n){let r=e.map(e=>e[t]),i=(n%r.length+r.length)%r.length,a=r.slice(-i).concat(r.slice(0,-i));for(let n=0;n<e.length;n+=1)e[n][t]=a[n]}function n(e,t){let n=e.length,r=Array.from({length:n},()=>Array(n));for(let i=0;i<n;i+=1){let a=e.map(e=>e[i]),o=t[i];for(let e=0;e<n;e+=1){let t=(e-o+n)%n;r[e][i]=a[t]}}return r}function r(e){let t=[];do t=Array.from({length:e},()=>Math.floor(Math.random()*e));while(t.every(e=>e===0));return t}function i(e,t){return Math.min(e,t-e)}function a(e,t){return e===0?0:e<=t/2?-1:1}function o(e){let t=e.length,n=e.slice();for(let e=t-1;e>=0;--e){let r=n[e];if(i(r,t)===0)continue;let o=(r+a(r,t)+t)%t;if(i(o,t)<i(r,t))return n[e]=o,n}return n}function s(e){let t=[e.slice()],n=e.slice();for(;!n.every(e=>e===0);)n=o(n),t.push(n.slice());return t}function c(e,t){let r=Array.from({length:e.length},()=>[]);return t.forEach(t=>{n(e,t).forEach((e,t)=>{r[t].push(e.join(` `))})}),r}function l(n){if(n.dataset.fieldMounted===`true`)return;n.dataset.fieldMounted=`true`;let i=n.dataset.fieldCompact===`true`,a=JSON.parse(n.dataset.field||`{}`),o=a.moments.map(e),l=o.map(e=>e.slice()),u=Array.from({length:o.length},()=>0);n.innerHTML=`
    <div class="field-shell">
      <div class="field-header" ${i?`hidden`:``}>
        <p class="field-kicker">${a.title}</p>
        <h1 class="field-title">${a.poeticTitle||a.title}</h1>
        <p class="field-summary">${a.summary}</p>
      </div>
      <ol class="field-list" ${i?`aria-live="polite"`:``}></ol>
      <div class="field-controls" aria-label="Rotate word positions"></div>
      <p class="field-meta" ${i?`hidden`:``}>Rotate any position, reset, randomize, or wander back to the field's base form.</p>
      <div class="field-actions">
        <button class="pill-button" data-action="reset" type="button">Reset</button>
        <button class="pill-button" data-action="randomize" type="button">Randomize</button>
        <button class="pill-button" data-action="wander" type="button" ${i?`hidden`:``}>Wander through this field</button>
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
  `;let d=a.poeticTitle||a.title,f=n.querySelector(`.field-title`),p=n.parentElement?.querySelector(`.field-return-link`),m=n.querySelector(`.field-summary`),h=n.querySelector(`.field-list`),g=n.querySelector(`.field-controls`),_=n.querySelector(`.field-meta`),v=n.querySelector(`.field-actions`),y=n.querySelector(`.field-wander`),b=n.querySelector(`.field-wander-chamber`),x=n.querySelector(`.field-wander-sequence`);function S(){h.innerHTML=``,l.forEach(e=>{let t=document.createElement(`li`);t.textContent=e.join(` `),h.appendChild(t)}),g.innerHTML=``,u.forEach((e,n)=>{let r=document.createElement(`button`);r.type=`button`,r.className=`rotate-pill`,r.innerHTML=`<span class="rotate-pill__index">${n+1}</span><span>Rotate</span>`,r.addEventListener(`click`,()=>{t(l,n,1),u[n]=(u[n]+1)%l.length,S()}),g.appendChild(r)})}function C(e){let t=e===`wander`;f.textContent=t?`${d} - Wander`:d,p&&p.classList.toggle(`is-hidden`,t),m.classList.toggle(`is-hidden`,t),h.classList.toggle(`is-hidden`,t),g.classList.toggle(`is-hidden`,t),_.classList.toggle(`is-hidden`,t),v.classList.toggle(`is-hidden`,t),y.classList.toggle(`is-hidden`,!t)}function w(){l=o.map(e=>e.slice()),u=Array.from({length:o.length},()=>0),S()}function T(){w(),u.forEach((e,n)=>{let r=Math.floor(Math.random()*l.length);t(l,n,r),u[n]=r}),S()}function E(e){x.innerHTML=``;let t=e.reduce((e,t)=>Math.max(e,t.length),0),n=Math.max(5,Math.min(t,9));b.style.setProperty(`--wander-visible-lines`,String(n)),x.scrollTop=0,e.forEach(e=>{let t=document.createElement(`section`);t.className=`wander-stanza`;let n=document.createElement(`ul`);n.className=`wander-list`,e.forEach(e=>{let t=document.createElement(`li`);t.textContent=e,n.appendChild(t)}),t.appendChild(n),x.appendChild(t)})}function D(){let e=s(r(o.length));E(c(o,e)),C(`wander`),window.scrollTo({top:0,behavior:`smooth`})}n.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;e.preventDefault();let n=t.dataset.action;n===`reset`&&w(),n===`randomize`&&T(),(n===`wander`||n===`wander-again`)&&D(),n===`back`&&C(`field`)}),w(),C(`field`)}document.querySelectorAll(`[data-field-root='true']`).forEach(e=>{l(e)});