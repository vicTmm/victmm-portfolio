# Hospedagem Cloudflare

Worker: `portfolio`. Conta: `79713c6296c1f11ea71c1efce251bfed`.
Endereço público: https://portfolio.victmm.workers.dev.

O workflow `.github/workflows/cloudflare.yml` publica automaticamente os commits da
branch `main`. Também pode ser iniciado por **Run workflow** no GitHub Actions.
O token fica no secret `CLOUDFLARE_API_TOKEN` do repositório, nunca nos arquivos.
A integração usa GitHub Actions e não depende do aplicativo Git da Cloudflare.

`npm run deploy:check` gera o site e verifica o pacote sem publicar.
`npm run deploy` gera o site e publica os assets de `dist` e `worker.js`, com a CLI `cf`.
Para publicar localmente, autentique a CLI ou forneça `CLOUDFLARE_API_TOKEN`
no ambiente do processo; a autenticação do MCP é independente.

O workflow utiliza Node.js 24. As versões suportadas pela CLI constam em
`package.json`. `cloudflare.config.ts` define o Worker e a conta;
`wrangler.config.ts` define a pasta de arquivos estáticos para o builder usado
pela CLI `cf`.

Alterações locais só entram no deploy automático depois de commit e push.

## API de curtidas

A configura??o tamb?m declara PortfolioLikes com armazenamento SQLite e binding LIKES. ASSETS serve os arquivos est?ticos; somente /api/* passa primeiro pelo c?digo do Worker. O cf gerencia o ciclo de vida da classe via worker.exports. npm run dev inicia o runtime local em 4173, com persist?ncia isolada em .cloudflare/state. A API armazena somente UUID aleat?rio do navegador, estado do voto e instante da ?ltima altera??o. Nenhum banco remoto ou namespace foi criado nesta etapa: a ativa??o p?blica ocorre junto do pr?ximo deploy aprovado.
