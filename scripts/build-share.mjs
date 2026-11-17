import { mkdir, copyFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Publish only this landing page and its assets, never repository contents.
const html = await readFile('share/index.html', 'utf8');
const url = 'https://victmm.github.io/victmm-portfolio/';
assert(html.includes(`<link rel="canonical" href="${url}">`));
assert(html.includes(`<meta property="og:url" content="${url}">`));
assert(html.includes(`<meta property="og:image" content="${url}og-image.png">`));
assert(html.includes(`<meta name="twitter:image" content="${url}og-image.png">`));
assert(!/<script\b|http-equiv\s*=\s*["']refresh/i.test(html), 'A página deve abrir sem JavaScript e sem redirecionamento automático.');
const image = await readFile('public/og-image.png');
assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
await mkdir('dist-share', {recursive:true});
await copyFile('share/index.html', 'dist-share/index.html');
for (const file of ['og-image.png','favicon-avatar.png']) await copyFile(`public/${file}`, `dist-share/${file}`);
console.log('Página de compartilhamento validada e gerada em dist-share/');
