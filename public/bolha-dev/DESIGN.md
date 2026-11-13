# Bolha Dev

## Produto e intenção
Mural para as pessoas do grupo da Bolha Dev no WhatsApp encontrarem os perfis umas das outras. Público brasileiro, prioridade para celular. Superfície operate, V5 M2 D6, HTML/CSS/JS sem dependências. Referência funcional: https://vitrine-networking-eosin.vercel.app/.

## Sistema visual
Papel claro, tinta verde escura, post-its pastel e fita de papel. A leve rotação comunica o mural; não usar rotação em formulários ou controles. Os cards são o próprio conteúdo do produto. As seis cores são uma escolha pessoal do autor, não categorias. A fonte Space Grotesk nos títulos e a fonte DM Sans no texto. Sem fotografias fictícias ou métricas de comunidade inventadas. Os exemplos são explicitamente identificados.

```design-tokens
fonts: Space Grotesk, DM Sans, monospace, sans-serif
colors: #f8f7f2, #fffef9, #253426, #60665c, #dcded3, #d6ee83, #f4edb3, #dce9cb, #f0d8db, #d9e6ef, #f4dfc5, #e6def0, #9c302b
radii: 0, 6px, 12px, 50%
```

## Layout e interação
Conteúdo até 1248px; 3 colunas no desktop, 2 no tablet, 1 no celular. Espaçamento base 4px; rotação até 1.2 graus. Controles com foco visível. Dialog nativo para edição e informações. Hover curto de 180ms, desligado com reduced-motion. Busca tolera acentos; filtros são combináveis. Estado vazio com limpeza dos filtros.

## Decisões em 2026-11-12
- Implementar isolado em public/bolha-dev para preservar o portfólio e as alterações existentes do usuário.
- Iniciar com uma prévia local honesta, sem simular autenticação Google ou envio de denúncias.
- Incluir arroba do X e interesses; faculdade e curso são opcionais porque o público não se restringe a estudantes.
- Usar noindex como orientação aos buscadores, sem anunciar isso como controle de acesso.
