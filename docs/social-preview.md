# Preview de compartilhamento

As páginas inicial e de projetos declaram canonical, Open Graph e Twitter Cards no HTML estático. A origem pública é `https://portfolio.victmm.workers.dev`.

`public/og-image.png` tem 1200 × 630 pixels e usa o avatar existente. A composição editável está em `scripts/og-image.html`. Para exportá-la novamente, gere o build, copie o template temporariamente para `dist/og-preview.html`, abra-o no servidor estático local e capture um viewport de 1200 × 630, escala 1, depois de carregar fontes e imagens. Salve a captura como `public/og-image.png` e remova o HTML temporário de `dist`. O template não entra na publicação.

Validação do build: `node scripts/check-metadata.mjs`. Após publicar: `node scripts/check-metadata.mjs --live`.

A verificação pública faz GET sem cookies e sem JavaScript com os user-agents LinkedInBot, Twitterbot e facebookexternalhit. Confere HTTP 200 sem redirecionamento ou challenge, Content-Type, metadados, canonical, dimensões do PNG e robots.txt. Isso verifica o acesso a partir do ambiente de teste; não simula os endereços IP dos crawlers reais nem confirma o cache de previews das plataformas.

O robots.txt permite acesso ao site e à imagem e exclui apenas `/api/`. Os arquivos estáticos são servidos por Workers Static Assets, sem autenticação no código. Nenhuma regra global de proteção da Cloudflare é desativada para esses previews.
