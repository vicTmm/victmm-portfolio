# Victor Hugo — Portfólio

Site estático em português, sem dependências de execução e sem backend. Inclui menu superior, apresentação pessoal, projetos, detalhes dos cases em modal, currículo e contato.

## Rodar localmente

Requer Node.js 20 ou superior.

```sh
npm run build
npm run dev
```

Abra http://localhost:4173. No PowerShell com scripts bloqueados, use `npm.cmd` no lugar de `npm`. Após editar os arquivos, rode o build novamente e atualize a página.

## Hospedagem

O comando de build é `npm run build` e a pasta publicada é `dist`. O resultado contém somente arquivos estáticos e pode ser hospedado em Cloudflare Pages ou outro serviço de hospedagem estática. Não precisa de variáveis de ambiente.

Um domínio `.tech` pode apontar para a hospedagem escolhida; o domínio não substitui a hospedagem. Configure o domínio personalizado no provedor e use os registros DNS que ele indicar. Nenhum deploy foi realizado por este projeto.

## Editar

O visual de caderno usa `scrapbook.css` e a paleta aprovada em `field-notes.css`. As interações ficam em `motion.js` e `motion.css`: digitação, título com caracteres, adesivos na rolagem, estrelas arrastáveis, tema e ampliação do personagem. Os botões no topo controlam tema e movimento, com preferência salva no navegador. A origem do fundo do caderno está registrada em `docs/design-reference.md`.

- `index.html`: apresentação, cards, trajetória e links.
- `style.css`: estilos base.
- `scrapbook.css`: tema de caderno, recortes e versões responsivas.
- `app.js`: texto dos cases, modal e cópia do e-mail.
- `public/`: avatar, favicon e currículo para download.
- `docs/portfolio-brief.md`: fontes, contexto e pontos a confirmar.

As fontes Google Fonts são opcionais: o site tem fontes de sistema como fallback. As capas dos projetos são composições tipográficas em HTML/CSS; não são capturas dos produtos. O avatar é a imagem original recuperada do GitHub, sem recriação ou animação.

Antes de publicar, revise o currículo e confirme o estágio atual dos cases. Os números de desempenho pertencem às automações descritas no currículo. Não há alegações de métricas de adoção de Papaia ou Vinky. Os links de repositórios sem acesso confirmado não são apresentados como demos públicas.
