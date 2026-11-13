import { cases } from './case-data.js';

const $ = s => document.querySelector(s);
const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = id => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const projects = [
 {id:'insurminds',category:'ia',label:'IA aplicada · documentos',brand:'insurminds.',subtitle:'DOCUMENTOS → EVIDÊNCIAS',desc:'Leitura de apólices D&O com Gemini, extração de 16 critérios e comparação com citações de origem.',tags:['Gemini','React','Python']},
 {id:'oferta',category:'product',label:'Produto · resseguros',brand:'oferta re',subtitle:'DA PIPELINE AO PRODUTO',desc:'Uma pipeline SUSEP que evoluiu para organizar propostas, renovações e ofertas de resseguro.',tags:['Next.js','Supabase','Python']},
 {id:'papaia',category:'product',label:'Produto · nutrição',brand:'papaia',subtitle:'CUIDADO ENTRE CONSULTAS',desc:'Acompanhamento nutricional materno-infantil, conectando profissionais e famílias entre consultas.',tags:['Vue','TypeScript','Supabase'],repo:'https://github.com/papaia-software/papaia-app'},
 {id:'vinky',category:'product',label:'Produto · fidelização',brand:'vinky',subtitle:'CADA VISITA CONTA',desc:'Fidelidade e recompensas em um app com jornadas para clientes, equipes e lojistas.',tags:['Flutter','Dart','Em desenvolvimento'],repo:'https://github.com/habilitou/rewards-app'},
 {id:'talentos',category:'product',label:'Produto · recrutamento',brand:'talentos',subtitle:'COLÉGIO PARAQUETT',desc:'Banco de talentos com cadastro em etapas e envio de currículo para futuras oportunidades na escola.',tags:['Nuxt','Vue','Site disponível']},
 {id:'devseg',category:'ia',label:'IA aplicada · RAG',brand:'devseg.ai',subtitle:'PERGUNTAS COM CONTEXTO',desc:'Agente que consulta documentos de uma seguradora fictícia e responde com as fontes utilizadas.',tags:['LangChain','Gemini','ChromaDB']},
 {id:'autoquote',category:'ia',label:'IA aplicada · atendimento',brand:'autoquote',subtitle:'UMA CONVERSA SOBRE SEGUROS',desc:'Chatbot de seguro auto com perguntas frequentes e simulação acadêmica de cotação.',tags:['Python','Streamlit','LLM']},
 {id:'reports',category:'automation',label:'Automação · Latin Re',brand:'45 min → 2',subtitle:'RELATÓRIOS SEM REPETIÇÃO',desc:'Automação em VBA para tradução, padronização e exportação de relatórios gerenciais.',tags:['Excel','VBA','Processos']},
 {id:'dashboard',category:'automation',label:'Automação · Sinaf',brand:'30 min → 5',subtitle:'DADOS PRONTOS PARA A ANÁLISE',desc:'Consultas em SQL Server para automatizar a atualização de indicadores atuariais.',tags:['SQL Server','Dados','Indicadores']}
];
const skills = [
 ['Py','Python','Dados e automação','#e6c65e'],['AI','Gemini & RAG','IA aplicada','#9292b5'],
 ['TS','TypeScript','Aplicações web','#5aa9d6'],['LC','LangChain','Agentes e contexto','#8b9bb4'],
 ['⚛','React & Next.js','Interfaces','#67c2d3'],['V','Vue & Nuxt','Produtos digitais','#66b58b'],
 ['SQL','SQL & Supabase','Banco de dados','#869cde'],['Fl','Flutter & Dart','Experiências mobile','#68b8d9']
];
$('#skills-list').innerHTML=skills.map(([mark,name,use,color])=>`<div class="skill" style="--skill-color:${color}"><span class="skill-icon" aria-hidden="true">${mark}</span><div><div class="skill-top"><h3>${name}</h3><p>${use}</p></div><div class="skill-dots" aria-hidden="true">${'<i></i>'.repeat(10)}</div></div></div>`).join('');

$('#project-list').innerHTML=projects.map(p=>{
 const c=cases[p.id],repo=p.repo||c.url;
 return `<article class="project-card" data-category="${p.category}"><div class="project-preview cover-${p.id}" aria-hidden="true"><div class="browser-dots"><i></i><i></i><i></i></div><strong class="cover-brand">${p.brand}</strong><span class="cover-tagline">${p.subtitle}</span><div class="cover-art"><span class="sheet"></span><span class="sheet"></span><span class="cover-check">${p.id==='vinky'?'★':'✓'}</span></div><span class="cover-label">CAPA ILUSTRATIVA</span></div><div class="project-copy"><p class="project-category">${p.label}</p><h3>${escape(c.name)}</h3><p class="project-description">${p.desc}</p><div class="tags">${p.tags.map(tag=>`<span>${tag}</span>`).join('')}</div><div class="project-actions">${repo?`<a class="repo-link" href="${escape(repo)}" target="_blank" rel="noopener noreferrer">${p.id==='talentos'?'Visitar site':'Repositório'} ${icon(p.id==='talentos'?'arrow':'github')}</a>`:'<span class="project-state">Case profissional</span>'}<button class="button button-primary" data-case="${p.id}">Ver case ${icon('arrow')}</button></div></div></article>`;
}).join('');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.filter;let count=0;
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 document.querySelectorAll('.project-card').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});
 $('#filter-status').textContent=`${count} ${count===1?'projeto exibido':'projetos exibidos'}.`;
}));
const dialog=$('.case-dialog');
document.addEventListener('click',e=>{
 const button=e.target.closest('[data-case]');if(!button)return;
 const c=cases[button.dataset.case];
 $('.case-body').innerHTML=`<p class="case-label">${escape(c.category)}</p><h2 id="case-title">${escape(c.name)}</h2><p>${escape(c.status)}</p><p>${escape(c.intro)}</p>`+[
  ['O problema',c.problem],['A solução',c.solution],['Resultados e evidências',c.evidence],['Estado atual',c.next],['Tecnologias',c.stack]
 ].map(([heading,text])=>`<h3>${heading}</h3><p>${escape(text)}</p>`).join('')+(c.url?`<a class="button button-primary" href="${escape(c.url)}" target="_blank" rel="noopener noreferrer">${escape(c.linkLabel||'Ver repositório')} ${icon('arrow')}</a>`:'');
 dialog.showModal();
});
$('.close-case').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

const themeButton=$('.theme-toggle');let theme='dark';
try{theme=localStorage.getItem('victor-aurora-theme')||'dark';}catch{}
function applyTheme(){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-label',`Ativar tema ${theme==='dark'?'claro':'escuro'}`);themeButton.setAttribute('aria-pressed',String(theme==='light'));$('meta[name="theme-color"]').content=theme==='dark'?'#090c12':'#f5f7fa';}
applyTheme();let themeTimer;
themeButton.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';applyTheme();clearTimeout(themeTimer);themeButton.classList.remove('theme-switching');void themeButton.offsetWidth;themeButton.classList.add('theme-switching');themeTimer=setTimeout(()=>themeButton.classList.remove('theme-switching'),950);try{localStorage.setItem('victor-aurora-theme',theme);}catch{}});
const menuButton=$('.menu-toggle');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');$('.mobile-nav').hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));$('.mobile-nav').hidden=!open;});
$('.mobile-nav').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
const sections=[...document.querySelectorAll('main section[id]')];
if('IntersectionObserver' in window){
 const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-10% 0px -65% 0px'});sections.forEach(section=>navObserver.observe(section));
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.about-layout,.skill,.project-card,.contact-form').forEach(el=>observer.observe(el));}
}
$('.contact-form').addEventListener('submit',e=>{
 e.preventDefault();const data=new FormData(e.target),name=String(data.get('name')).trim(),email=String(data.get('email')).trim(),message=String(data.get('message')).trim();
 if(!name||!email||!message){$('#form-status').textContent='Preencha seu nome, e-mail e uma mensagem.';return;}
 const subject=encodeURIComponent(`Contato pelo portfólio · ${name}`),body=encodeURIComponent(`Olá, Victor!\n\n${message}\n\n${name}\n${email}`);
 const link=document.createElement('a');link.href=`mailto:vhgomes2001@gmail.com?subject=${subject}&body=${body}`;link.click();
 $('#form-status').textContent='Mensagem preparada. Conclua o envio no seu aplicativo de e-mail, ou use o endereço abaixo.';
});
