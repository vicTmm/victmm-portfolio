import { DurableObject } from 'cloudflare:workers';

// One coordination atom for this portfolio's counter; static requests bypass it.
export class PortfolioLikes extends DurableObject {
 constructor(ctx, env) {
  super(ctx, env);
  ctx.blockConcurrencyWhile(async () => {
   ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS likes (visitor TEXT PRIMARY KEY, liked INTEGER NOT NULL, changed_at INTEGER NOT NULL)');
   ctx.storage.sql.exec('CREATE INDEX IF NOT EXISTS liked_visitors ON likes(liked)');
  });
 }
 state(visitor) {
  const liked = this.ctx.storage.sql.exec('SELECT liked FROM likes WHERE visitor = ?', visitor).toArray()[0]?.liked === 1;
  const count = this.ctx.storage.sql.exec('SELECT COUNT(*) AS count FROM likes WHERE liked = 1').one().count;
  return { count, liked };
 }
 setLike(visitor, liked) {
  return this.ctx.storage.transactionSync(() => {
   const previous = this.ctx.storage.sql.exec('SELECT liked, changed_at FROM likes WHERE visitor = ?', visitor).toArray()[0];
   if (previous?.liked === Number(liked)) return this.state(visitor);
   if (previous && Date.now() - previous.changed_at < 400) return { ...this.state(visitor), rateLimited:true };
   this.ctx.storage.sql.exec('INSERT INTO likes (visitor, liked, changed_at) VALUES (?, ?, ?) ON CONFLICT(visitor) DO UPDATE SET liked = excluded.liked, changed_at = excluded.changed_at', visitor, Number(liked), Date.now());
   return this.state(visitor);
  });
 }
}

const cookieName = 'portfolio-visitor';
function visitorCookie(request) {
 const value = request.headers.get('Cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
 return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value ?? '') ? value : null;
}
function json(data, status = 200, extra = {}) {
 return Response.json(data, {status, headers:{'Cache-Control':'no-store', 'Vary':'Cookie', 'X-Content-Type-Options':'nosniff', ...extra}});
}
async function smallJson(request) {
 if (!request.body) throw new Error('empty');
 const reader = request.body.getReader();
 let text = '', size = 0;
 const decoder = new TextDecoder();
 try {
  while (true) {
   const {value, done} = await reader.read();
   if (done) break;
   size += value.byteLength;
   if (size > 128) { await reader.cancel(); throw new Error('large'); }
   text += decoder.decode(value, {stream:true});
  }
  return JSON.parse(text + decoder.decode());
 } finally { reader.releaseLock(); }
}
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== '/api/likes') {
   if (url.pathname.startsWith('/api/')) return json({error:'Não encontrado.'}, 404);
   return env.ASSETS.fetch(request);
  }
  if (!['GET','POST'].includes(request.method)) return json({error:'Método não permitido.'}, 405, {Allow:'GET, POST'});
  if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) return json({error:'Origem não permitida.'}, 403);
  let visitor = visitorCookie(request);
  if (request.method === 'POST' && !visitor) return json({error:'Atualize a página para curtir.'}, 409);
  const isNew = !visitor;
  visitor ??= crypto.randomUUID();
  const cookie = `${cookieName}=${visitor}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Strict${url.protocol === 'https:' ? '; Secure' : ''}`;
  try {
   const counter = env.LIKES.getByName('portfolio');
   if (request.method === 'GET') return json(await counter.state(visitor), 200, isNew ? {'Set-Cookie':cookie} : {});
   if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({error:'Formato inválido.'}, 415);
   let data;
   try { data = await smallJson(request); } catch { return json({error:'Dados inválidos.'}, 400); }
   if (!data || typeof data.liked !== 'boolean') return json({error:'Curtida inválida.'}, 400);
   const state = await counter.setLike(visitor, data.liked);
   if (state.rateLimited) return json({error:'Aguarde um instante e tente novamente.'}, 429, {'Retry-After':'1'});
   return json(state);
  } catch (error) {
   console.error(JSON.stringify({event:'portfolio_likes_error', message:error.message}));
   return json({error:'Não foi possível carregar as curtidas.'}, 503);
  }
 }
};
