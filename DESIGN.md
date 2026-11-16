# Victor Hugo · Portfólio

## Identidade e conteúdo

Título principal começa em **Desenvolvedor de Automação** e alterna, por solicitação do Victor, nesta ordem: **Desenvolvedor de Automação**, **AI Builder** e **Atuário**, com efeito de digitação e apagamento. Victor está se formando e prefere dar destaque ao trabalho com IA. Não usar “engenheiro de software”. Apresentação: “Na interseção entre tecnologia, criatividade e funcionalidade, desenvolvo produtos digitais, automações e soluções com IA que fazem a diferença na prática.” Destacar em negrito “tecnologia, criatividade e funcionalidade”.

O título reserva a altura da maior frase para evitar deslocamentos, inclusive no celular. Leitores de tela recebem a lista completa uma vez, sem anunciar letras. A digitação permanece ativa por solicitação expressa do Victor, inclusive com movimento reduzido; nesse caso, apenas o cursor deixa de piscar. A animação pausa quando a página fica oculta.

Nome completo Victor Hugo, marca com monograma `VH`, GitHub, LinkedIn e Instagram @victorhgms. Exibir somente os ícones sociais, sem “Me siga em”. Não publicar currículo ou oferecer download. O PDF original está preservado fora do diretório público em `references/source-documents/`.

## Aparência

```design-tokens
background: #100e13
surface: #1a171f
text: #f0edf3
muted: #aaa6b4
border: #39313f
accent: #99a8c4
violet: #9a86b6
steel: #8196b5
heading-font: Manrope
body-font: DM Sans
```

Paleta grafite, azul aço e violeta fechado. Entrada inspirada na referência enviada: cabeçalho de 72 px, bloco central de até 780 px, retrato compacto à esquerda do título, descrição abaixo e ações/redes sociais na mesma faixa. Hero ocupa a primeira tela. Grade sutil sobre luzes amplas: violeta, azul e âmbar no escuro; coral, rosa e azul no claro, conforme as referências de tema enviadas. Movimento ambiente desativado com movimento reduzido.

Marca violeta com símbolo de código à esquerda do nome, sem sufixo `.dev`. Navegação com texto forte e claro no escuro. Ícones oficiais Feather v4.29.2 incorporados localmente como símbolos SVG nas duas páginas, sem CDN ou JavaScript adicional. Monitor, layers e cpu representam os cards de atuação, com traços violetas que acompanham o avatar. Licença MIT em `public/licenses/feather-LICENSE.txt`. Supabase e Gemini não aparecem na lista de ferramentas.

“Vamos conversar” é a ação principal, com preenchimento roxo fechado, borda violeta e sombra moderada. “Explorar projetos” permanece contornado e abre `/projetos`. Sem ícones de ferramentas ao redor do avatar.

Revisão local da unidade cromática: a interface usa violeta como único acento. Ações primárias, envio do formulário e filtros selecionados compartilham `--action` (`#705091` no escuro, `#684589` no claro), com texto branco. Hover usa `#805da3` / `#563770`. Nome, título animado, marca e título de contato usam `--brand-heading` (`#b69ad5` / `#684589`). Secundários neutros com hover violeta; textos de apoio neutros. Azul fica nos fundos ambientes e marcas dos projetos; verde é reservado ao WhatsApp. Navegação mantém sua cor neutra inclusive na seção ativa. Esta revisão aguarda aprovação antes de novo deploy.

Refino local: modal dos cases no escuro em grafite neutro `#141217`, borda `#574560`, subtítulos violetas e parágrafos cinza neutro. Contato com primeira linha menor e neutra; “Vamos construir.” maior em violeta. WhatsApp é a ação preenchida principal, e-mail secundário; ícone branco no botão preenchido para contraste. Ícones sociais de 23 px, ícones dos botões do hero de 20 px (19 no celular), com mais espaço entre links. Revisão ainda apenas local.

## Avatar e favicon

Avatar ativo: `public/victor-avatar-3d-compact.png`. Retrato 3D de proporções naturais, expressão tranquila, olhos castanhos com esclera branca, pescoço mais curto, camisa azul listrada e fundo circular roxo integrado. O CSS mantém o rosto inteiro e não desenha um segundo disco. Geração com ferramenta integrada, prompts e versões em `docs/avatar-option-3d.md`.

Favicon nas duas páginas: `public/favicon-avatar.png`, exatamente a ilustração enviada pelo Victor. Versões de avatar anteriores preservadas.

## Páginas

- `/`: apresentação, três cards de atuação e contato. Cards: O que eu construo, Ferramentas que uso e IA & automação. A página inicial não carrega o JavaScript dos projetos.
- `/projetos`: seis cards, filtros e diálogos. InsurMinds, Oferta Re, Papaia, Vinky, Talentos Paraquett e AutoQuote. Acesso direto com ou sem barra final.

Oferta Re, Papaia e Vinky mostram “Site em breve” desabilitado e não têm links para GitHub em cards ou diálogos. Capas em `public/projects/`, com origem no README da pasta. Papaia usa a logo creme de massinha enviada sobre verde escuro. Oferta Re usa nome e mascote original, sem print da interface. Talentos usa nome e logo do site da escola. InsurMinds e AutoQuote têm capas vetoriais próprias com escudo e conversa, em verde e azul. São composições de apresentação, não capturas de interfaces. Supabase e Gemini não aparecem nos cards nem nos textos dos cases, por solicitação do Victor; dependência de chave e cota de IA continua informada de forma genérica.

## Tema, movimento e contato

Seletor com ícones vetoriais finos de sol/lua e menu Claro, Escuro e Sistema. Escolha salva localmente; Sistema acompanha `prefers-color-scheme`. Abertura por teclado, setas, Home/End, Escape e fechamento fora do menu. Ícone faz rotação e transição de opacidade na troca. Respeitar movimento reduzido.

Contato em painel amplo, texto à esquerda e formulário à direita, com ondas vetoriais discretas. No celular, conteúdo empilhado. O formulário prepara um `mailto:` e informa que o envio ocorre no aplicativo do visitante. Não simular envio ou backend.

Endereço de e-mail não aparece como texto: usar a ação “Enviar e-mail”. WhatsApp comercial autorizado pelo Victor: `https://wa.me/5521992618157`, em ação própria, sem exibir o número solto. O e-mail permanece no destino `mailto:` e no funcionamento do formulário; não prometer ocultação do código-fonte.

Versões anteriores em `references/`; o arcade permanece em `/arcade.html`. A pasta `public/bolha-dev` de outra sessão está preservada. Nenhum número de proficiência ou resultado inventado.

Navegação do cabeçalho mantém a mesma cor no hover, clique e seção ativa, em ambos os temas. Preservar `aria-current` e foco visível para teclado.

### Paleta dos textos no modo claro

Grafite violeta `#272535` para texto principal, `#5d5b70` para apoio e `#634580` para acentos. Nome em `#624180`, título rotativo em `#553b72` e descrição em `#363345`. Contato combina violeta profundo com azul `#435f82`; campos usam texto de placeholder `#716b7f` sem redução de opacidade. Ícones sociais deixam de herdar azuis pálidos do tema escuro. Categorias, tags e diálogos dos projetos seguem os mesmos tokens. Botão principal com texto branco sobre violeta/azul mais profundo, inclusive no hover. Regras restritas ao tema claro.

Assinatura visual local: monograma VH vetorial, com diagonal compartilhada entre V e H. Nome empilhado em VICTOR (menor, espaçado) e HUGO (maior, peso 800); cor neutra na primeira linha e violeta na segunda. Aplicado ao cabeçalho e rodapé nas duas páginas. Monograma reutilizável em `public/brand/vh-monogram.svg`. Favicon enviado pelo Victor permanece preservado. Esta proposta aguarda avaliação local.

Proposta local de mascote: substitui monograma VH por Victor Bot, silhueta original em `public/brand/victor-bot.json` validada por `validateAvatar`, fallback SVG e renderer open-bot-avatar 0.2.1 de Dominik Scholz (MIT). Nome legível ao lado; avatar humano e favicon preservados. Mascote segue o cursor, pisca e reage ao hover/foco. Respeita movimento reduzido do sistema. Dependência fixada no package-lock; cópia local do renderer, sem CDN. Licença em public/licenses. Apenas local, sem deploy.

Ajuste da assinatura: manter mascote e somente as iniciais VH ao lado, sem nome por extenso no cabeçalho e rodapé. Nome completo da apresentação permanece. Apenas local.

## Galerias dos projetos — 16/11/2026

A página de projetos usa `project-details.js` para descrições curtas do produto e galerias de 3–4 telas reais. O botão Conhecer abre um diálogo amplo: galeria à esquerda, resumo e tecnologias à direita; empilhado no celular. Setas, indicadores, teclado e abertura da imagem original. Sem rotação automática. AutoQuote substituído por Clima Seguro (`vicTmm/i2a2-desafio5`). Fontes e contexto das capturas em `public/projects/README.md`. Somente local, aguardando autorização de deploy.

### 16/11/2026: detalhes estruturais sem azul

Bordas, divis?rias, contornos pontilhados e grades compartilham os tokens violeta-grafite. Escuro: fundo #100e13, superf?cie #1a171f, linha #39313f. Claro: fundo #f8f6fa, superf?cie #efebf3, linha #d6cedf. Cards de atua??o e projetos usam superf?cies neutras com leve matiz violeta. Ondas de contato e foco seguem o acento; cores pr?prias das capas e capturas dos produtos permanecem. Corre??o solicitada pelo Victor, apenas local.

### 16/11/2026: arte de abertura dos projetos

A vitrine passa a ter uma trama vetorial pr?pria: 18 curvas cont?nuas, uma faixa transl?cida e quatro pontos de luz discretos, acompanhando o t?tulo at? a primeira linha de trabalhos. Violeta, rosa e ?mbar no escuro; lil?s e rosa no claro. Cores controladas por tokens --flow-*, com desvanecimento antes das capas e composi??o recortada para celular. SVG decorativo, sem interceptar cliques e oculto de leitores de tela. Arte est?tica, sem depend?ncias ou m?dia adicional. Layout e hierarquia existentes preservados, com mais espa?o no cabe?alho. Validado em 1440, 768 e 390 px, nos dois temas; cards e galerias continuam operantes. Apenas local.

### 16/11/2026: busca e densidade da vitrine

Toolbar inspirada na refer?ncia do Victor: busca por nome, texto e tecnologia, combinada com a categoria selecionada, e seletor visual de 2?5 colunas (3 por padr?o). Busca ignora caixa e acentos, aceita m?ltiplos termos e oferece recupera??o quando n?o h? resultados. Prefer?ncia de colunas salva localmente com fallback se o armazenamento estiver indispon?vel. Limites de densidade: 5 a partir de 1400 px, 4 a partir de 1150, 3 a partir de 900, 2 a partir de 600, 1 no celular. No celular o seletor fica oculto; busca continua dispon?vel. Controles com nomes acess?veis, estado pressionado e foco vis?vel no cont?iner da busca. Sem pagina??o ou projetos fict?cios.

### 16/11/2026: cabe?alho centralizado

No desktop, cabe?alho limitado a 1080 px com tr?s colunas sim?tricas: bot + VH ? esquerda, navega??o no centro exato da tela e tema ? direita. Marca alinhada mais para dentro em rela??o ao cabe?alho anterior. Aplicado ?s duas p?ginas; navega??o de celular preservada. Apenas local.

### 16/11/2026: cards com capa inteira e acompanhamento do cursor

Cards passam a usar capa inteira com t?tulo sobre degrad? escuro. Hover e foco de teclado aproximam a imagem em 7,5% e revelam descri??o, tecnologias e acesso externo. A altura da ?rea revelada ? medida por ResizeObserver para o t?tulo permanecer vis?vel antes da intera??o. Celular e dispositivos sem hover mostram as informa??es diretamente; movimento reduzido elimina zoom e transi??es. Bot?o no t?tulo abre a galeria por teclado, clique no card tamb?m abre, links externos continuam independentes. Validado com 2?5 colunas e em celular, sem recorte do resumo. T?tulo da p?gina alterado para ?Projetos que desenvolvi.?.

O olhar do bot usa alcance proporcional ao espa?o dispon?vel em cada lado da marca, evitando satura??o prematura quando o cursor se desloca ? direita da tela. Mant?m suaviza??o, piscadas e respeito ao movimento reduzido do renderer, sem modificar c?digo de terceiros. Conferido no canvas com cursor ? esquerda, ao centro e em dois pontos ? direita: deslocamento dos olhos progride em dire??o ao cursor. Tudo apenas local.

### 16/11/2026: zoom explicitamente ativo com movimento reduzido

Victor confirmou que quer a aproxima??o dos cards mesmo com prefers-reduced-motion ativo no sistema. Exce??o restrita ao zoom da capa: escala 1,12 com transi??o de 650 ms no hover/foco. Os outros efeitos continuam respeitando movimento reduzido. A regra anterior anulava transform e transition, causando a aus?ncia do motion relatada.

### 16/11/2026: capas resistentes ? densidade

Vinky passa a usar `public/projects/vinky-cover.svg`, composi??o ?nica com logo, legenda e mascote incorporadas. Todos os elementos escalam no mesmo viewBox, eliminando a colis?o entre legenda e wordmark na grade de duas colunas. As seis capas usam imagens proporcionais com object-fit: contain. Validadas nas quatro op??es de densidade e no celular, sem transbordamento. Zoom da capa preservado. Apenas local.

### 16/11/2026: capas, olhar bilateral e curtidas

Talentos: texto come?a em x=520, ap?s o c?rculo de raio 197 com centro x=264. Oferta Re: texto come?a em x=560, ap?s o c?rculo externo de raio 248 com centro x=265. Os grupos permanecem inteiros no viewBox 1200 ? 700.

O ajuste de alcance do bot n?o resolvia sozinho: com movimento reduzido o renderer preservava yaw=-0,3 da pose de repouso. A view agora compensa yaw e pitch nessa prefer?ncia, mantendo a face frontal e movimento ocular bilateral. Confer?ncia em frames separados do canvas confirmou deslocamento sim?trico de -1,1136 e +1,1136 px dos olhos em rela??o ao corpo. C?digo do fornecedor preservado.

Victor escolheu like no site sem login. CTA discreto no centro do rodap?, nas duas p?ginas, com cora??o, texto e contador real. No celular passa para segunda linha. Estados de carregamento, curtido, falha e agradecimento t?m feedback acess?vel. Conta por navegador via cookie an?nimo; permite retirar o voto. Backend SQLite em Durable Object, com origem validada e opera??es idempotentes. Testes locais e pacote de deploy validados, sem publica??o.

### 16/11/2026: bot nos convites e na comemora??o

?Vamos conversar? recebe um companheiro com o mesmo bot e mensagem curta, revelado no hover ou foco; clique continua indo para contato. Ao confirmar uma curtida no servidor, o evento portfolio:liked mostra um agradecimento fixo no centro inferior da tela, com bot maior e feliz, confetes e texto. A implementa??o ? compartilhada nas duas p?ginas. Fecha com bot?o, Escape, retirada da curtida ou automaticamente ap?s 5,5 s; n?o rouba foco. Movimento reduzido mant?m a mensagem e os detalhes est?ticos. Posicionamento e dimens?es adaptados ao celular e aos dois temas. Nenhuma comemora??o ao apenas carregar um voto salvo.

### 16/11/2026: tr?s comemora??es exclusivas da curtida

Agradecimento reduzido a ?Valeu pela curtida!?. Bot maior saltando acima do painel e tr?s coreografias alternadas em sequ?ncia por sess?o: salto com giro completo, dan?a lateral e pirueta 3D. Web Animations API com antecipa??o, squash/stretch, salto, aterrissagem e recupera??o em 2,2 s. Pool fixo de 36 confetes geom?tricos em tr?s rajadas e trajet?rias bal?sticas determin?sticas, sem depend?ncias extras. Encerramento cancela todas as anima??es; repetir a intera??o reutiliza o pool.

A anima??o festejante foi pedida expressamente ap?s o feedback de repeti??o do bot. Exce??o de movimento restrita ? curtida, inclusive com prefers-reduced-motion ativo no computador do Victor. O restante mant?m as prefer?ncias anteriores. No convite o bot assume express?o curiosa, distinta da festa. Mesmo comportamento compartilhado em todas as p?ginas, fechamento autom?tico em 5,8 s ou manual.

### 16/11/2026: apresenta??o e op??es de mascote

Apresenta??o alterada para ?Ol?, sou o Victor Hugo.?, com o artigo pedido pelo Victor. Proposta local principal: l?mpada em amarelo quente #e5bd61, para contrastar com a identidade violeta. Defini??o exatamente como fornecida pelo Victor, validada pelo pacote. Controle tamb?m preserva o JSON enviado; livro e foguete s?o estudos locais validados. Arquivos e origem em public/brand/mascots/README.md. Bot original arquivado na mesma pasta. Pr?vias locais via ?mascote=lightbulb|controller|book|rocket. Nenhum seletor acrescentado ? interface p?blica. Olhar parte da posi??o dos olhos de cada defini??o, sem coordenada fixa da cabe?a anterior. Cabe?alho, rodap?, convite e agradecimento usam a mesma escolha. A proposta ainda ? local, sem deploy.

Escolha confirmada pelo Victor: l?mpada amarelinha como mascote principal, substituindo o bot anterior em todos os pontos do site.

### 16/11/2026: assinatura gr?fica VH

VH substitui a apar?ncia de texto tipografado por lettering vetorial pr?prio em public/brand/vh-lettermark.svg: duas letras geom?tricas inclinadas, hastes largas e recortes definidos. Aplicado como m?scara de um degrad? violeta em tr?s tons, com vers?o mais clara no escuro e mais profunda no tema claro. Sem fonte ou requisi??o externa nova. L?mpada amarela preservada. Cabe?alho: 64 ? 32 px, 58 ? 29 no celular; rodap? menor. Navega??o continua centralizada. Nome acess?vel expl?cito nos links de marca. Validado em 1440, 768 e 390 px, nos dois temas. Solicita??o de degrad? restrita ? marca, sem alterar os t?tulos. Apenas local.

### 16/11/2026: retorno, textos e alinhamento final

Link de retorno em botão contornado com seta vetorial, alvo de clique de 40 px e estados de hover/foco. Título da vitrine: Meus projetos. Apoio: Aplicações, automações e soluções com IA. Contato: ENTRE EM CONTATO no texto acima do convite, evitando repetir Vamos conversar.

Comemoração fecha ao pressionar fora do painel, preservando interações internas e o clique no botão de curtir. Rodapé alinha marca, botão de curtida e retorno ao topo pelo mesmo centro vertical. Texto de convite e feedback da curtida ficam ancorados acima/abaixo do controle, sem deslocar os outros elementos. Celular mantém segunda linha para a curtida. Validado em 1440, 768 e 390 px, sem transbordamento. Apenas local.

### 16/11/2026: contato com caminhos de envio acessíveis

WhatsApp inclui mensagem inicial editável. Botão e formulário de e-mail abrem seletor com Gmail, Outlook, aplicativo local e cópia da mensagem. O contato deixa de depender exclusivamente de protocolo mailto instalado no dispositivo. Formulário informa a etapa de revisão; nenhuma confirmação de envio é simulada. Diálogo segue superfícies e bordas da interface, acessível por teclado e adaptado ao celular. Documentado em docs/contact.md. Apenas local.

### 16/11/2026: copy de IA e contato

Card IA & automação: Documentos transformados em dados estruturados; Respostas de IA com fontes verificáveis. Explicam o resultado da extração e a possibilidade de conferir as fontes. Contato: Uma ideia em mente? / Vamos construir. Apoio: Me conta sobre seu projeto, o desafio que precisa resolver ou a oportunidade que quer compartilhar. Placeholder: Fale sobre o projeto, a oportunidade ou sua dúvida. Evita repetir em mente na mesma seção. Apenas local.

### 16/11/2026: fala do agente sem sobrepor a apresentação

No início, o balão de Vamos conversar se ancora ao bloco inteiro de ações/redes sociais e abre 14 px abaixo dele. O botão não se transforma no hover, evitando criar outro contexto de posicionamento. Assim o balão não cobre a descrição, os botões nem os ícones, inclusive com as redes em outra linha no celular. Projetos preserva seu posicionamento anterior. Validado em 1440, 768 e 390 px. Apenas local.

### 16/11/2026: retirada da fala no início e publicação autorizada

Por pedido do Victor, o botão Vamos conversar do início deixa de mostrar o balão do agente. Mantém seu link de contato. As demais interações, incluindo a comemoração da curtida, permanecem. Victor autorizou subir as alterações ao GitHub e publicar na Cloudflare.
