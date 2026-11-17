import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = 'https://portfolio.victmm.workers.dev';
const live = process.argv.includes('--live');
const agents = live ? ['LinkedInBot/1.0', 'Twitterbot/1.0', 'facebookexternalhit/1.1'] : [null];
const pages = [['index.html', '/'], ['projetos/index.html', '/projetos/']];

async function resource(path, agent) {
 if (!live) return readFile(`dist/${path}`);
 const response = await fetch(`${origin}/${path}`, {headers:{'User-Agent':agent}, redirect:'error'});
 assert.equal(response.status, 200, `${agent}: /${path} HTTP ${response.status}`);
 assert.notEqual(response.headers.get('cf-mitigated'), 'challenge', `${agent}: challenge em /${path}`);
 assert(!/noindex|none/i.test(response.headers.get('x-robots-tag') ?? ''), 'X-Robots-Tag bloqueia indexação');
 const type = path.endsWith('.png') ? 'image/png' : path.endsWith('.txt') ? 'text/plain' : 'text/html';
 assert(response.headers.get('content-type')?.includes(type), `${path}: Content-Type incorreto`);
 return Buffer.from(await response.arrayBuffer());
}

for (const agent of agents) {
 for (const [file, route] of pages) {
  const html = (await resource(live ? route.slice(1) : file, agent)).toString('utf8');
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, `${route}: head ausente`);
  const meta = new Map();
  for (const tag of head.matchAll(/<meta\b[^>]*>/gi)) {
   const attrs = Object.fromEntries([...tag[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
   const key = attrs.property ?? attrs.name;
   if (!key?.startsWith('og:') && !key?.startsWith('twitter:')) continue;
   assert(!meta.has(key), `${route}: ${key} duplicado`);
   meta.set(key, attrs.content);
  }
  for (const key of ['og:title','og:description','og:site_name','og:image:alt','twitter:title','twitter:description','twitter:image:alt']) {
   assert(meta.get(key)?.trim(), `${route}: ${key} ausente`);
  }
  assert.equal(meta.get('og:type'), 'website');
  assert.equal(meta.get('og:locale'), 'pt_BR');
  assert.equal(meta.get('og:url'), origin + route);
  assert.equal(meta.get('twitter:card'), 'summary_large_image');
  for (const key of ['og:image','og:image:secure_url','twitter:image']) assert.equal(meta.get(key), `${origin}/og-image.png`);
  assert.equal(meta.get('og:image:width'), '1200');
  assert.equal(meta.get('og:image:height'), '630');
  assert.equal(meta.get('og:image:type'), 'image/png');
  const canonicals = [...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
  assert.equal(canonicals.length, 1);
  assert.equal(canonicals[0][1], origin + route);
  assert(!/<meta[^>]+name="robots"[^>]+content="[^"]*(noindex|none)/i.test(head));
 }
 const png = await resource('og-image.png', agent);
 assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
 assert.equal(png.readUInt32BE(16), 1200);
 assert.equal(png.readUInt32BE(20), 630);
 const robots = (await resource('robots.txt', agent)).toString('utf8');
 assert.match(robots, /User-agent:\s*\*/i);
 assert.match(robots, /^Allow:\s*\/\s*$/m);
 assert(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt bloqueia o site');
 console.log(`${live ? agent : 'Build local'}: HTML estático, canonical, Open Graph, Twitter Cards, robots.txt e PNG 1200 × 630 OK.`);
}
