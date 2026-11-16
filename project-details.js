const screen = (file, caption, portrait = false) => ({ src: `/projects/gallery/${file}`, caption, portrait });

export const projectDetails = {
 papaia: {
  name: 'Papaia', subtitle: 'A rotina do consultório e o cuidado entre consultas, conectados.',
  paragraphs: [
   'O Papaia é uma plataforma para nutricionistas materno-infantis que reúne agenda, pacientes, anamnese e gestão financeira. A proposta é organizar a rotina do consultório e manter o acompanhamento próximo das famílias em um só lugar.',
   'No Conta Comigo, as famílias registram refeições, fotos e observações, enquanto o profissional acompanha a evolução e comenta os registros. O produto também organiza questionários pré-consulta e orientações por fase da vida.'
  ],
  technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'], note: 'Telas da aplicação em demonstração, com dados fictícios.',
  images: [screen('papaia-inicio.png', 'Visão geral do consultório'), screen('papaia-pacientes.png', 'Organização dos pacientes'), screen('papaia-financeiro.png', 'Gestão financeira')],
 },
 vinky: {
  name: 'Vinky', subtitle: 'Cada visita aproxima o cliente da próxima recompensa.',
  paragraphs: [
   'A Vinky é um aplicativo de fidelização para pequenos e médios negócios. Conecta estabelecimentos e clientes em uma jornada de visitas, pontos e recompensas, com áreas específicas para quem compra e para quem gerencia a loja.',
   'O cliente acompanha seu saldo e os benefícios disponíveis em cada estabelecimento. O lojista organiza o catálogo de recompensas, registra presenças por QR Code ou identificação do cliente e acompanha os resgates.'
  ],
  technologies: ['Flutter', 'Dart', 'PostgreSQL'], note: 'Aplicativo em desenvolvimento. Jornada de entrada e cadastro.',
  images: [screen('vinky-entrada.png', 'Escolha de perfil: cliente ou estabelecimento'), screen('vinky-acesso.png', 'Acesso ao aplicativo'), screen('vinky-cadastro.png', 'Cadastro de clientes')],
 },
 talentos: {
  name: 'Talentos Paraquett', subtitle: 'Um ponto de encontro entre profissionais e a escola.',
  paragraphs: [
   'O Talentos Paraquett é o banco de talentos do Colégio Paraquett. A página apresenta o processo de candidatura e reúne as informações de profissionais interessados em trabalhar na instituição.',
   'O cadastro é dividido em etapas: dados pessoais, perfil e interesses profissionais, e envio do currículo. O fluxo organiza formação, experiência e disponibilidade para futuras oportunidades, com uma experiência adaptada ao celular.'
  ],
  technologies: ['Nuxt', 'Vue', 'TypeScript'], note: 'Capturas da página pública de candidatura.',
  images: [screen('talentos-inicio.png', 'Apresentação do banco de talentos'), screen('talentos-cadastro.png', 'Formulário de candidatura'), screen('talentos-mobile.png', 'Experiência no celular', true)],
  url: 'https://talentos-pi.vercel.app/trabalhe-conosco', linkLabel: 'Visitar site',
 },
 oferta: {
  name: 'Oferta Re', subtitle: 'A operação de resseguro organizada do início à resposta do mercado.',
  paragraphs: [
   'O Oferta Re é uma plataforma para corretoras de resseguro gerenciarem propostas, renovações e ofertas ao mercado. Centraliza contatos, prazos, versões de ofertas e comprovantes em um ambiente compartilhado pela equipe.',
   'O produto nasceu de uma automação de consulta à SUSEP e evoluiu para acompanhar a operação comercial. Permite vincular renovações, preparar ofertas e registrar respostas das resseguradoras, mantendo o histórico de cada negociação.'
  ],
  technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Python'], note: 'Telas de demonstração com propostas e empresas fictícias.',
  images: [screen('oferta-propostas.jpg', 'Propostas e renovações'), screen('oferta-ofertas.jpg', 'Organização das ofertas'), screen('oferta-contatos.jpg', 'Contatos do mercado'), screen('oferta-consulta.jpg', 'Consulta de resseguradoras')],
 },
 insurminds: {
  name: 'InsurMinds', subtitle: 'Inteligência artificial para ler e comparar apólices D&O.',
  paragraphs: [
   'O InsurMinds transforma apólices em PDF ou imagem em informações estruturadas para análise. A IA extrai 16 critérios, como coberturas, limites e condições, mantendo os trechos e as páginas de origem para conferência.',
   'A plataforma permite consultar os documentos, comparar até quatro apólices lado a lado e exportar os resultados em PDF ou JSON. Desenvolvido em equipe no projeto final do I2A2, conecta leitura documental, consulta com IA e revisão das evidências em uma interface.'
  ],
  technologies: ['React', 'TypeScript', 'Python', 'Starlette', 'SQLite'], note: 'Demonstração com apólices fictícias e dados pré-preenchidos.',
  images: [screen('insurminds-painel.png', 'Visão geral e biblioteca de apólices'), screen('insurminds-evidencias.png', 'Critérios extraídos e evidências'), screen('insurminds-comparacao.png', 'Comparação de apólices lado a lado'), screen('insurminds-mobile.png', 'Consulta no celular', true)],
  url: 'https://github.com/vicTmm/i2a2-desafio-final', linkLabel: 'Ver repositório',
 },
 clima: {
  name: 'Clima Seguro', subtitle: 'Da previsão do tempo à comunicação preventiva no seguro.',
  paragraphs: [
   'O Clima Seguro cruza previsões meteorológicas com as coberturas dos clientes para identificar riscos de chuva, vento, tempestade e granizo. Quatro agentes organizam a coleta, a identificação dos eventos, a análise do risco e a comunicação.',
   'A aplicação consulta a API Open-Meteo, classifica o risco por regras explícitas e usa IA para redigir alertas. Também oferece cenários controlados, histórico e exportação em CSV. O protótipo simula o envio por SMS, WhatsApp e e-mail.'
  ],
  technologies: ['Python', 'Streamlit', 'Open-Meteo', 'IA generativa'], note: 'Cenário simulado com clientes fictícios. Alertas desta demonstração gerados pelo modelo local.',
  images: [screen('clima-painel.png', 'Configuração da análise climática'), screen('clima-risco.png', 'Classificação de risco por cobertura'), screen('clima-agentes.png', 'Etapas e decisões dos agentes'), screen('clima-alerta.png', 'Simulação dos canais de comunicação')],
  url: 'https://github.com/vicTmm/i2a2-desafio5', linkLabel: 'Ver repositório',
 },
};
