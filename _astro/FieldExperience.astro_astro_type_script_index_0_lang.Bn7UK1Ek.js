function T(e){const t=e.trim().split(/\s+/);if(t.length!==6)throw new Error(`Each field moment must contain exactly 6 words: "${e}"`);return t}function v(e,t,n){const i=e.map(r=>r[t]),s=(n%i.length+i.length)%i.length,c=i.slice(-s).concat(i.slice(0,-s));for(let r=0;r<e.length;r+=1)e[r][t]=c[r]}function W(e,t){const n=e.length,i=Array.from({length:n},()=>Array(n));for(let s=0;s<n;s+=1){const c=e.map(d=>d[s]),r=t[s];for(let d=0;d<n;d+=1){const f=(d-r+n)%n;i[d][s]=c[f]}}return i}function A(e){let t=[];do t=Array.from({length:e},()=>Math.floor(Math.random()*e));while(t.every(n=>n===0));return t}function w(e,t){return Math.min(e,t-e)}function C(e,t){return e===0?0:e<=t/2?-1:1}function z(e){const t=e.length,n=e.slice();for(let i=t-1;i>=0;i-=1){const s=n[i];if(w(s,t)===0)continue;const c=C(s,t),r=(s+c+t)%t;if(w(r,t)<w(s,t))return n[i]=r,n}return n}function F(e){const t=[e.slice()];let n=e.slice();for(;!n.every(i=>i===0);)n=z(n),t.push(n.slice());return t}function R(e,t){const n=Array.from({length:e.length},()=>[]);return t.forEach(i=>{W(e,i).forEach((c,r)=>{n[r].push(c.join(" "))})}),n}function j(e){const t=JSON.parse(e.dataset.field||"{}"),n=t.moments.map(T);let i=n.map(l=>l.slice()),s=Array.from({length:n.length},()=>0);e.innerHTML=`
    <div class="field-shell">
      <div class="field-header">
        <h2 class="field-title">${t.title}</h2>
        <p class="field-summary">${t.summary}</p>
      </div>
      <div class="field-top-links is-hidden">
        <a href="#" data-action="back-top">Back to Field</a>
        <span aria-hidden="true">·</span>
        <a href="#" data-action="wander-top">Wander Again</a>
      </div>
      <ol class="field-list"></ol>
      <div class="field-controls" aria-label="Rotate word positions"></div>
      <p class="field-meta">Rotate any position to realign the structure. Wander starts from a random state and settles toward the base field.</p>
      <div class="field-actions">
        <button class="pill-button" data-action="reset" type="button">Reset</button>
        <button class="pill-button" data-action="randomize" type="button">Randomize</button>
        <button class="pill-button" data-action="wander" type="button">Wander through this field</button>
      </div>
      <div class="field-wander is-hidden">
        <div class="field-wander-sequence" aria-live="polite"></div>
        <div class="field-wander-links">
          <a href="#" data-action="back">Back to Field</a>
          <span aria-hidden="true">·</span>
          <a href="#" data-action="wander-again">Wander Again</a>
        </div>
      </div>
    </div>
  `;const c=e.querySelector(".field-title"),r=e.querySelector(".field-summary"),d=e.querySelector(".field-top-links"),f=e.querySelector(".field-list"),u=e.querySelector(".field-controls"),E=e.querySelector(".field-meta"),S=e.querySelector(".field-actions"),L=e.querySelector(".field-wander"),y=e.querySelector(".field-wander-sequence");function h(){f.innerHTML="",i.forEach(l=>{const a=document.createElement("li");a.textContent=l.join(" "),f.appendChild(a)}),u.innerHTML="",s.forEach((l,a)=>{const o=document.createElement("button");o.type="button",o.className="rotate-pill",o.innerHTML=`<span class="rotate-pill__index">${a+1}</span><span>Rotate</span>`,o.addEventListener("click",()=>{v(i,a,1),s[a]=(s[a]+1)%i.length,h()}),u.appendChild(o)})}function p(l){const a=l==="wander";c.textContent=a?`${t.title} - Wander`:t.title,r.classList.toggle("is-hidden",a),f.classList.toggle("is-hidden",a),u.classList.toggle("is-hidden",a),E.classList.toggle("is-hidden",a),S.classList.toggle("is-hidden",a),d.classList.toggle("is-hidden",!a),L.classList.toggle("is-hidden",!a)}function m(){i=n.map(l=>l.slice()),s=Array.from({length:n.length},()=>0),h()}function q(){m(),s.forEach((l,a)=>{const o=Math.floor(Math.random()*i.length);v(i,a,o),s[a]=o}),h()}function k(l){y.innerHTML="",l.forEach(a=>{const o=document.createElement("section");o.className="wander-stanza";const g=document.createElement("ul");g.className="wander-list",a.forEach(x=>{const b=document.createElement("li");b.textContent=x,g.appendChild(b)}),o.appendChild(g),y.appendChild(o)})}function M(){const l=F(A(n.length)),a=R(n,l);k(a),p("wander"),window.scrollTo({top:0,behavior:"smooth"})}e.addEventListener("click",l=>{const a=l.target.closest("[data-action]");if(!a)return;l.preventDefault();const o=a.dataset.action;o==="reset"&&m(),o==="randomize"&&q(),(o==="wander"||o==="wander-again"||o==="wander-top")&&M(),(o==="back"||o==="back-top")&&p("field")}),m(),p("field")}document.querySelectorAll("[data-field-root='true']").forEach(e=>{j(e)});
