import assert from 'node:assert/strict';

const base = new URL(process.argv[2] ?? 'http://127.0.0.1:4173');
if (!['localhost','127.0.0.1'].includes(base.hostname)) throw new Error('Este teste grava somente no ambiente local.');
const endpoint = new URL('/api/likes', base);
async function visitor() {
 const response = await fetch(endpoint);
 assert.equal(response.status, 200);
 assert.equal(response.headers.get('cache-control'), 'no-store');
 assert.match(response.headers.get('set-cookie'), /HttpOnly; SameSite=Strict/);
 return {cookie:response.headers.get('set-cookie').split(';')[0], state:await response.json()};
}
const [a,b] = await Promise.all([visitor(),visitor()]);
const baseline = a.state.count;
const post = (person, liked, extras = {}) => fetch(endpoint, {
 method:'POST', headers:{Origin:base.origin, Cookie:person.cookie, 'Content-Type':'application/json', ...extras}, body:JSON.stringify({liked})
});
const both = await Promise.all([post(a,true),post(b,true)]);
for (const response of both) assert.equal(response.status,200);
const after = await fetch(endpoint, {headers:{Cookie:a.cookie}}).then(r=>r.json());
assert.deepEqual(after,{count:baseline+2,liked:true});
const repeats = await Promise.all(Array.from({length:12},()=>post(a,true)));
for (const response of repeats) assert.deepEqual(await response.json(),after);
assert.equal((await post(a,false,{Origin:'https://example.com'})).status,403);
assert.equal((await fetch(endpoint,{method:'POST',headers:{Origin:base.origin,'Content-Type':'application/json'},body:'{"liked":true}'})).status,409);
assert.equal((await post(a,'invalid')).status,400);
assert.equal((await fetch(endpoint,{method:'POST',headers:{Origin:base.origin,Cookie:a.cookie,'Content-Type':'application/json'},body:'x'.repeat(1024)})).status,400);
assert.equal((await fetch(endpoint,{method:'PUT'})).status,405);
assert.equal((await fetch(new URL('/api/missing',base))).status,404);
await new Promise(resolve=>setTimeout(resolve,450));
for (const person of [a,b]) assert.equal((await post(person,false)).status,200);
assert.deepEqual(await fetch(endpoint,{headers:{Cookie:a.cookie}}).then(r=>r.json()),{count:baseline,liked:false});
console.log('Curtidas: persistência, concorrência, idempotência, retirada e validação de requisições passaram. Contador restaurado ao valor inicial.');
