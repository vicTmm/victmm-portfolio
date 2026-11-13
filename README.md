# Victor Hugo · Portfólio

Portfólio estático em português, com direção visual baseada na imagem enviada pelo Victor: fundo escuro, luzes roxas, retratos circulares, habilidades com pontos coloridos, cards de projetos e contato.

## Desenvolvimento

Node.js 20+. Sem dependências para instalar.

```sh
npm run build
npm run dev
```

Abra http://localhost:4173. No PowerShell com scripts bloqueados, use `npm.cmd`. Após editar, rode o build e atualize a página.

## Arquivos ativos

- `index.html`: apresentação, sobre, skills, projetos e contato.
- `aurora.css`: layout, tokens, efeitos e responsividade.
- `aurora.js`: filtros, nove cases, menu, tema e preparação de e-mail.
- `case-data.js`: conteúdo e evidências dos sete projetos e duas automações profissionais.
- `theme-motion.css`: movimento dos objetos sol/lua, sem caixa em volta do botão.
- `public/avatar.png` e `public/victor-avatar-3d.png`: avatares pessoais existentes.
- `public/icons-3d/`: ícones oficiais 3dicons CC0; origem em `docs/3dicons.md`.
- `public/victor-hugo-curriculo.pdf`: currículo para download.

## Comportamento

Filtros de projetos: Todos, Inteligência artificial, Produtos digitais e Automações. Cases abrem em diálogo acessível, com Escape para fechar. As capas são composições ilustrativas identificadas, não screenshots das aplicações. Pontos de skills são decorativos, sem notas de proficiência.

O formulário prepara um link `mailto:` com assunto e corpo preenchidos. A pessoa conclui o envio em seu próprio aplicativo de e-mail. Nenhum envio ou armazenamento é simulado, e não há backend de contato. O endereço direto também está disponível.

Tema claro/escuro salvo localmente, troca com movimento e preferência por movimento reduzido respeitada. Google Fonts tem fallback local. Não há coleta de dados pelo site.

## Hospedagem e versões

Build: `npm run build`. Diretório publicado: `dist`. Compatível com Cloudflare Pages e hospedagem estática. Sem variáveis de ambiente. O build não faz deploy.

Arcade preservado em `/arcade.html`, estudo em `/replica.html`. Fontes das versões anteriores em `references/cabinet-version/`, `references/nadhir-version/` e `references/notebook-version/`. A pasta `public/bolha-dev` de outra sessão foi preservada. A investigação REA anterior permanece em `docs/cabinet-reconstruction.md`, com evidências locais em `tmp/cabinet` fora do build.