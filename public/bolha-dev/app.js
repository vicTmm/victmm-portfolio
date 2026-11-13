const areas = ['Front-end', 'Back-end', 'Full-stack', 'Mobile', 'Dados & IA', 'Cloud & DevOps', 'UX & Design', 'QA & Testes', 'Segurança', 'Produto', 'Explorando'];
const goals = ['Conhecer gente', 'Construir um projeto', 'Trocar conhecimento', 'Buscar mentoria', 'Oferecer mentoria', 'Estudar junto', 'Encontrar oportunidades'];
const colors = {yellow:'Amarelo',green:'Verde',pink:'Rosa',blue:'Azul',peach:'Pêssego',lilac:'Lilás'};
// TODO(content): substituir os exemplos por perfis consentidos após integrar o backend.
const examples = [
  {id:'demo-1',name:'Marina Costa',handle:'@marinaexemplo',city:'São Paulo, SP',area:'Front-end',goal:'Construir um projeto',bio:'Transformo café em interfaces. Curto acessibilidade, CSS e projetos que resolvem problemas reais. Bora tirar aquela ideia do papel?',tags:['React','TypeScript','Acessibilidade'],color:'yellow'},
  {id:'demo-2',name:'Lucas Almeida',handle:'@lucasexemplo',city:'Belo Horizonte, MG',area:'Back-end',goal:'Trocar conhecimento',bio:'Do lado de cá das APIs. Gosto de sistemas distribuídos, open source e de explicar as coisas desenhando. Sempre topo um bom papo técnico.',tags:['Java','Go','Open source'],color:'blue'},
  {id:'demo-3',name:'Beatriz Santos',handle:'@biaexemplo',city:'Recife, PE',area:'UX & Design',goal:'Conhecer gente',bio:'Entre o Figma e o código, tentando deixar a web mais humana. Quero conhecer quem também acredita que design é trabalho em equipe.',tags:['UI/UX','Figma','Design systems'],color:'pink'},
  {id:'demo-4',name:'Pedro Oliveira',handle:'@pedroexemplo',city:'Curitiba, PR',area:'Full-stack',goal:'Oferecer mentoria',bio:'Já quebrei bastante coisa em produção e aprendi no caminho. Se você está começando, bora conversar sobre carreira e os primeiros projetos.',tags:['Node.js','React','Carreira'],color:'green'},
  {id:'demo-5',name:'Camila Rocha',handle:'@camilaexemplo',city:'Salvador, BA',area:'Dados & IA',goal:'Estudar junto',bio:'Estudante de computação, curiosa por dados e pelo que dá pra construir com eles. Procurando companhia para estudar e fazer uns experimentos.',school:'Instituição de exemplo',course:'Ciência da Computação',tags:['Python','Machine learning','SQL'],color:'peach'},
  {id:'demo-6',name:'Rafael Lima',handle:'@rafaexemplo',city:'Porto Alegre, RS',area:'Mobile',goal:'Construir um projeto',bio:'Faço apps e coleciono ideias no bloco de notas. Quero juntar uma galera pra construir algo pequeno, útil e que a gente tenha orgulho de usar.',tags:['Flutter','Dart','Side projects'],color:'lilac'}
];
const $ = (selector) => document.querySelector(selector);
const storageKey = 'bolha-dev:profile:v1';
let mine = null;
try { const saved = JSON.parse(localStorage.getItem(storageKey)); if(saved && typeof saved.name === 'string' && areas.includes(saved.area) && goals.includes(saved.goal) && typeof saved.bio === 'string') mine = {...saved,id:'mine',color:Object.hasOwn(colors,saved.color)?saved.color:'yellow'}; } catch { /* Armazenamento indisponível ou inválido: mural continua navegável. */ }
const escape = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const safeUrl = value => {try {const url = new URL(value);return url.protocol === 'https:' ? url.href : null;}catch{return null;}};
for (const [selector,values] of [['#area-filter',areas],['#goal-filter',goals],['select[name=area]',areas],['select[name=goal]',goals]]) {
  $(selector).insertAdjacentHTML('beforeend',values.map(v=>`<option value="${escape(v)}">${escape(v)}</option>`).join(''));
}
$('#colors').innerHTML = Object.entries(colors).map(([key,label])=>`<label class="swatch" style="--note-color:var(--${key})" title="${label}"><input type="radio" name="color" value="${key}" aria-label="${label}" ${key==='yellow'?'checked':''}><span></span></label>`).join('');
function render(){
  const query=normalize($('#search').value.trim()), area=$('#area-filter').value, goal=$('#goal-filter').value;
  const people=[...(mine?[mine]:[]),...examples].filter(p=>(!area||p.area===area)&&(!goal||p.goal===goal)&&normalize([p.name,p.handle,p.city,p.area,p.goal,p.bio,p.school,p.course,...(Array.isArray(p.tags)?p.tags:[])].join(' ')).includes(query));
  if($('#sort').value==='name') people.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  $('#result-count').textContent=`${people.length} ${people.length===1?'post-it':'post-its'}${query||area||goal?' encontrados':' no mural'}`;
  $('#clear-filters').hidden=!(query||area||goal);$('#empty').hidden=people.length>0;
  $('#cards').innerHTML=people.map((p,i)=>{
    const isMine=p.id==='mine';const initials=p.name.split(/\s+/).slice(0,2).map(n=>n[0]).join('');
    const links=['linkedin','github','instagram'].filter(k=>safeUrl(p[k])).map(k=>`<a href="${escape(safeUrl(p[k]))}" target="_blank" rel="noopener noreferrer" aria-label="${k} de ${escape(p.name)}">${{linkedin:'LinkedIn',github:'GitHub',instagram:'Instagram'}[k]} ↗</a>`).join('');
    const handle=escape(p.handle||'');const handleUrl=safeUrl(`https://x.com/${String(p.handle||'').replace(/^@/,'')}`);
    return `<article class="card" style="--note-color:var(--${p.color});--tilt:${[-1,1,.5,.7,-.8,1.2][i%6]}deg"><div class="card-head"><span class="avatar" aria-hidden="true">${escape(initials)}</span><div><h3>${escape(p.name)}</h3>${isMine&&p.handle?`<a class="handle" href="${escape(handleUrl)}" target="_blank" rel="noopener noreferrer">${handle} ↗</a>`:`<span class="handle">${handle}</span>`}</div></div><div class="card-meta"><span>${escape(p.city||'Cidade não informada')}</span><span class="card-area">${escape(p.area)}</span></div><div class="card-body"><p class="card-bio">${escape(p.bio)}</p>${p.school||p.course?`<p class="education">${escape([p.school,p.course].filter(Boolean).join(' · '))}</p>`:''}<div class="tags">${(Array.isArray(p.tags)?p.tags:[]).map(t=>`<span>#${escape(t)}</span>`).join('')}</div><p class="card-goal">${escape(p.goal)}</p></div><div class="card-bottom"><div class="social-links">${links||`<span class="sample-label">${isMine?'Seu post-it local':'Perfil fictício · exemplo'}</span>`}</div><button class="card-more" ${isMine?'data-create':'data-report="'+escape(p.id)+'"'} aria-label="${isMine?'Editar meu post-it':'Informações sobre denúncia do perfil de '+escape(p.name)}">${isMine?'Editar ↗':'Denunciar'}</button></div></article>`;
  }).join('');
}
function clearFilters(){ $('#search').value='';$('#area-filter').value='';$('#goal-filter').value='';render(); }
for(const id of ['search','area-filter','goal-filter','sort']) $('#'+id).addEventListener(id==='search'?'input':'change',render);
$('#clear-filters').addEventListener('click',clearFilters);$('#empty-clear').addEventListener('click',clearFilters);
function openProfile(){
  const form=$('#profile-form');form.reset();$('#form-error').textContent='';
  if(mine) for(const [key,value] of Object.entries(mine)){const field=form.elements.namedItem(key);if(field) field.value=Array.isArray(value)?value.join(', '):value;}
  form.elements.consent.checked=!!mine;$('#delete-profile').hidden=!mine;$('#profile-dialog').showModal();
}
const information={
  about:['Da timeline para uma conversa.', '<p>Este é o mural de networking da Bolha Dev. Encontre pessoas por nome, arroba, cidade ou interesses. Use os filtros para descobrir quem quer construir, estudar ou trocar uma ideia com você.</p><p>Você pode criar um post-it com uma apresentação curta e os links que quiser compartilhar.</p><p><strong>Esta versão é uma prévia local.</strong> Os perfis são fictícios. Seu post-it é salvo neste navegador, sem conta Google e sem envio a um servidor. O mural compartilhado será uma próxima etapa.</p>'],
  rules:['Uma bolha boa pra todo mundo.', '<ul><li>Se apresente com respeito. Este espaço é para networking.</li><li>Compartilhe apenas informações que você quer tornar visíveis.</li><li>Não publique documentos, endereço completo ou dados sensíveis.</li><li>Sem spam, discriminação, assédio ou divulgação de dados de terceiros.</li><li>Peça permissão antes de adicionar alguém a grupos ou listas.</li></ul><p>Na prévia, cada navegador guarda um post-it. Na versão compartilhada, cada conta terá um perfil, com edição e exclusão pelo próprio autor.</p>'],
  privacy:['Você escolhe o que compartilha.', '<p>Esta prévia armazena seu post-it no <strong>localStorage deste navegador</strong>. Não há cadastro, coleta de e-mail nem banco de dados remoto. Você pode apagar seu post-it pelo formulário de edição.</p><p>As fontes são carregadas do Google Fonts. Ao abrir um link social, você acessa um site externo com sua própria política de privacidade.</p><p>A página pede aos buscadores que não a indexem. Isso não restringe acesso nem torna uma publicação privada.</p><p>Antes da abertura do mural compartilhado, serão definidos os responsáveis, contato de suporte, política de retenção e fluxo de denúncias.</p>'],
  report:['Sobre as denúncias.', '<p>Este é um perfil fictício da prévia. <strong>Nenhuma denúncia foi enviada.</strong></p><p>O envio para moderadores será conectado junto com o mural compartilhado. A versão pública precisará permitir denunciar spam, assédio, dados sensíveis e outros conteúdos fora dos combinados.</p>']
};
function showInfo(key){const [title,body]=information[key];$('#info-title').textContent=title;$('#info-content').innerHTML=body;$('#info-dialog').showModal();}
document.addEventListener('click',e=>{if(e.target.closest('[data-create]'))openProfile();const info=e.target.closest('[data-info]');if(info)showInfo(info.dataset.info);if(e.target.closest('[data-report]'))showInfo('report');if(e.target.closest('[data-close]'))e.target.closest('dialog').close();});
for(const dialog of document.querySelectorAll('dialog')) dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
let toastTimeout;
function toast(message){clearTimeout(toastTimeout);$('#toast').textContent=message;$('#toast').hidden=false;toastTimeout=setTimeout(()=>$('#toast').hidden=true,4500);}
$('#profile-form').addEventListener('submit',e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.target));
  for(const key of Object.keys(data)) data[key]=data[key].trim();
  if(!data.name||!data.bio){$('#form-error').textContent='Preencha seu nome e sua apresentação.';return;}
  for(const key of ['linkedin','github','instagram']) if(data[key]&&!safeUrl(data[key])){$('#form-error').textContent='Use links completos começando com https:// nas redes sociais.';return;}
  const profile={...data,id:'mine',tags:data.tags.split(',').map(s=>s.trim()).filter(Boolean).slice(0,5),handle:data.handle?'@'+data.handle.replace(/^@/,''):''};delete profile.consent;
  try {localStorage.setItem(storageKey,JSON.stringify(profile));}catch{$('#form-error').textContent='O navegador não permitiu salvar. Verifique as configurações de armazenamento.';return;}
  mine=profile;clearFilters();$('#profile-dialog').close();render();toast('Seu post-it foi salvo neste navegador.');$('#mural').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
$('#delete-profile').addEventListener('click',()=>$('#delete-dialog').showModal());
$('#confirm-delete').addEventListener('click',()=>{try{localStorage.removeItem(storageKey);}catch{toast('Não foi possível apagar. Tente novamente.');return;}mine=null;$('#delete-dialog').close();$('#profile-dialog').close();render();toast('Seu post-it foi apagado deste navegador.');});
window.addEventListener('storage',e=>{if(e.key===storageKey)location.reload();});
render();
