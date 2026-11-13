# Ícones 3D

Biblioteca solicitada pelo usuário: 3dicons, de Vijay Verma.

- Figma fornecido: https://www.figma.com/design/EdmS4t2BVXqmETp4lPJftN/3dicons---Open-source-3D-icon-library--Community-?node-id=0-1
- Site oficial: https://3dicons.co/
- Fonte dos metadados: https://github.com/realvjy/3dicons/tree/develop/content/3dicons-meta
- Licença da distribuição aberta: CC0, copiada para `public/icons-3d/LICENSE.txt`.

Os arquivos foram obtidos da distribuição oficial da mesma biblioteca, não exportados pelo Figma. O MCP remoto Figma foi configurado e o login OAuth concluído. As ferramentas do servidor ainda não estavam expostas à conversa na implementação.

## Arquivos oficiais utilizados

Padrão de origem: `https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/{nome}-dynamic-color.png`

Nomes: `sun`, `moon`, `computer`, `bulb`, `rocket`. Copiados sem edição para `public/icons-3d/`.

## Movimento

O botão não tem caixa, borda ou fundo. Os renders do sol e da lua fazem trajetórias opostas com rotação, deslocamento e escala; o conjunto faz uma pequena inclinação 3D com retorno. As preferências de tema são preservadas. Movimento reduzido do sistema substitui a trajetória por uma transição curta de opacidade.
