const form = document.querySelector('.contact-form');
const directEmail = document.querySelector('.contact-channel[href^="mailto:"]');
const recipient = 'vhgomes2001@gmail.com';
if (form && directEmail) {
 document.body.insertAdjacentHTML('beforeend', `<dialog class="email-composer" aria-labelledby="email-composer-title">
  <button type="button" class="email-composer-close" aria-label="Fechar opções de e-mail">×</button>
  <h2 id="email-composer-title">Escolha como enviar</h2>
  <p>A mensagem está pronta. Abra seu e-mail para revisar e enviar.</p>
  <div class="email-provider-list">
   <a data-email-provider="gmail" target="_blank" rel="noopener noreferrer">Abrir no Gmail <span aria-hidden="true">↗</span></a>
   <a data-email-provider="outlook" target="_blank" rel="noopener noreferrer">Abrir no Outlook <span aria-hidden="true">↗</span></a>
   <a data-email-provider="app">Usar aplicativo de e-mail <span aria-hidden="true">↗</span></a>
  </div>
  <label for="email-draft">Sua mensagem</label>
  <textarea id="email-draft" rows="6" readonly></textarea>
  <button class="outline-button email-copy" type="button">Copiar mensagem e destinatário</button>
  <p class="email-composer-status" role="status" aria-live="polite"></p>
 </dialog>`);
 const dialog = document.querySelector('.email-composer');
 const draft = document.querySelector('#email-draft');
 const status = dialog.querySelector('.email-composer-status');
 let subject = '';
 let body = '';
 function openComposer(nextSubject, nextBody) {
  subject = nextSubject;
  body = nextBody;
  const gmail = new URL('https://mail.google.com/mail/');
  gmail.search = new URLSearchParams({view:'cm',fs:'1',to:recipient,su:subject,body}).toString();
  const outlook = new URL('https://outlook.live.com/mail/0/deeplink/compose');
  outlook.search = new URLSearchParams({to:recipient,subject,body}).toString();
  dialog.querySelector('[data-email-provider=gmail]').href = gmail.href;
  dialog.querySelector('[data-email-provider=outlook]').href = outlook.href;
  dialog.querySelector('[data-email-provider=app]').href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  draft.value = `Assunto: ${subject}\n\n${body}`;
  status.textContent = '';
  dialog.showModal();
 }
 directEmail.addEventListener('click', event => {
  event.preventDefault();
  openComposer('Contato pelo portfólio', 'Olá, Victor!\n\nVi seu portfólio e gostaria de conversar sobre uma oportunidade ou projeto.');
 });
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  if (!name || !email || !message) {
   document.querySelector('#form-status').textContent = 'Preencha seu nome, e-mail e mensagem.';
   return;
  }
  openComposer(`Contato pelo portfólio · ${name}`, `Olá, Victor!\n\n${message}\n\n${name}\nE-mail para retorno: ${email}`);
  document.querySelector('#form-status').textContent = 'Mensagem preparada. Escolha como revisar e enviar.';
 });
 dialog.querySelector('.email-composer-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
 });
 dialog.querySelector('[data-email-provider=app]').addEventListener('click', () => {
  status.textContent = 'Se o aplicativo não abrir, escolha Gmail ou Outlook, ou copie a mensagem.';
 });
 dialog.querySelector('.email-copy').addEventListener('click', async () => {
  const content = `Para: ${recipient}\nAssunto: ${subject}\n\n${body}`;
  try {
   await navigator.clipboard.writeText(content);
   status.textContent = 'Mensagem e destinatário copiados. Cole no seu e-mail para enviar.';
  } catch {
   draft.value = content;
   draft.focus();
   draft.select();
   status.textContent = 'Selecione e copie o texto acima para colar no seu e-mail.';
  }
 });
}
