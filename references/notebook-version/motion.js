// Interações do portfólio; movimento opcional e sem dependências.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const controls = document.createElement('div');
controls.className = 'view-controls';
controls.innerHTML = '<button class="motion-toggle" aria-label="Pausar animações" aria-pressed="false" title="Pausar animações">Ⅱ</button><button class="theme-toggle" aria-label="Ativar tema escuro" aria-pressed="false" title="Alternar tema">☾</button>';
header.querySelector('.header-flower')?.replaceWith(controls);
let paused = reduceMotion.matches;
try { const saved = localStorage.getItem('victor-motion'); if(saved) paused = saved === 'paused'; } catch {}
const pauseButton = controls.querySelector('.motion-toggle');
const themeButton = controls.querySelector('.theme-toggle');
let dark = false;
try { dark = localStorage.getItem('victor-theme') === 'dark'; } catch {}
function setTheme() {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  document.querySelector('meta[name="theme-color"]').content = dark ? '#172329' : '#f4f2eb';
}
setTheme();
themeButton.addEventListener('click', () => { dark = !dark; setTheme(); try { localStorage.setItem('victor-theme', dark ? 'dark' : 'light'); } catch {} });

const heading = document.querySelector('.intro h1');
const headingText = 'Oi, sou o Victor';
heading.setAttribute('aria-label', headingText);
heading.innerHTML = '<span class="morph-text" aria-hidden="true"></span>';
const morph = heading.firstElementChild;
morph.textContent = headingText;
const role = document.querySelector('.role-line');
const roles = ['Estudante de Atuária — UFF', 'Desenvolvedor de automações', 'Criador de produtos digitais', 'Curioso por IA aplicada'];
role.setAttribute('aria-label', roles.join('. '));
role.innerHTML = '<span aria-hidden="true">Sou </span><span class="typed-role" aria-hidden="true"></span><span class="type-cursor" aria-hidden="true">|</span>';
const typedRole = role.querySelector('.typed-role');
const drawing = document.querySelector('.hero-doodle pre');
const drawingText = drawing.textContent;
// A altura fica reservada enquanto os caracteres aparecem.
drawing.style.minHeight = `${drawingText.split('\n').length * 1.6}em`;
let titleProgress = 0, asciiProgress = 0, roleIndex = 0, charIndex = 0, deleting = false;
let timer = 0, titleTimer = 0, asciiTimer = 0;
const glyphs = '#<>/{}[]+*01';
function animateTitle() {
  if (paused || document.hidden) return;
  titleProgress += .45;
  morph.textContent = Array.from(headingText, (c,i) => c === ' ' || i < titleProgress ? c : glyphs[(Math.random()*glyphs.length)|0]).join('');
  if(titleProgress < headingText.length) titleTimer = setTimeout(animateTitle, 45);
  else morph.textContent = headingText;
}
function animateDrawing() {
  if(paused || document.hidden) return;
  asciiProgress = Math.min(drawingText.length, asciiProgress + 4);
  drawing.textContent = drawingText.slice(0, asciiProgress);
  if(asciiProgress < drawingText.length) asciiTimer = setTimeout(animateDrawing, 18);
}
function typeRole() {
  if(paused || document.hidden) return;
  const text = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typedRole.textContent = text.slice(0,charIndex);
  let delay = deleting ? 45 : 85;
  if(!deleting && charIndex >= text.length) { deleting = true; delay = 2000; }
  else if(deleting && charIndex <= 0) { deleting = false; roleIndex = (roleIndex+1)%roles.length; delay = 350; }
  timer = setTimeout(typeRole,delay);
}
function clearTimers(){clearTimeout(timer);clearTimeout(titleTimer);clearTimeout(asciiTimer);}
function syncMotion() {
  clearTimers();
  document.documentElement.classList.toggle('motion-paused', paused);
  document.documentElement.classList.toggle('motion-enabled', !paused);
  pauseButton.textContent = paused ? '▷' : 'Ⅱ';
  pauseButton.setAttribute('aria-pressed', String(paused));
  pauseButton.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
  pauseButton.title = paused ? 'Retomar animações' : 'Pausar animações';
  if(paused) {
    titleProgress = headingText.length;
    asciiProgress = drawingText.length;
    morph.textContent = headingText;
    drawing.textContent = drawingText;
    typedRole.textContent = roles[roleIndex];
    charIndex = roles[roleIndex].length;
    deleting = true;
  }
  else if(!document.hidden) { animateTitle(); animateDrawing(); typeRole(); }
  updateScroll();
}
pauseButton.addEventListener('click',()=>{paused=!paused;try { localStorage.setItem('victor-motion',paused?'paused':'enabled'); } catch {}syncMotion();});
reduceMotion.addEventListener('change',()=>{paused=reduceMotion.matches;syncMotion();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimers();else syncMotion();});

const scrapbook = document.querySelector('.scrapbook');
const stickers = document.createElement('div');
stickers.className='orbit-stickers';stickers.setAttribute('aria-hidden','true');
const stickerLabels = ['{ }','PY','SQL','✦','UFF','⌘','AI','↗','01','☁','git','★'];
const vectors = [[-1,-.9],[1,-.8],[-1,.7],[1,.7],[-.8,-1],[.6,-1],[-1,.1],[1,.15],[-.65,1],[.65,1],[-.3,-1.2],[1,-.3]];
stickerLabels.forEach((label,i)=>{const s=document.createElement('span');s.className=`orbit-sticker sticker-${i%4}`;s.textContent=label;stickers.append(s);});
scrapbook.prepend(stickers);
let frame = 0;
function updateScroll() {
  frame=0;
  header.classList.toggle('scrolled',scrollY>20);
  const rect=scrapbook.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.9)));
  const small=innerWidth<600;
  Array.from(stickers.children).forEach((s,i)=>{
    const [x,y]=vectors[i];
    const p=paused?1:progress;
    const dx=x*(small?90:150)+(x*(small?80:380))*p;
    const dy=y*(small?160:95)+(y*(small?160:230))*p;
    s.style.transform=`translate(${dx}px,${dy}px) scale(${small?.6:.75 + .2*p}) rotate(${(i%2?1:-1)*(12+18*p)}deg)`;
  });
  const sections=[...document.querySelectorAll('main section[id], footer[id]')];
  const active=sections.filter(s=>s.getBoundingClientRect().top<180).at(-1);
  header.querySelectorAll('nav a').forEach(a=>{const selected=a.hash===`#${active?.id}`;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
}
function queueScroll(){if(!frame)frame=requestAnimationFrame(updateScroll);}
addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll);

// Entradas na rolagem, mantendo o conteúdo acessível sem JavaScript.
const reveals=document.querySelectorAll('.project-grid article,.ai-card,.automation-row,.timeline>div');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('entered');observer.unobserve(e.target);}}),{threshold:.12});
reveals.forEach((el,i)=>{el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',`${i%2*90}ms`);observer.observe(el);});

// Estrelas arrastáveis, como pequenos adesivos sobre o caderno.
document.querySelectorAll('.scrap-star').forEach(star=>{
  let origin=null, offset={x:0,y:0};
  star.addEventListener('pointerdown',event=>{if(event.button!==0)return;origin={x:event.clientX,y:event.clientY,ox:offset.x,oy:offset.y};star.setPointerCapture(event.pointerId);star.classList.add('dragging');});
  star.addEventListener('pointermove',event=>{if(!origin)return;offset={x:Math.max(-90,Math.min(90,origin.ox+event.clientX-origin.x)),y:Math.max(-100,Math.min(100,origin.oy+event.clientY-origin.y))};star.style.translate=`${offset.x}px ${offset.y}px`;});
  const end=()=>{origin=null;star.classList.remove('dragging');};star.addEventListener('pointerup',end);star.addEventListener('pointercancel',end);
});

const avatarDialog=document.createElement('dialog');
avatarDialog.className='avatar-dialog';avatarDialog.setAttribute('aria-labelledby','avatar-title');
avatarDialog.innerHTML='<button class="close-dialog" aria-label="Fechar imagem">✕</button><h2 id="avatar-title">Victor, em versão ilustrada.</h2><img src="./avatar.png" alt="Personagem ilustrado de Victor Hugo, em tamanho ampliado"><p>O personagem que me acompanha por aqui.</p>';
document.body.append(avatarDialog);
const photo=document.querySelector('.polaroid');
photo.setAttribute('role','button');photo.tabIndex=0;photo.setAttribute('aria-label','Ampliar meu personagem');
photo.addEventListener('click',()=>avatarDialog.showModal());
photo.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();avatarDialog.showModal();}});
avatarDialog.querySelector('button').addEventListener('click',()=>avatarDialog.close());
avatarDialog.addEventListener('click',e=>{if(e.target===avatarDialog){const r=avatarDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)avatarDialog.close();}});
syncMotion();
