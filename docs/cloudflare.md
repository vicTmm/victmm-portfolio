# Hospedagem Cloudflare

Worker: `victmm-portfolio`. Conta: `79713c6296c1f11ea71c1efce251bfed`.

O workflow `.github/workflows/cloudflare.yml` publica automaticamente os commits da
branch `main`. Também pode ser iniciado por **Run workflow** no GitHub Actions.
O token fica no secret `CLOUDFLARE_API_TOKEN` do repositório, nunca nos arquivos.
A integração usa GitHub Actions e não depende do aplicativo Git da Cloudflare.

`npm run deploy:check` gera o site e verifica o pacote sem publicar.
`npm run deploy` gera o site e publica somente `dist`, com a CLI `cf`.
Para publicar localmente, autentique a CLI ou forneça `CLOUDFLARE_API_TOKEN`
no ambiente do processo; a autenticação do MCP é independente.

O workflow utiliza Node.js 24. As versões suportadas pela CLI constam em
`package.json`. `cloudflare.config.ts` define o Worker e a conta;
`wrangler.config.ts` define a pasta de arquivos estáticos para o builder usado
pela CLI `cf`.

Alterações locais só entram no deploy automático depois de commit e push.
