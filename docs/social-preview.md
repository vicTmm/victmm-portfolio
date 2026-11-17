# Preview de compartilhamento

As páginas inicial e de projetos declaram canonical, Open Graph e Twitter Cards no HTML estático. A origem pública é `https://portfolio.victmm.workers.dev`.

`public/og-image.png` tem 1200 × 630 pixels e usa o avatar existente. A composição editável está em `scripts/og-image.html`. Para exportá-la novamente, gere o build, copie o template temporariamente para `dist/og-preview.html`, abra-o no servidor estático local e capture um viewport de 1200 × 630, escala 1, depois de carregar fontes e imagens. Salve a captura como `public/og-image.png` e remova o HTML temporário de `dist`. O template não entra na publicação.

Validação do build: `node scripts/check-metadata.mjs`. Após publicar: `node scripts/check-metadata.mjs --live`.

A verificação pública faz GET sem cookies e sem JavaScript com os user-agents LinkedInBot, Twitterbot e facebookexternalhit. Confere HTTP 200 sem redirecionamento ou challenge, Content-Type, metadados, canonical, dimensões do PNG e robots.txt. Isso verifica o acesso a partir do ambiente de teste; não simula os endereços IP dos crawlers reais nem confirma o cache de previews das plataformas.

O robots.txt permite acesso ao site e à imagem e exclui apenas `/api/`. Os arquivos estáticos são servidos por Workers Static Assets, sem autenticação no código. Nenhuma regra global de proteção da Cloudflare é desativada para esses previews.

## Endereço alternativo para o LinkedIn

`https://victmm.github.io/victmm-portfolio/` é uma página independente no GitHub Pages, gratuita e publicada a partir deste repositório. Ela mostra a imagem e um link para abrir o site completo na Cloudflare. Seu canonical e as URLs de Open Graph apontam para o GitHub Pages; não há redirecionamento automático nem dependência de assets da Cloudflare para gerar o preview.

Fonte: `share/index.html`. Build: `node scripts/build-share.mjs`. O workflow `share-pages.yml` publica apenas `dist-share`, com o HTML, o PNG e o favicon. A página não carrega a API de curtidas; o contador continua no site completo. Após publicar, verificar o endereço alternativo no Post Inspector do LinkedIn para confirmar a ingestão pelos servidores da plataforma.
