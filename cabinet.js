import { cases } from './case-data.js';

const $ = (s) => document.querySelector(s);
const replica = document.body.dataset.mode === 'replica';
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let motion = !reduced.matches, opened = false, tab = 0, selected = 0, credits = 0;
const projectKeys = ['insurminds','oferta','papaia','vinky','talentos','devseg','autoquote'];
const tabs = [
  { label:'SOBRE', title:'AI BUILDER', type:'about' },
  { label:'PROJETOS', title:'PROJETOS', keys:projectKeys },
  { label:'AUTOMAÇÃO', title:'MENOS TRABALHO MANUAL', keys:['reports','dashboard','oferta'] },
  { label:'STACK', title:'MINHA CAIXA DE FERRAMENTAS', type:'tools' }
];
if (replica) {
  document.title = 'Cabinet · Estudo de interação';
  $('.sr-only').textContent = 'Cabinet · Estudo de interação em pixel art';
  $('.portrait canvas').setAttribute('aria-label','Retrato pixelado de personagem fictício');
  $('.profile h2').textContent = 'ALEX MORGAN';
  $('.contact-list').innerHTML = '<li>hello@example.com</li><li>ESTUDO INTERATIVO</li><li>PERSONAGEM FICTÍCIO</li>';
  $('.signature').textContent = '<DEMO/>';
  $('.topbar [download]').remove();
  $('.start').innerHTML = '<span>PRESS</span> <kbd>ENTER</kbd> <span>TO CONTINUE</span>';
  tabs[0] = {label:'EXPERIENCE',title:'EXPERIENCE',type:'demo'};
  tabs[1] = {label:'PROJECTS',title:'PROJECTS',type:'demo'};
  tabs[2] = {label:'ABOUT',title:'ABOUT',type:'demo'};
  tabs[3].label = 'SKILLS';
}

function renderTabs() {
  $('.tabs').innerHTML = tabs.map((t,i) => `<button role="tab" id="tab-${i}" aria-controls="portfolio-panel" aria-selected="${i===tab}" tabindex="${i===tab?0:-1}" data-tab="${i}"><span>${i+1}</span>${t.label}</button>`).join('');
  renderPanel();
}
function renderPanel() {
  const t = tabs[tab], panel = $('.panel');
  panel.id = 'portfolio-panel'; panel.setAttribute('aria-labelledby',`tab-${tab}`);
  let html = `<h3 class="panel-heading">${t.title}</h3>`;
  if (t.type === 'about') {
    html += '<div class="about-copy"><p>Olá, sou <strong>Victor Hugo.</strong></p><p>Construo produtos digitais e automatizo rotinas. Uso IA para transformar documentos e dados em ferramentas que ajudam no trabalho de verdade.</p><p>Minha experiência passa por seguros, resseguros e análise de dados. Hoje conecto esse repertório ao desenvolvimento de aplicações e agentes com IA.</p><p>Explore os projetos no próximo botão — ou use as setas do teclado.</p></div><button class="read-case" data-next>EXPLORAR PROJETOS →</button>';
  } else if (t.type === 'tools') {
    html += '<div class="skills-grid">'+[
      ['IA APLICADA','Gemini · RAG · LangChain · ChromaDB'],
      ['DADOS & AUTOMAÇÃO','Python · Pandas · SQL · Excel VBA · Playwright'],
      ['WEB','TypeScript · React · Next.js · Vue · Nuxt'],
      ['PRODUTOS','Supabase · PostgreSQL · Flutter · Git']
    ].map(([name,tools])=>`<div class="skill-box"><h4>${name}</h4><p>${tools}</p></div>`).join('')+'</div>';
  } else if (t.type === 'demo') {
    const items = ['Independent designer','Digital experiences','Creative experiments'];
    html += '<ul class="timeline">'+items.map((name,i)=>`<li class="${i===selected?'selected':''}"><button class="entry-button" data-entry="${i}" aria-expanded="${i===selected}"><strong>${name}</strong><span>Interactive prototype · 2026</span></button>${i===selected?'<div class="entry-detail"><p>A playful space for work, ideas and creative exploration.</p><div class="entry-tags"><span>DESIGN</span><span>INTERACTION</span><span>PROTOTYPE</span></div></div>':''}</li>`).join('')+'</ul>';
  } else {
    html += '<ul class="timeline">'+t.keys.map((key,i) => {
      const c=cases[key];
      return `<li class="${selected===i?'selected':''}"><button class="entry-button" data-entry="${i}" aria-expanded="${selected===i}"><strong>${escape(c.name)}</strong><span>${escape(c.category)}</span></button>${selected===i?`<div class="entry-detail"><p>${escape(c.intro)}</p><div class="entry-tags">${c.stack.split(' · ').map(s=>`<span>${escape(s)}</span>`).join('')}</div><button class="read-case" data-case="${key}">ABRIR CASE ↗</button></div>`:''}</li>`;
    }).join('')+'</ul>';
  }
  panel.innerHTML=html;
}
function changeTab(value,focus=false) {
  tab=(value+tabs.length)%tabs.length; selected=0;
  renderTabs(); $('.panel').scrollTop=0;
  if(focus) $(`[data-tab="${tab}"]`).focus();
}
function selectEntry(value,focus=false) {
  const count=tabs[tab].keys?.length ?? (tabs[tab].type==='demo'?3:0);
  if(!count) return;
  selected=(value+count)%count; renderPanel();
  const entry=$(`[data-entry="${selected}"]`);
  const panel=$('.panel');
  if(entry){const rect=entry.getBoundingClientRect(),bounds=panel.getBoundingClientRect();if(rect.top<bounds.top||rect.bottom>bounds.bottom)panel.scrollTop+=rect.top-bounds.top-8;}
  if(focus) entry?.focus({preventScroll:true});
}
function openPortfolio() {
  if(opened) return;
  opened=true; $('.resume-overlay').hidden=false; $('.screen').classList.add('is-open');
  $('.credit b').textContent=String(++credits).padStart(2,'0');
  $(`[data-tab="${tab}"]`).focus({preventScroll:true});
}
function closePortfolio() {
  opened=false; $('.resume-overlay').hidden=true; $('.screen').classList.remove('is-open'); $('.start').focus({preventScroll:true});
}
function openCase(key) {
  const c=cases[key]; if(!c)return;
  $('.case-body').innerHTML=`<p class="case-label">${escape(c.category)}</p><h2 id="case-title">${escape(c.name)}</h2><p>${escape(c.status)}</p><p>${escape(c.intro)}</p>`+[
    ['O problema',c.problem],['O que construímos',c.solution],['Evidências',c.evidence],['Estado atual',c.next],['Ferramentas',c.stack]
  ].map(([heading,text])=>`<h3>${heading}</h3><p>${escape(text)}</p>`).join('')+(c.url?`<a href="${escape(c.url)}" target="_blank" rel="noopener noreferrer">${escape(c.linkLabel||'Ver repositório')} ↗</a>`:'');
  $('.case-dialog').showModal();
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-open]'))openPortfolio();
  if(e.target.closest('.close-window'))closePortfolio();
  if(e.target.closest('.close-case'))$('.case-dialog').close();
  const t=e.target.closest('[data-tab]'); if(t)changeTab(Number(t.dataset.tab),true);
  const entry=e.target.closest('[data-entry]');if(entry)selectEntry(Number(entry.dataset.entry),true);
  const c=e.target.closest('[data-case]');if(c)openCase(c.dataset.case);
  if(e.target.closest('[data-next]'))changeTab(1,true);
});
$('.skip').addEventListener('click',e=>{e.preventDefault();openPortfolio();});
$('.signature').addEventListener('click',e=>{e.preventDefault();closePortfolio();});
function pull(stick) {stick.classList.remove('pressed'); void stick.offsetWidth; stick.classList.add('pressed');setTimeout(()=>stick.classList.remove('pressed'),240);}
$('.left-stick').addEventListener('click',()=>{pull($('.left-stick'));if(!opened)openPortfolio();else changeTab(tab+1);});
$('.right-stick').addEventListener('click',()=>{pull($('.right-stick'));if(!opened)openPortfolio();else selectEntry(selected+1);});
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||$('.case-dialog').open)return;
  if(e.key==='Escape'&&opened){e.preventDefault();closePortfolio();return;}
  if(e.key==='Enter'&&!opened&&e.target===document.body){e.preventDefault();openPortfolio();return;}
  if(!opened)return;
  if(['ArrowLeft','ArrowRight','a','d'].includes(e.key)){e.preventDefault();pull($('.left-stick'));changeTab(tab+(['ArrowLeft','a'].includes(e.key)?-1:1),true);}
  if(['ArrowUp','ArrowDown','w','s'].includes(e.key)){e.preventDefault();pull($('.right-stick'));selectEntry(selected+(['ArrowUp','w'].includes(e.key)?-1:1),true);}
  if(/^[1-4]$/.test(e.key)){e.preventDefault();changeTab(Number(e.key)-1,true);}
});
let theme;try{theme=localStorage.getItem('vh-cabinet-theme')||'dark';}catch{theme='dark';}
function updateTheme(){document.documentElement.dataset.theme=theme;$('.theme-toggle').setAttribute('aria-label',`Ativar tema ${theme==='dark'?'claro':'escuro'}`);$('.theme-toggle img').src=`./icons-3d/${theme==='dark'?'sun':'moon'}.png`;}
updateTheme();
$('.theme-toggle').addEventListener('click',()=>{
  const btn=$('.theme-toggle'); btn.classList.remove('turn');void btn.offsetWidth;btn.classList.add('turn');
  theme=theme==='dark'?'light':'dark';try{localStorage.setItem('vh-cabinet-theme',theme);}catch{}
  setTimeout(updateTheme,motion?260:0);
});
function setMotion(){document.body.classList.toggle('paused',!motion);$('.motion-toggle').textContent=motion?'Ⅱ':'▷';$('.motion-toggle').setAttribute('aria-label',motion?'Pausar movimento':'Ativar movimento');}
$('.motion-toggle').addEventListener('click',()=>{motion=!motion;setMotion();});
reduced.addEventListener('change',()=>{motion=!reduced.matches;setMotion();});setMotion();
renderTabs();

// Original 5×7 bitmap alphabet; every title letter has its own damped spring.
const glyphs={
 A:['01110','11011','11011','11111','11011','11011','11011'],B:['11110','11011','11011','11110','11011','11011','11110'],C:['01111','11000','11000','11000','11000','11000','01111'],D:['11110','11011','11011','11011','11011','11011','11110'],E:['11111','11000','11000','11110','11000','11000','11111'],F:['11111','11000','11000','11110','11000','11000','11000'],G:['01111','11000','11000','11011','11011','11011','01110'],H:['11011','11011','11011','11111','11011','11011','11011'],I:['11111','00100','00100','00100','00100','00100','11111'],J:['00111','00011','00011','00011','11011','11011','01110'],K:['11011','11011','11110','11100','11110','11011','11011'],L:['11000','11000','11000','11000','11000','11000','11111'],M:['10001','11011','11111','10101','10001','10001','10001'],N:['11001','11101','11101','11011','11011','11011','11001'],O:['01110','11011','11011','11011','11011','11011','01110'],P:['11110','11011','11011','11110','11000','11000','11000'],Q:['01110','11011','11011','11011','11011','11110','00111'],R:['11110','11011','11011','11110','11100','11010','11011'],S:['01111','11000','11000','01110','00011','00011','11110'],T:['11111','00100','00100','00100','00100','00100','00100'],U:['11011','11011','11011','11011','11011','11011','01110'],V:['11011','11011','11011','11011','11011','01010','00100'],W:['10001','10001','10001','10101','11111','11011','10001'],X:['11011','11011','01110','00100','01110','11011','11011'],Y:['11011','11011','11011','01110','00100','00100','00100'],Z:['11111','00011','00110','00100','01100','11000','11111'],
 '0':['01110','11011','11011','11011','11011','11011','01110'],'2':['01110','11011','00011','00110','01100','11000','11111'],'6':['01110','11000','11000','11110','11011','11011','01110'],'&':['01100','11010','11010','01100','11011','11010','01101'],' ':['00000','00000','00000','00000','00000','00000','00000']
};
const palette={cream:'#f3ebcf',paper:'#f9f3df',plum:'#574349',peach:'#e2a77c',rust:'#c7766a',gold:'#ecca8c',sage:'#a8c7a2',teal:'#5e7f82'};
const canvas=$('.title-canvas'),ctx=canvas.getContext('2d'),land=$('.landscape'),lc=land.getContext('2d');
let width=1,height=1,dpr=1,clock=0,last=0,letters=[];
let frameId=0,playedIntro=false;
const pointer={x:-9999,y:-9999,active:false};
function resize(){
  const r=$('.screen').getBoundingClientRect();width=$('.screen').clientWidth;height=$('.screen').clientHeight;dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  land.width=Math.round(width/4);land.height=Math.round(height/4);
  const unit=Math.min(width/58,height/37), word='PORTFOLIO',total=(word.length*6-1)*unit;
  letters=[...word].map((char,i)=>({char,x:(width-total)/2+i*6*unit,y:height*.32,unit,dy:0,v:0,angle:0,hot:false}));
  landscape();drawTitle(0);
}
new ResizeObserver(resize).observe($('.screen'));
$('.screen').addEventListener('pointermove',e=>{const r=$('.screen').getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true;});
$('.screen').addEventListener('pointerleave',()=>{pointer.active=false;});
$('.screen').addEventListener('pointerdown',()=>{if(motion&&!opened)for(const l of letters)if(Math.abs(pointer.x-l.x)<l.unit*6)l.v-=l.unit*15;});
function bitmap(char,x,y,unit,color){const rows=glyphs[char]||glyphs[' '];ctx.fillStyle=color;rows.forEach((row,j)=>[...row].forEach((on,i)=>{if(on==='1')ctx.fillRect(Math.round(x+i*unit),Math.round(y+j*unit),Math.ceil(unit),Math.ceil(unit));}));}
function textBitmap(text,y,unit,color){const total=(text.length*6-1)*unit;[...text].forEach((c,i)=>bitmap(c,(width-total)/2+i*6*unit,y,unit,color));}
function drawTitle(dt){
  ctx.clearRect(0,0,width,height);
  textBitmap('2026',height*.18,Math.max(2,Math.round(width/450)),palette.plum);
  for(const [i,l]of letters.entries()){
    const hover=pointer.active&&!opened&&Math.hypot(pointer.x-(l.x+2.5*l.unit),pointer.y-(l.y+3.5*l.unit))<l.unit*7;
    const target=motion?Math.sin(clock*2.1-i*.55)*l.unit*1.2:0;
    if(hover&&!l.hot&&motion)l.v-=l.unit*48;
    l.hot=hover;
    if(dt){l.v+=((target-l.dy)*190-l.v*11)*dt;l.dy+=l.v*dt;}
    ctx.save();ctx.translate(l.x+2.5*l.unit,l.y+l.dy+3.5*l.unit);ctx.rotate(l.angle);ctx.translate(-2.5*l.unit,-3.5*l.unit);
    // A stepped outline, shadow and striped fill keep the title visibly raster-built.
    const u=l.unit;
    bitmap(l.char,u*.2,u*.4,u,palette.plum);
    for(const [dx,dy]of [[-.12,0],[.12,0],[0,-.12],[0,.12]])bitmap(l.char,dx*u,dy*u,u,palette.plum);
    const rows=glyphs[l.char];rows.forEach((row,j)=>[...row].forEach((on,k)=>{if(on==='1'){ctx.fillStyle=j<2?palette.peach:j<4?palette.rust:palette.gold;ctx.fillRect(Math.round(k*u),Math.round(j*u),Math.ceil(u),Math.ceil(u));if(j>4&&(j+k)%2===0){ctx.fillStyle=palette.peach;ctx.fillRect(k*u,j*u,u/2,u/2);}}}));
    ctx.restore();
  }
  textBitmap(replica?'PRODUCT DESIGN':'AUTOMACAO & IA',height*.58,Math.max(2,Math.min(width/190,height/120)),palette.plum);
}
function cloud(x,y,scale){lc.fillStyle=palette.paper;[[0,4,28,5],[5,1,17,5],[9,-2,8,4]].forEach(([a,b,w,h])=>lc.fillRect(Math.round(x+a*scale),Math.round(y+b*scale),w*scale,h*scale));}
function hill(x,y,w,h,color,seed){
  lc.fillStyle=color;lc.beginPath();lc.moveTo(x,y+h);for(let i=0;i<=w;i+=2){const p=i/w;lc.lineTo(x+i,Math.floor(y+h-h*Math.sin(p*Math.PI)**.6+Math.sin(i*.13+seed)*2));}lc.lineTo(x+w,y+h+10);lc.lineTo(x,y+h+10);lc.closePath();lc.fill();
  // Sparse deterministic pixels, rather than random noise each frame.
  lc.fillStyle=palette.cream;for(let i=0;i<Math.floor(w*3);i++){const px=(i*37+seed*13)%w,py=(i*19+seed*7)%(h+8);if(py>h-h*Math.sin(px/w*Math.PI)**.6&&((i+seed)%3===0))lc.fillRect(Math.floor(x+px),Math.floor(y+py),1,1);}
}
function landscape(){
  const w=land.width,h=land.height;lc.fillStyle=palette.cream;lc.fillRect(0,0,w,h);
  const drift=motion?Math.sin(clock*.07)*4:0;
  cloud(w*.08+drift,h*.2,.8);cloud(w*.72+drift,h*.13,1);cloud(w*.48-drift,h*.79,.55);
  hill(-w*.07,h*.74,w*.38,h*.21,palette.sage,8);hill(w*.72,h*.70,w*.37,h*.23,palette.sage,11);
  hill(-w*.02,h*.84,w*.28,h*.17,palette.teal,5);hill(w*.81,h*.83,w*.23,h*.19,palette.teal,2);
  // Small floating pixel islets echo the larger foreground silhouettes.
  hill(w*.06,h*.5,w*.09,h*.035,palette.sage,3);hill(w*.84,h*.4,w*.09,h*.035,palette.sage,5);
  lc.fillStyle=palette.peach;lc.fillRect(w*.075,h*.54,w*.06,2);lc.fillRect(w*.855,h*.44,w*.06,2);
}
function schedule(){if(!frameId&&motion&&!document.hidden)frameId=requestAnimationFrame(frame);}
function frame(time){frameId=0;const dt=Math.min((time-last)/1000||.016,.025);last=time;
  if(motion&&!document.hidden){if(!playedIntro){playedIntro=true;for(const [i,l]of letters.entries()){l.dy=-height-i*35;l.v=0;}}clock+=dt;landscape();drawTitle(dt);schedule();}
}
document.addEventListener('visibilitychange',()=>{last=performance.now();schedule();});
$('.motion-toggle').addEventListener('click',()=>{if(!motion){for(const l of letters){l.dy=0;l.v=0;l.angle=0;}landscape();drawTitle(0);}schedule();});
reduced.addEventListener('change',schedule);
resize();schedule();
const portrait=$('.portrait canvas'),pc=portrait.getContext('2d');portrait.width=48;portrait.height=48;
if(!replica){const image=new Image();image.onload=()=>{pc.imageSmoothingEnabled=false;pc.drawImage(image,0,0,48,48);};image.src='./victor-avatar-3d.png';}
else{pc.fillStyle=palette.peach;pc.fillRect(15,10,20,26);pc.fillStyle=palette.plum;pc.fillRect(13,7,23,10);pc.fillRect(20,21,2,2);pc.fillRect(29,21,2,2);pc.fillStyle=palette.teal;pc.fillRect(8,36,32,15);}
