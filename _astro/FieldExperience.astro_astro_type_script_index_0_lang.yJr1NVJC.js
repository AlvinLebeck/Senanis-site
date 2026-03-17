function W(e){const t=e.trim().split(/\s+/);if(t.length!==6)throw new Error(`Each field moment must contain exactly 6 words: "${e}"`);return t}function L(e,t,n){const a=e.map(r=>r[t]),s=(n%a.length+a.length)%a.length,c=a.slice(-s).concat(a.slice(0,-s));for(let r=0;r<e.length;r+=1)e[r][t]=c[r]}function F(e,t){const n=e.length,a=Array.from({length:n},()=>Array(n));for(let s=0;s<n;s+=1){const c=e.map(d=>d[s]),r=t[s];for(let d=0;d<n;d+=1){const u=(d-r+n)%n;a[d][s]=c[u]}}return a}function R(e){let t=[];do t=Array.from({length:e},()=>Math.floor(Math.random()*e));while(t.every(n=>n===0));return t}function E(e,t){return Math.min(e,t-e)}function $(e,t){return e===0?0:e<=t/2?-1:1}function H(e){const t=e.length,n=e.slice();for(let a=t-1;a>=0;a-=1){const s=n[a];if(E(s,t)===0)continue;const c=$(s,t),r=(s+c+t)%t;if(E(r,t)<E(s,t))return n[a]=r,n}return n}function j(e){const t=[e.slice()];let n=e.slice();for(;!n.every(a=>a===0);)n=H(n),t.push(n.slice());return t}function N(e,t){const n=Array.from({length:e.length},()=>[]);return t.forEach(a=>{F(e,a).forEach((c,r)=>{n[r].push(c.join(" "))})}),n}function _(e){const t=JSON.parse(e.dataset.field||"{}"),n=t.moments.map(W);let a=n.map(l=>l.slice()),s=Array.from({length:n.length},()=>0);e.innerHTML=`
    <div class="field-shell">
      <div class="field-header">
        <p class="field-kicker">${t.title}</p>
        <h2 class="field-title">${t.poeticTitle||t.title}</h2>
        <p class="field-summary">${t.summary}</p>
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
  `;const c=t.poeticTitle||t.title,r=e.querySelector(".field-title"),d=e.parentElement?.querySelector(".field-return-link"),u=e.querySelector(".field-summary"),h=e.querySelector(".field-list"),m=e.querySelector(".field-controls"),q=e.querySelector(".field-meta"),M=e.querySelector(".field-actions"),T=e.querySelector(".field-wander"),x=e.querySelector(".field-wander-chamber"),p=e.querySelector(".field-wander-sequence");function g(){h.innerHTML="",a.forEach(l=>{const i=document.createElement("li");i.textContent=l.join(" "),h.appendChild(i)}),m.innerHTML="",s.forEach((l,i)=>{const o=document.createElement("button");o.type="button",o.className="rotate-pill",o.innerHTML=`<span class="rotate-pill__index">${i+1}</span><span>Rotate</span>`,o.addEventListener("click",()=>{L(a,i,1),s[i]=(s[i]+1)%a.length,g()}),m.appendChild(o)})}function w(l){const i=l==="wander";r.textContent=i?`${c} - Wander`:c,d&&d.classList.toggle("is-hidden",i),u.classList.toggle("is-hidden",i),h.classList.toggle("is-hidden",i),m.classList.toggle("is-hidden",i),q.classList.toggle("is-hidden",i),M.classList.toggle("is-hidden",i),T.classList.toggle("is-hidden",!i)}function y(){a=n.map(l=>l.slice()),s=Array.from({length:n.length},()=>0),g()}function k(){y(),s.forEach((l,i)=>{const o=Math.floor(Math.random()*a.length);L(a,i,o),s[i]=o}),g()}function C(l){p.innerHTML="";const i=l.reduce((b,f)=>Math.max(b,f.length),0),o=Math.max(5,Math.min(i,9));x.style.setProperty("--wander-visible-lines",String(o)),p.scrollTop=0,l.forEach(b=>{const f=document.createElement("section");f.className="wander-stanza";const v=document.createElement("ul");v.className="wander-list",b.forEach(A=>{const S=document.createElement("li");S.textContent=A,v.appendChild(S)}),f.appendChild(v),p.appendChild(f)})}function z(){const l=j(R(n.length)),i=N(n,l);C(i),w("wander"),window.scrollTo({top:0,behavior:"smooth"})}e.addEventListener("click",l=>{const i=l.target.closest("[data-action]");if(!i)return;l.preventDefault();const o=i.dataset.action;o==="reset"&&y(),o==="randomize"&&k(),(o==="wander"||o==="wander-again")&&z(),o==="back"&&w("field")}),y(),w("field")}document.querySelectorAll("[data-field-root='true']").forEach(e=>{_(e)});
