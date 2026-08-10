import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,u as c}from"./momentle.mA0nTNac.js";var l={order:`momentle_reflect_order_v1`,revealed:`momentle_reflect_revealed_v1`,week:`momentle_reflect_week_v1`};function u(e,t){try{localStorage.setItem(e,t)}catch(t){console.warn(`Unable to save ${e}`,t)}}function d(){try{let t=e(o());if(localStorage.getItem(l.week)!==t)return localStorage.setItem(l.week,t),localStorage.removeItem(l.order),localStorage.removeItem(l.revealed),{order:null,revealed:!1};let n=localStorage.getItem(l.order);return{order:n?JSON.parse(n):null,revealed:localStorage.getItem(l.revealed)===`true`}}catch(e){return console.warn(`Unable to restore Momentle reflect state`,e),{order:null,revealed:!1}}}function f(e){let f=JSON.parse(e.dataset.moments||`[]`),p=e.dataset.weekZero||`2026-01-05`,m=o(),{rawText:h}=s(f,p,m),g=a(h).split(/\s+/),_=d(),v=_.order&&Array.isArray(_.order)&&_.order.length===g.length?_.order.slice():t(g);v.join(` `)===g.join(` `)&&(v=t(g));let y=_.revealed;e.innerHTML=`
    <div class="momentle-shell">
      <p class="momentle-kicker">Reflect</p>
      <p class="momentle-date">Week of ${n(m).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`})}</p>
      <p class="momentle-status is-hidden" aria-live="polite"></p>
      <div class="momentle-tiles" aria-label="Arrange the words"></div>
      <button class="pill-button pill-button--solid" type="button">Reveal Senanis Moment</button>
      <div class="momentle-reveal" hidden></div>
    </div>
  `;let b=e.querySelector(`.momentle-tiles`),x=e.querySelector(`button`),S=e.querySelector(`.momentle-status`),C=e.querySelector(`.momentle-reveal`);function w(){u(l.order,JSON.stringify(v))}function T(){b.innerHTML=``,v.forEach(e=>{let t=document.createElement(`div`);t.className=`momentle-tile`,t.textContent=e,b.appendChild(t)})}function E(){let e=r(i(v.join(` `))),t=r(i(h.replace(/[.!?]\s*$/,``)));S.textContent=`This week’s Senanis Moment has been revealed.`,S.classList.remove(`is-hidden`),x.textContent=`Senanis Moment Revealed`,x.disabled=!0,C.innerHTML=`
      <div class="momentle-label">Your arrangement</div>
      <div class="momentle-line">${e}</div>
      <div class="momentle-label">The Senanis Moment</div>
      <div class="momentle-line">${t}</div>
      <p class="momentle-prompt">Where do these words take you?</p>
    `,C.hidden=!1}T(),w();let D=c.create(b,{animation:150,ghostClass:`momentle-tile-ghost`,chosenClass:`momentle-tile-chosen`,dragClass:`momentle-tile-drag`,forceFallback:!0,onEnd(){if(y){D.option(`disabled`,!0);return}v=Array.from(b.children).map(e=>e.textContent),w()}});x.addEventListener(`click`,()=>{y||(v=Array.from(b.children).map(e=>e.textContent),w(),y=!0,u(l.revealed,`true`),D.option(`disabled`,!0),E())}),y&&(D.option(`disabled`,!0),E())}var p=document.querySelector(`[data-momentle-root='true']`);p&&f(p);