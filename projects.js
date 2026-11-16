import { projectDetails as cases } from './project-details.js?v=gallery-1';

const $ = s => document.querySelector(s);
const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = id => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const projects = [
 {id:'papaia',category:'product',label:'Produto · nutrição',brand:'papaia',subtitle:'CUIDADO ENTRE CONSULTAS',desc:'Acompanhamento nutricional materno-infantil, conectando profissionais e famílias entre consultas.',tags:['Vue','TypeScript','PostgreSQL'],destination:'site',site:null,thumbnail:'/projects/papaia-logo-creme.png',thumbnailAlt:'Logo do Papaia em estilo de massinha'},
 {id:'vinky',category:'product',label:'Produto · fidelização',brand:'vinky',subtitle:'CADA VISITA CONTA',desc:'Fidelidade e recompensas em um app com jornadas para clientes, equipes e lojistas.',tags:['Flutter','Dart','Em desenvolvimento'],destination:'site',site:null,thumbnail:'/projects/vinky-cover.svg',thumbnailAlt:'Vinky: marca e mascote em uma composi??o proporcional'},
 {id:'talentos',category:'product',label:'Produto · recrutamento',brand:'talentos',subtitle:'COLÉGIO PARAQUETT',desc:'Banco de talentos com cadastro em etapas e envio de currículo para futuras oportunidades na escola.',tags:['Nuxt','Vue','Site disponível'],thumbnail:'/projects/talentos-cover.svg',thumbnailAlt:'Talentos Colégio Paraquett com a logo sorridente da instituição'},
 {id:'oferta',category:'product',label:'Produto · resseguros',brand:'oferta re',subtitle:'DA PIPELINE AO PRODUTO',desc:'Uma pipeline SUSEP que evoluiu para organizar propostas, renovações e ofertas de resseguro.',tags:['Next.js','Python','Playwright'],destination:'site',site:null,thumbnail:'/projects/oferta-re-cover.svg',thumbnailAlt:'Oferta Re: nome e mascote original sobre fundo azul-marinho'},
 {id:'insurminds',category:'ia',label:'IA aplicada · documentos',brand:'insurminds.',subtitle:'DOCUMENTOS → EVIDÊNCIAS',desc:'Leitura de apólices D&O com IA, extração de 16 critérios e comparação com citações de origem.',tags:['React','Python','IA'],thumbnail:'/projects/insurminds-cover.svg',thumbnailAlt:'InsurMinds com símbolo de escudo e verificação sobre fundo verde'},
 {id:'clima',category:'ia',label:'IA aplicada · riscos climáticos',brand:'Clima Seguro',subtitle:'PREVENÇÃO EM CADA PREVISÃO',desc:'Análise de riscos climáticos por cobertura e geração de alertas preventivos com IA.',tags:['Python','Streamlit','Open-Meteo'],thumbnail:'/projects/clima-seguro-cover.svg',thumbnailAlt:'Clima Seguro: nuvem e escudo sobre fundo verde-escuro'},
];

function projectPreview(p) {
 if(p.thumbnail) return `<div class="project-preview project-image-preview image-${p.id}"><img class="project-thumbnail" src="${p.thumbnail}" alt="${escape(p.thumbnailAlt)}" loading="lazy" width="${p.id==='papaia'?1457:1200}" height="${p.id==='papaia'?484:700}"></div>`;
 return `<div class="project-preview cover-${p.id}" aria-hidden="true"><div class="browser-dots"><i></i><i></i><i></i></div><strong class="cover-brand">${p.brand}</strong><span class="cover-tagline">${p.subtitle}</span><div class="cover-art"><span class="sheet"></span><span class="sheet"></span><span class="cover-check">✓</span></div><span class="cover-label">CAPA ILUSTRATIVA</span></div>`;
}
$('#project-list').innerHTML=projects.map(p=>{
 const c=cases[p.id],isSite=p.destination==='site'||p.id==='talentos',url=p.destination==='site'?p.site:c.url;
 const destination=url?`<a class="repo-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${isSite?'Visitar site':'Repositório'} ${icon(isSite?'external':'github')}</a>`:'<button class="repo-link site-pending" type="button" disabled aria-label="Site será adicionado em breve">Site em breve</button>';
 return `<article class="project-card project-cover-card" data-category="${p.category}">${projectPreview(p)}<div class="project-copy"><h3><button class="project-open" type="button" data-case="${p.id}" aria-label="Conhecer ${escape(c.name)}">${escape(c.name)} ${icon('case')}</button></h3><div class="project-reveal"><p class="project-description">${p.desc}</p><div class="tags">${p.tags.map(tag=>`<span>${tag}</span>`).join('')}</div><div class="project-actions">${destination}</div></div></div></article>`;
}).join('');
const revealObserver = new ResizeObserver(entries => {
 entries.forEach(({target}) => target.closest('.project-card').style.setProperty('--reveal-height', target.getBoundingClientRect().height + 'px'));
});
document.querySelectorAll('.project-reveal').forEach(el => revealObserver.observe(el));
let selectedCategory = 'all';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
const cards = [...document.querySelectorAll('.project-card')];
const searchable = cards.map((card, index) => normalize(projects[index].label + ' ' + card.textContent));
function filterProjects() {
 const terms = normalize($('#project-search').value.trim()).split(/\s+/).filter(Boolean);
 let count = 0;
 cards.forEach((card, index) => {
  card.hidden = (selectedCategory !== 'all' && card.dataset.category !== selectedCategory) || !terms.every(term => searchable[index].includes(term));
  if (!card.hidden) count++;
 });
 document.querySelectorAll('[data-filter]').forEach(button => {
  const selected = button.dataset.filter === selectedCategory;
  button.classList.toggle('selected', selected);
  button.setAttribute('aria-pressed', String(selected));
 });
 $('#filter-status').textContent = `${count} ${count === 1 ? 'projeto exibido' : 'projetos exibidos'}.`;
 $('#projects-empty').hidden = count > 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 selectedCategory = button.dataset.filter;
 filterProjects();
}));
$('#project-search').addEventListener('input', filterProjects);
$('#clear-project-filters').addEventListener('click', () => {
 selectedCategory = 'all';
 $('#project-search').value = '';
 filterProjects();
 $('#project-search').focus();
});

let preferredColumns = 3;
try {
 const stored = Number(localStorage.getItem('portfolio-project-columns'));
 if ([2, 3, 4, 5].includes(stored)) preferredColumns = stored;
} catch {}
function updateColumns() {
 const max = innerWidth >= 1400 ? 5 : innerWidth >= 1150 ? 4 : innerWidth >= 900 ? 3 : innerWidth >= 600 ? 2 : 1;
 const effective = Math.min(preferredColumns, max);
 $('#project-list').style.setProperty('--project-columns', effective);
 $('#project-list').dataset.density = effective;
 document.querySelectorAll('[data-columns]').forEach(button => {
  button.disabled = Number(button.dataset.columns) > max;
  button.setAttribute('aria-pressed', String(Number(button.dataset.columns) === effective));
 });
}
document.querySelectorAll('[data-columns]').forEach(button => button.addEventListener('click', () => {
 preferredColumns = Number(button.dataset.columns);
 try { localStorage.setItem('portfolio-project-columns', preferredColumns); } catch {}
 updateColumns();
}));
window.addEventListener('resize', updateColumns);
updateColumns();
const dialog = $('.case-dialog');
let activeProject;
let activeSlide = 0;
const chevron = direction => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${direction === 'left' ? 'm14 7-5 5 5 5' : 'm10 7 5 5-5 5'}"/></svg>`;

function showSlide(index) {
 const images = activeProject.images;
 if (!images.length) return;
 activeSlide = (index + images.length) % images.length;
 const photo = images[activeSlide];
 const img = $('.gallery-image');
 img.src = photo.src;
 img.alt = `${activeProject.name}: ${photo.caption}`;
 img.classList.toggle('portrait', !!photo.portrait);
 $('.gallery-stage').scrollTop = 0;
 $('.gallery-caption').textContent = photo.caption;
 $('.gallery-count').textContent = `${activeSlide + 1} / ${images.length}`;
 $('.gallery-enlarge').href = photo.src;
 dialog.querySelectorAll('[data-slide]').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === activeSlide)));
}

function openProject(id) {
 const c = cases[id];
 activeProject = c;
 activeSlide = 0;
 const destination = c.url
  ? `<a class="button button-primary" href="${escape(c.url)}" target="_blank" rel="noopener noreferrer">${icon(c.linkLabel === 'Visitar site' ? 'external' : 'github')}${escape(c.linkLabel)}</a>`
  : '<button class="repo-link site-pending" disabled>Site em breve</button>';
 $('.case-body').innerHTML = `<div class="project-detail-layout">
  <section class="project-gallery" aria-label="Telas de ${escape(c.name)}" aria-roledescription="carrossel">
   <div class="gallery-stage" tabindex="0" aria-label="Imagem do projeto; role para ver telas longas"><img class="gallery-image" src="${escape(c.images[0]?.src || projects.find(p=>p.id===id).thumbnail)}" alt="${escape(c.name)}"></div>
   ${c.images.length ? `<div class="gallery-controls"><button type="button" class="gallery-prev" aria-label="Imagem anterior">${chevron('left')}</button><div class="gallery-dots">${c.images.map((photo,i)=>`<button type="button" data-slide="${i}" aria-label="Imagem ${i+1}: ${escape(photo.caption)}" aria-pressed="${i===0}"><span></span></button>`).join('')}</div><button type="button" class="gallery-next" aria-label="Próxima imagem">${chevron('right')}</button></div><div class="gallery-meta"><p class="gallery-caption" aria-live="polite"></p><span class="gallery-count"></span><a class="gallery-enlarge" href="${escape(c.images[0].src)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir imagem em tamanho original">${icon('external')}</a></div>` : '<p class="gallery-caption">Imagens do produto em breve.</p>'}
   <p class="gallery-note">${escape(c.note)}</p>
  </section>
  <section class="project-summary"><header><h2 id="case-title">${escape(c.name)}</h2><p class="project-subtitle">${escape(c.subtitle)}</p></header><div class="project-overview"><h3>Sobre o projeto</h3>${c.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}</div><div class="project-technologies"><h3>Tecnologias</h3><div class="tags">${c.technologies.map(t=>`<span>${escape(t)}</span>`).join('')}</div></div><div class="project-detail-actions">${destination}</div></section>
 </div>`;
 if(c.images.length) showSlide(0);
 dialog.showModal();
 dialog.scrollTop = 0;
}

document.addEventListener('click', e => {
 const trigger = e.target.closest('[data-case]');
 if(trigger) {
  openProject(trigger.dataset.case);
  return;
 }
 const card = e.target.closest('.project-card');
 if(!card || e.target.closest('a,button,input,textarea,select') || window.getSelection()?.toString()) return;
 const cardTrigger = card.querySelector('[data-case]');
 cardTrigger.focus({preventScroll:true});
 openProject(cardTrigger.dataset.case);
});
dialog.addEventListener('click', e => {
 const dot = e.target.closest('[data-slide]');
 if(dot) showSlide(Number(dot.dataset.slide));
 if(e.target.closest('.gallery-prev')) showSlide(activeSlide - 1);
 if(e.target.closest('.gallery-next')) showSlide(activeSlide + 1);
 if(e.target === dialog) {
  const r = dialog.getBoundingClientRect();
  if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
 }
});
dialog.addEventListener('keydown', e => {
 if(e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
  e.preventDefault();
  showSlide(activeSlide + (e.key === 'ArrowRight' ? 1 : -1));
 }
});
$('.close-case').addEventListener('click', () => dialog.close());
