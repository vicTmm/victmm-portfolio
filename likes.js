const button = document.querySelector('[data-like-button]');
if (button) {
 const count = button.querySelector('[data-like-count]');
 const label = button.querySelector('[data-like-label]');
 const status = document.querySelector('[data-like-status]');
 let liked = false;
 async function request(options) {
  const response = await fetch('/api/likes', {credentials:'same-origin', cache:'no-store', ...options});
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Tente novamente em instantes.');
  if (!Number.isSafeInteger(data.count) || data.count < 0 || typeof data.liked !== 'boolean') throw new Error('Resposta inválida.');
  return data;
 }
 function render(data) {
  liked = data.liked;
  count.textContent = new Intl.NumberFormat('pt-BR').format(data.count);
  label.textContent = liked ? 'Curtido' : 'Curtir';
  button.setAttribute('aria-pressed', String(liked));
  button.setAttribute('aria-label', `${liked ? 'Retirar curtida' : 'Curtir portfólio'}. ${data.count} ${data.count === 1 ? 'curtida' : 'curtidas'}.`);
 }
 async function refresh() {
  try { render(await request()); status.textContent = ''; button.disabled = false; }
  catch { count.textContent = '—'; status.textContent = 'Curtidas indisponíveis agora. Tente novamente mais tarde.'; button.disabled = true; }
 }
 button.addEventListener('click', async () => {
  button.disabled = true;
  button.setAttribute('aria-busy','true');
  try {
   render(await request({method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({liked:!liked})}));
   status.textContent = liked ? 'Obrigado pelo carinho!' : 'Curtida retirada.';
   document.dispatchEvent(new CustomEvent(liked ? 'portfolio:liked' : 'portfolio:unliked'));
  } catch (error) { status.textContent = error.message; }
  finally { button.disabled = false; button.removeAttribute('aria-busy'); }
 });
 window.addEventListener('pageshow', refresh);
 window.addEventListener('online', refresh);
}
