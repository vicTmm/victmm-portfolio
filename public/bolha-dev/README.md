# Mural Bolha Dev

Prévia navegável isolada do portfólio. Abra `/bolha-dev/index.html` no servidor existente após `npm run build` e `npm run dev`. Depois de editar os arquivos, execute o build novamente e recarregue a página.

## Disponível
- Seis perfis fictícios identificados, sem links para pessoas reais.
- Busca por nome, arroba, cidade, instituição, curso, texto e tags; filtros combinados por área e objetivo; ordem alfabética ou mais recentes (novo perfil local primeiro).
- Um perfil por navegador, com criação, edição, exclusão confirmada e persistência local.
- Links opcionais de LinkedIn, GitHub, Instagram e X, com validação HTTPS e escape de conteúdo.
- Layout responsivo, foco de teclado, dialogs nativos e preferência de movimento reduzido.
- Textos de combinados, privacidade e estado explícito de denúncia ainda não enviada.

## Antes de usar com a comunidade
Esta versão **não é um mural compartilhado**. Não há login Google, servidor, banco remoto ou moderação. Não usar localStorage para provar propriedade na versão pública.

Proposta de próxima implementação (ainda não configurada): autenticação Google via Supabase Auth e banco Postgres com RLS. Tabelas `profiles` (user_id único, campos públicos e timestamps) e `reports` (profile_id, reporter_id, motivo, status). A conta e o e-mail de autenticação ficam fora da consulta pública. RLS permite cada usuário criar/editar/apagar somente seu perfil; denúncias não são consultáveis publicamente. Aplicar validação no servidor, limites de escrita e regras de moderação. Definir se leitura exige login ou é pública antes de abrir.

Configurar projeto, credenciais OAuth e URLs de retorno; integrar login real; implementar fila de denúncias e acesso de moderadores; definir responsável e contato de privacidade; testar isolamento entre contas. Os links de exemplo não devem virar cadastros reais. Publicação e configuração de contas não foram feitas.

O meta robots pede não indexação. Ele não impede acesso ao site. Não foi criado robots.txt global para não afetar o SEO do portfólio.
