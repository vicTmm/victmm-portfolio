# Victor Hugo · Portfólio Arcade

Portfólio estático baseado no Cabinet do Motion: tela CRT, cenário em pixel art, letras com molas, joysticks e teclado. Sete projetos e cases de automação. Análise da referência com REA e navegador documentada em [docs/cabinet-reconstruction.md](docs/cabinet-reconstruction.md).

## Desenvolvimento

Node.js 20+. Sem dependências para instalar.

```sh
npm run build
npm run dev
```

Abra http://localhost:4173. No PowerShell com scripts bloqueados, use `npm.cmd`. Após editar, rode o build e atualize a página.

- `/`: portfólio de Victor Hugo.
- `/replica.html`: estudo da referência com personagem fictício.
- Enter abre; Escape fecha; setas ou WASD alternam seções e itens; teclas 1–4 selecionam abas. Joysticks funcionam por clique ou toque.
- Sol/lua alternam o tema com movimento, sem caixa. O botão de pausa controla o movimento. A preferência de movimento reduzido do sistema é respeitada.

## Hospedagem

Build: `npm run build`. Diretório publicado: `dist`. Compatível com Cloudflare Pages e hospedagem estática. Sem variáveis de ambiente. O build não faz deploy.

## Arquivos ativos

- `index.html`: estrutura semântica e contatos.
- `cabinet.css`: gabinete, janela, joysticks e responsividade.
- `cabinet.js`: Canvas, molas, teclado, seleção, tema e detalhes dos cases.
- `case-data.js`: conteúdo dos projetos e evidências; sem métricas inventadas.
- `replica.html`: estudo da referência.
- `public/victor-avatar-3d.png`: personagem pessoal pixelado no Canvas.
- `public/icons-3d/`: renders oficiais 3dicons CC0; origem em `docs/3dicons.md`.
- `public/victor-hugo-curriculo.pdf`: currículo para download.
- `references/nadhir-version/` e `references/notebook-version/`: versões anteriores preservadas.

Arquivos da investigação em `tmp/cabinet`, ignorados pelo Git e fora do build. A pasta `public/bolha-dev` de outra sessão foi preservada. Google Fonts tem fallback local. Tema salvo no navegador. O site não envia dados ou formulários.