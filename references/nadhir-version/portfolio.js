const projects = [
 {id:'insurminds',name:'InsurMinds',word:'insur<span>minds.</span>',category:'ia',label:'DOCUMENTOS → EVIDÊNCIAS → COMPARAÇÃO',desc:'Extração de critérios de apólices D&O com Gemini, evidências de origem e comparação entre documentos.',tags:['Gemini','React','Python'],wide:true},
 {id:'oferta',name:'Oferta Re',word:'oferta<span>re</span>',category:'product',label:'DA PIPELINE AO PRODUTO',desc:'Uma pipeline SUSEP que evoluiu para organizar propostas, renovações e ofertas de resseguro.',tags:['Next.js','Supabase','Python']},
 {id:'papaia',name:'Papaia',word:'papaia<span>●</span>',category:'product',label:'CUIDADO ENTRE CONSULTAS',desc:'Acompanhamento nutricional conectando profissionais e famílias entre consultas.',tags:['Vue','TypeScript','Supabase']},
 {id:'vinky',name:'Vinky',word:'vinky<span>✦</span>',category:'product',label:'FIDELIZAÇÃO & RECOMPENSAS',desc:'Um app de fidelidade com jornadas para clientes, equipes e lojistas.',tags:['Flutter','Dart','Em desenvolvimento']},
 {id:'talentos',name:'Talentos Paraquett',word:'talentos<span>↗</span>',category:'product',label:'COLÉGIO PARAQUETT',desc:'Banco de talentos com cadastro em etapas para futuros profissionais da escola.',tags:['Nuxt','Vue','Site disponível']},
 {id:'devseg',name:'Agente DEVSEG',category:'ia',label:'RAG / BASE DE CONHECIMENTO',desc:'Um agente que busca em documentos de uma seguradora fictícia e responde com fontes.',tags:['LangChain','Gemini','ChromaDB']},
 {id:'autoquote',name:'InsurMinds AutoQuote',category:'ia',label:'CHATBOT / ATENDIMENTO',desc:'Atendimento conversacional sobre seguro auto e simulação acadêmica de cotação.',tags:['Python','Streamlit','LLM']}
];
const icon = id => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
document.querySelector('#project-list').innerHTML=projects.map(p=>`<article class="project-card ${p.wide?'project-wide':''}" data-category="${p.category}"><button class="project-open" data-case="${p.id}">${p.word?`<div class="project-cover ${p.id}-cover"><span class="cover-label">${p.label}</span><strong class="cover-word">${p.word}</strong>${p.id==='insurminds'?'<div class="document-art" aria-hidden="true"><div class="doc-back"></div><div class="doc-front"><span></span><span></span><span></span><span></span><div class="doc-check">✓</div></div></div><span class="cover-badge">Projeto I2A2 · em equipe</span>':'<div class="cover-shape" aria-hidden="true"></div>'}</div>`:`<div class="compact-art">${icon('code')}<span>${p.label}</span></div>`}<div class="project-copy"><div class="project-name"><h3>${p.name}</h3>${icon('arrow')}</div><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div></button></article>`).join('');
const themeButton=document.querySelector('.theme-toggle');
themeButton.innerHTML='<span class="theme-orbit" aria-hidden="true"><img class="theme-object theme-sun" src="./icons-3d/sun.png" width="48" height="48" alt=""><img class="theme-object theme-moon" src="./icons-3d/moon.png" width="48" height="48" alt=""><span class="theme-star theme-star-one"></span><span class="theme-star theme-star-two"></span></span>';
let theme='dark';try{theme=localStorage.getItem('victor-portfolio-theme')||'dark';}catch{}
function applyTheme(){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-label',theme==='dark'?'Ativar tema claro':'Ativar tema escuro');themeButton.setAttribute('aria-pressed',String(theme==='light'));document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#09090b':'#faf9fc';}
applyTheme();
let themeMotionTimer;
themeButton.addEventListener('click',()=>{
  theme=theme==='dark'?'light':'dark';
  applyTheme();
  clearTimeout(themeMotionTimer);
  themeButton.classList.remove('theme-switching');
  // Reinicia o movimento mesmo após cliques rápidos.
  void themeButton.offsetWidth;
  themeButton.classList.add('theme-switching');
  themeMotionTimer=setTimeout(()=>themeButton.classList.remove('theme-switching'),900);
  try{localStorage.setItem('victor-portfolio-theme',theme);}catch{}
});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.expertise,.project-card,.automation-panel,.contact-panel').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});}
const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('nav a').forEach(a=>{const active=a.hash===`#${e.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -60% 0px'});
document.querySelectorAll('#inicio,#sobre,#projetos,#contato').forEach(el=>navObserver.observe(el));
const avatar=document.querySelector('.hero-avatar'),avatarBox=document.querySelector('.avatar-orbit');
if(matchMedia('(pointer:fine)').matches){avatarBox.addEventListener('pointermove',e=>{if(reducedMotion.matches)return;const r=avatarBox.getBoundingClientRect();avatar.style.transform=`rotate(${(e.clientX-r.left-r.width/2)/16}deg) translateY(-2px)`;});avatarBox.addEventListener('pointerleave',()=>{avatar.style.transform='';});}
