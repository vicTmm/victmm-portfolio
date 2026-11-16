# Victor Hugo · Portfólio

Portfólio estático em português, com fundo grafite, azul aço e violeta fechado. Entrada centralizada, avatar compacto com esclera branca junto ao título, descrição e ações abaixo. A página inicial reúne apresentação, atuação e contato. A vitrine fica em `/projetos`, com seis projetos selecionados, filtros e cases.

## Desenvolvimento

Node.js 20+. Sem dependências para instalar.

```sh
npm run build
npm run dev
```

Abra http://localhost:4173. No PowerShell com scripts bloqueados, use `npm.cmd`. Após editar, rode o build e atualize a página.

## Arquivos ativos

- `index.html`: apresentação, três cards de atuação e painel de contato.
- `projetos.html`: fonte da página `/projetos`, publicada em `dist/projetos/index.html`.
- `aurora.css`: layout, tokens, efeitos e responsividade.
- `aurora.js`: menu, tema, entradas discretas e preparação de e-mail, compartilhados pelas páginas.
- `projects.js`: seleção dos seis projetos, capas, filtros e diálogos dos cases. Carregado apenas em `/projetos`.
- `case-data.js`: conteúdo e evidências dos cases, incluindo histórico de projetos fora da seleção atual.
- `theme-motion.css`: estilos preservados das versões anteriores. O seletor atual usa SVGs de sol/lua e menu em `aurora.css`/`aurora.js`.
- `public/victor-avatar-3d-compact.png`: avatar 3D atual, com pescoço mais curto, com círculo roxo integrado; geração e prompt em `docs/avatar-option-3d.md`. Versões anteriores preservadas.
- `public/favicon-avatar.png`: ilustração enviada pelo Victor, usada como favicon nas duas páginas.
- `public/icons-3d/`: ícones oficiais 3dicons CC0; origem em `docs/3dicons.md`.
- `references/source-documents/victor-hugo-curriculo.pdf`: currículo preservado fora da publicação; sem link de download.

## Comportamento

“Explorar projetos”, “Ver meus projetos” e o item do menu abrem `/projetos`. A rota aceita acesso direto com ou sem barra final. Filtros: Todos, Inteligência artificial e Produtos digitais. Cases abrem em diálogo acessível, com Escape para fechar. Oferta Re, Papaia e Vinky usam imagens de seus repositórios em `public/projects/`, com origem documentada na pasta. A imagem do Oferta Re é um protótipo com dados fictícios. Os demais cards usam composições ilustrativas identificadas. Os três sites ainda sem URL mostram “Site em breve”, sem links para GitHub.

O formulário prepara um link `mailto:` com assunto e corpo preenchidos. A pessoa conclui o envio em seu próprio aplicativo de e-mail. Nenhum envio ou armazenamento é simulado, e não há backend de contato. O endereço direto também está disponível.

Tema Claro, Escuro ou Sistema salvo localmente, com ícones vetoriais de sol/lua e troca animada. Sistema acompanha a preferência do dispositivo; movimento reduzido é respeitado. Google Fonts tem fallback local. Não há coleta de dados pelo site.

## Hospedagem e versões

Publicado em [portfolio.victmm.workers.dev](https://portfolio.victmm.workers.dev/), com projetos em `/projetos/`, usando Cloudflare Workers Static Assets (Worker `portfolio`). Última publicação verificada em 16/11/2026: página inicial, projetos, CSS, JavaScript, favicon, avatar e novas capas conferidos contra o build local. Currículo removido retorna 404.

Build: `npm run build`. Diretório publicado: `dist`. Sem variáveis de ambiente. O build não faz deploy. A publicação atual foi feita pela conexão Cloudflare autenticada; o CLI local não está autenticado.

Arcade preservado em `/arcade.html`, estudo em `/replica.html`. Fontes das versões anteriores em `references/cabinet-version/`, `references/nadhir-version/` e `references/notebook-version/`. A pasta `public/bolha-dev` de outra sessão foi preservada. A investigação REA anterior permanece em `docs/cabinet-reconstruction.md`, com evidências locais em `tmp/cabinet` fora do build.

## Revis?o local das galerias ? 16/11/2026

Retomada da sess?o interrompida durante a valida??o. Os seis projetos usam galerias de 3?4 telas reais com resumo e tecnologias; Clima Seguro substitui AutoQuote. Build conclu?do, 21 imagens carregadas no navegador, navega??o circular por setas e teclado conferida e filtros validados. Di?logos verificados em desktop (1440 ? 960) e celular (390 ? 844), com temas claro e escuro e sem transbordamento horizontal no celular. Vinky apresenta entrada, acesso e cadastro; as ?reas autenticadas ainda n?o foram capturadas. Altera??es locais, sem novo deploy.

## Curtidas sem login

Bot?o ?Curtiu por aqui?? no rodap? das duas p?ginas. likes.js consulta GET /api/likes e define o voto com POST /api/likes. worker.js usa um Durable Object SQLite (PortfolioLikes), uma linha por identificador de navegador e grava??o at?mica, sem incrementar novamente em retries. A pessoa pode retirar a curtida. O cookie portfolio-visitor dura um ano e ? HttpOnly, SameSite=Strict e Secure em HTTPS. Limite simples de frequ?ncia entre altera??es e verifica??o de origem na escrita. Limpar cookies ou usar outro navegador permite outro voto; n?o representa pessoas ?nicas. Nenhuma coleta de nome, conta ou IP no banco.

No desenvolvimento, npm run dev serve site e API em http://localhost:4173, com dados locais separados da produ??o. node scripts/check-likes.mjs http://127.0.0.1:4173 valida concorr?ncia, idempot?ncia, retirada e requisi??es inv?lidas, restaurando o contador inicial. npm run deploy:check valida o pacote sem publicar. O contador p?blico ser? criado na pr?xima publica??o aprovada; esta etapa n?o fez deploy. Se a API estiver indispon?vel, o site n?o exibe um total simulado.

## Contato atualizado

O WhatsApp inclui mensagem inicial. contact.js substitui a tentativa de abrir mailto automaticamente por um seletor de envio no Gmail, Outlook ou aplicativo instalado, com alternativa de copiar a mensagem. A pessoa revisa e conclui o envio no serviço escolhido. Detalhes em docs/contact.md. Sem backend de envio e sem confirmação simulada de entrega.

## Publicação de 16/11/2026

Versão atual publicada em https://portfolio.victmm.workers.dev/, com galerias, lâmpada, identidade VH, contato e curtidas persistentes. Código da publicação: b3813b5. O botão de contato do início não exibe mais o balão do agente. Build, testes locais da API e respostas públicas conferidos. Dados de desenvolvimento das curtidas são separados de produção. O currículo original fica apenas local e ignorado pelo Git.
