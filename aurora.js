const $ = s => document.querySelector(s);
const mascotOptions = {
 lightbulb:{color:'#e5bd61',eyeColor:'#47341d'},
 controller:{color:'#b4a0d8',eyeColor:'#241a35'},
 book:{color:'#d69b73',eyeColor:'#42251d'},
 rocket:{color:'#e5bd61',eyeColor:'#47341d'}
};
const previewMascot = ['localhost','127.0.0.1'].includes(location.hostname) ? new URLSearchParams(location.search).get('mascote') : null;
const mascotId = Object.hasOwn(mascotOptions,previewMascot ?? '') ? previewMascot : 'lightbulb';
const mascotStyle = mascotOptions[mascotId];

// A mesma comemoração em qualquer página, disparada só após a API confirmar.
document.body.insertAdjacentHTML('beforeend', `<aside class="like-celebration" aria-label="Agradecimento pela curtida" hidden>
 <button type="button" class="celebration-close" aria-label="Fechar agradecimento">×</button>
 <span class="brand-bot celebration-bot" aria-hidden="true"><img src="/brand/victor-bot.svg" width="104" height="104" alt=""></span>
 <span class="celebration-message" role="status"><strong>Valeu pela curtida!</strong></span>
</aside><span class="like-confetti" aria-hidden="true" hidden>${Array.from({length:36},(_,i)=>`<i class="confetti-piece confetti-shape-${i%4}"></i>`).join('')}</span>`);
const celebration = $('.like-celebration');
const confetti = $('.like-confetti');
let celebrationTimer;
let partyAnimations = [];
let partyVariant = 0;
try { partyVariant = Number(sessionStorage.getItem('portfolio-party')) || 0; } catch {}
const partyMoves = [
 [
  {transform:'translateY(0) rotate(0) scale(1)',offset:0},
  {transform:'translateY(8px) rotate(-10deg) scale(1.16,.76)',offset:.08},
  {transform:'translateY(-85px) rotate(-25deg) scale(.96,1.08)',offset:.24},
  {transform:'translateY(-65px) rotate(335deg) scale(1.08)',offset:.46},
  {transform:'translateY(4px) rotate(360deg) scale(1.2,.8)',offset:.62},
  {transform:'translateY(-30px) rotate(380deg) scale(.96,1.08)',offset:.77},
  {transform:'translateY(0) rotate(360deg) scale(1)',offset:1}
 ],
 [
  {transform:'translate(0,0) rotate(0) scale(1)',offset:0},
  {transform:'translate(-30px,-25px) rotate(-24deg) scale(1.1)',offset:.16},
  {transform:'translate(28px,-52px) rotate(24deg) scale(.95,1.12)',offset:.34},
  {transform:'translate(-26px,-25px) rotate(-22deg) scale(1.08)',offset:.5},
  {transform:'translate(24px,-60px) rotate(22deg) scale(.94,1.12)',offset:.66},
  {transform:'translate(0,6px) rotate(0) scale(1.18,.8)',offset:.84},
  {transform:'translate(0,0) rotate(0) scale(1)',offset:1}
 ],
 [
  {transform:'perspective(500px) translateY(0) rotateY(0) scale(1)',offset:0},
  {transform:'perspective(500px) translateY(8px) rotateY(-20deg) scale(1.12,.8)',offset:.12},
  {transform:'perspective(500px) translateY(-78px) rotateY(180deg) scale(1.1)',offset:.4},
  {transform:'perspective(500px) translateY(-40px) rotateY(360deg) scale(1.06)',offset:.64},
  {transform:'perspective(500px) translateY(4px) rotateY(360deg) scale(1.18,.82)',offset:.8},
  {transform:'perspective(500px) translateY(0) rotateY(360deg) scale(1)',offset:1}
 ]
];
function closeCelebration() {
 clearTimeout(celebrationTimer);
 partyAnimations.forEach(animation => animation.cancel());
 partyAnimations = [];
 celebration.hidden = true;
 confetti.hidden = true;
}
function celebrateLike() {
 closeCelebration();
 celebration.hidden = false;
 confetti.hidden = false;
 const bot = $('.celebration-bot');
 // Uma sequência curta e exclusiva da curtida, solicitada inclusive neste sistema
 // com movimento reduzido. A animação ambiente do restante do site não muda.
 partyAnimations.push(celebration.animate([
  {opacity:0,transform:'translateY(32px) scale(.85)'},
  {opacity:1,transform:'translateY(-5px) scale(1.03)',offset:.75},
  {opacity:1,transform:'none'}
 ],{duration:450,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}));
 partyAnimations.push(bot.animate(partyMoves[partyVariant % partyMoves.length],{duration:2200,delay:180,easing:'cubic-bezier(.35,0,.25,1)',fill:'both'}));
 partyVariant++;
 try { sessionStorage.setItem('portfolio-party', partyVariant); } catch {}
 const box = bot.getBoundingClientRect();
 const x = box.left + box.width/2, y = box.top + box.height/2;
 confetti.querySelectorAll('i').forEach((piece,i) => {
  const seed = (i*97+31)%101/100;
  const vx = (i%2 ? 1 : -1)*(65+seed*Math.min(280,innerWidth*.55));
  const vy = -(145+((i*47)%120));
  piece.style.left = `${x}px`;
  piece.style.top = `${y}px`;
  piece.style.backgroundColor = ['#b69ad5','#e8c787','#eaa2ba','#f0e7ff'][i%4];
  const frames = Array.from({length:25},(_,j) => {
   const t=j/24;
   return {offset:t,opacity:t<.08?t/.08:t>.7?(1-t)/.3:1,transform:`translate(${vx*t}px,${vy*t+420*t*t}px) rotate(${(i%2?1:-1)*(240+seed*600)*t}deg) scale(${1-t*.3})`};
  });
  partyAnimations.push(piece.animate(frames,{duration:1900+seed*650,delay:350+(i%3)*280,easing:'linear',fill:'both'}));
 });
 celebrationTimer = setTimeout(closeCelebration, 5800);
}
document.addEventListener('portfolio:liked', celebrateLike);
$('.celebration-close').addEventListener('click', closeCelebration);
document.addEventListener('portfolio:unliked', closeCelebration);
document.addEventListener('pointerdown', event => {
 if (!celebration.hidden && !celebration.contains(event.target) && !event.target.closest?.('[data-like-button]')) closeCelebration();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCelebration(); });

// Mascote local: SVG estático antes do carregamento e renderer compartilhado sem CDN.
async function mountBrandBots() {
 const hosts = [...document.querySelectorAll('.brand-bot')];
 if (!hosts.length) return;
 try {
  const [{ mountAvatar }, response] = await Promise.all([
   import('/vendor/open-bot-avatar/dom/index.js'), fetch(`/brand/mascots/${mascotId}.json`)
  ]);
  if (!response.ok) return;
  const definition = await response.json();
  const followers = [];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // O renderer mantém a pose de repouso virada para a esquerda quando reduz
  // movimento. Compensá-la deixa os olhos percorrerem os dois lados da face.
  const restingView = () => reducedMotion.matches ? {yaw:.3, pitch:-.2} : undefined;
  hosts.forEach(host => {
   const fallback = host.querySelector('img');
   if (fallback) fallback.src = `/brand/mascots/${mascotId}.svg`;
   const avatar = mountAvatar(host, { definition, color:mascotStyle.color, eyeColor:mascotStyle.eyeColor, followPointer:false, depth:7, reducedMotion:'system', view:restingView(), label:'' });
   followers.push({host, avatar});
   const link = host.closest('a');
   const greetingMood = host.classList.contains('talk-bot') ? 'thinking' : 'happy';
   link?.addEventListener('pointerenter', () => avatar.update({mood:greetingMood}));
   link?.addEventListener('pointerleave', () => avatar.update({mood:'idle'}));
   link?.addEventListener('focus', () => avatar.update({mood:greetingMood}));
   link?.addEventListener('blur', () => avatar.update({mood:'idle'}));
   if (host.classList.contains('celebration-bot')) {
    document.addEventListener('portfolio:liked', () => avatar.update({mood:'happy', lookAt:{x:0,y:0}}));
   }
  });
  // O alcance acompanha o espaço de cada lado da marca. Um alcance fixo de
  // 160 px saturava à direita, deixando o olhar parado no restante da tela.
  window.addEventListener('pointermove', event => {
   if (event.pointerType === 'touch') return;
   followers.forEach(({host, avatar}) => {
    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.bottom < 0 || rect.top > innerHeight || host.classList.contains('celebration-bot')) return;
    const x = rect.left + rect.width * definition.eyes.x / 100;
    const y = rect.top + rect.height * definition.eyes.y / 100;
    const dx = event.clientX - x, dy = event.clientY - y;
    const reachX = Math.max(120, (dx < 0 ? x : innerWidth - x) * .55);
    const reachY = Math.max(120, (dy < 0 ? y : innerHeight - y) * .55);
    const gaze = {x:Math.tanh(dx / reachX), y:Math.tanh(dy / reachY)};
    const length = Math.hypot(gaze.x, gaze.y);
    if (length > 1) { gaze.x /= length; gaze.y /= length; }
    avatar.update({lookAt:gaze});
   });
  }, {passive:true});
  const resetGaze = () => followers.forEach(({avatar}) => avatar.update({lookAt:null}));
  reducedMotion.addEventListener('change', () => followers.forEach(({avatar}) => avatar.update({view:restingView()})));
  window.addEventListener('pointerout', event => { if (!event.relatedTarget) resetGaze(); });
  window.addEventListener('blur', resetGaze);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetGaze(); });
 } catch { /* A assinatura em SVG continua disponível se o renderer não carregar. */ }
}
mountBrandBots();

// O título reserva o tamanho da maior frase; leitores de tela recebem a lista completa.
const typedRole = $('#typed-role');
if (typedRole) {
 const roles = ['Desenvolvedor de Automação', 'AI Builder', 'Analista de Dados', 'Atuário'];
 let roleIndex = 0, length = Array.from(roles[0]).length, deleting = true, timer;
 function scheduleTyping(delay) {
  clearTimeout(timer);
  if (!document.hidden) timer = setTimeout(typeRole, delay);
 }
 function typeRole() {
  const letters = Array.from(roles[roleIndex]);
  length += deleting ? -1 : 1;
  typedRole.textContent = letters.slice(0, length).join('');
  if (deleting && length === 0) {
   roleIndex = (roleIndex + 1) % roles.length;
   deleting = false;
   scheduleTyping(300);
  } else if (!deleting && length === letters.length) {
   deleting = true;
   scheduleTyping(2200);
  } else scheduleTyping(deleting ? 45 : 85);
 }
 function syncTyping() {
  scheduleTyping(900);
 }
 document.addEventListener('visibilitychange', syncTyping);
 syncTyping();
}

const themeButton=$('.theme-toggle'),themeMenu=$('.theme-menu'),themeItems=[...document.querySelectorAll('[data-theme-choice]')];
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
let themeChoice='system';
try{const saved=localStorage.getItem('victor-aurora-theme');if(['light','dark','system'].includes(saved))themeChoice=saved;}catch{}
function applyTheme(){
 const effective=themeChoice==='system'?(systemTheme.matches?'dark':'light'):themeChoice;
 document.documentElement.dataset.theme=effective;
 document.documentElement.dataset.themeChoice=themeChoice;
 const labels={light:'Claro',dark:'Escuro',system:'Sistema'};
 themeButton.setAttribute('aria-label','Tema: '+labels[themeChoice]+'. Alterar tema');
 themeItems.forEach(item=>item.setAttribute('aria-checked',String(item.dataset.themeChoice===themeChoice)));
 $('meta[name="theme-color"]').content=effective==='dark'?'#100e13':'#f8f6fa';
}
function closeTheme(focus=false){themeMenu.hidden=true;themeButton.setAttribute('aria-expanded','false');if(focus)themeButton.focus();}
function openTheme(){themeMenu.hidden=false;themeButton.setAttribute('aria-expanded','true');themeItems.find(item=>item.dataset.themeChoice===themeChoice).focus();}
applyTheme();systemTheme.addEventListener('change',()=>{if(themeChoice==='system')applyTheme();});
themeButton.addEventListener('click',()=>{if(themeMenu.hidden)openTheme();else closeTheme();});
themeButton.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();openTheme();}});
themeItems.forEach(item=>item.addEventListener('click',()=>{themeChoice=item.dataset.themeChoice;try{localStorage.setItem('victor-aurora-theme',themeChoice);}catch{}applyTheme();closeTheme(true);}));
themeMenu.addEventListener('keydown',e=>{const index=themeItems.indexOf(document.activeElement);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();themeItems[(index+(e.key==='ArrowDown'?1:-1)+themeItems.length)%themeItems.length].focus();}if(e.key==='Home'){e.preventDefault();themeItems[0].focus();}if(e.key==='End'){e.preventDefault();themeItems.at(-1).focus();}if(e.key==='Escape'){e.preventDefault();closeTheme(true);}if(e.key==='Tab')closeTheme();});
document.addEventListener('click',e=>{if(!e.target.closest('.theme-control'))closeTheme();});
const menuButton=$('.menu-toggle');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');$('.mobile-nav').hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));$('.mobile-nav').hidden=!open;});
$('.mobile-nav').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
const sections=[...document.querySelectorAll('main section[id]')];
if('IntersectionObserver' in window){
 const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&document.body.dataset.page!=='projects')document.querySelectorAll('.desktop-nav a').forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-10% 0px -65% 0px'});sections.forEach(section=>navObserver.observe(section));
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.capability-card,.contact-panel').forEach(el=>observer.observe(el));}
}
