import{D as T,p as W,n as L,s as b,g as C,S as O,a as A,b as E,w as y,c as k}from"./momentle.CM63doDy.js";const t={order:"momentle_reflect_order_v1",revealed:"momentle_reflect_revealed_v1",week:"momentle_reflect_week_v1"};function w(e,c){try{localStorage.setItem(e,c)}catch(l){console.warn(`Unable to save ${e}`,l)}}function x(){try{const e=A(E());if(localStorage.getItem(t.week)!==e)return localStorage.setItem(t.week,e),localStorage.removeItem(t.order),localStorage.removeItem(t.revealed),{order:null,revealed:!1};const l=localStorage.getItem(t.order),i=l?JSON.parse(l):null,d=localStorage.getItem(t.revealed)==="true";return{order:i,revealed:d}}catch(e){return console.warn("Unable to restore Momentle reflect state",e),{order:null,revealed:!1}}}function I(e){const c=JSON.parse(e.dataset.moments||"[]"),l=e.dataset.weekZero||T,i=E(),{rawText:d}=W(c,l,i),m=L(d).split(/\s+/),n=x();let r=n.order&&Array.isArray(n.order)&&n.order.length===m.length?n.order.slice():b(m);r.join(" ")===m.join(" ")&&(r=b(m));let u=n.revealed;e.innerHTML=`
    <div class="momentle-shell">
      <p class="momentle-kicker">Reflect</p>
      <p class="momentle-date">Week of ${C(i).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p>
      <p class="momentle-status is-hidden" aria-live="polite"></p>
      <div class="momentle-tiles" aria-label="Arrange the words"></div>
      <button class="pill-button pill-button--solid" type="button">Reveal Moment</button>
      <div class="momentle-reveal" hidden></div>
    </div>
  `;const a=e.querySelector(".momentle-tiles"),v=e.querySelector("button"),h=e.querySelector(".momentle-status"),S=e.querySelector(".momentle-reveal");function f(){w(t.order,JSON.stringify(r))}function _(){a.innerHTML="",r.forEach(o=>{const s=document.createElement("div");s.className="momentle-tile",s.textContent=o,a.appendChild(s)})}function g(){const o=y(k(r.join(" "))),s=y(k(d.replace(/[.!?]\s*$/,"")));h.textContent="This week’s Moment has been revealed.",h.classList.remove("is-hidden"),v.textContent="Moment Revealed",v.disabled=!0,S.innerHTML=`
      <div class="momentle-label">Your arrangement</div>
      <div class="momentle-line">${o}</div>
      <div class="momentle-label">The Moment</div>
      <div class="momentle-line">${s}</div>
      <p class="momentle-prompt">Where do these words take you?</p>
    `,S.hidden=!1}_(),f();const p=O.create(a,{animation:150,ghostClass:"momentle-tile-ghost",chosenClass:"momentle-tile-chosen",dragClass:"momentle-tile-drag",forceFallback:!0,onEnd(){if(u){p.option("disabled",!0);return}r=Array.from(a.children).map(o=>o.textContent),f()}});v.addEventListener("click",()=>{u||(r=Array.from(a.children).map(o=>o.textContent),f(),u=!0,w(t.revealed,"true"),p.option("disabled",!0),g())}),u&&(p.option("disabled",!0),g())}const M=document.querySelector("[data-momentle-root='true']");M&&I(M);
