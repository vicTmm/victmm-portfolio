import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'aurora.css', 'aurora.js', 'theme-motion.css', 'arcade.html', 'replica.html', 'cabinet.css', 'cabinet.js', 'case-data.js']) await copyFile(file, `dist/${file}`);
await cp('public', 'dist', { recursive: true });
console.log('Site estático gerado em dist/');
