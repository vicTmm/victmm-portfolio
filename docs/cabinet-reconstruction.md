# Reconstrução do Cabinet

Referência: https://motionin.design/gallery/cabinet. Ferramenta pedida: https://github.com/morluto/rea. Investigação em 12/11/2026.

## Método

1. Inspeção do estado inicial, janela aberta e controles no navegador do Orca.
2. Coleta do HTML e dos chunks JavaScript públicos do próprio site em `tmp/cabinet/`.
3. Instalação isolada de `rea-agents@6.9.0` e `node@24.22.1` no cache npm. O Node do projeto não foi substituído e o site não depende do REA.
4. Análise estática dos dois chunks selecionados com `analyze-javascript-application`, sem executar o bundle da referência. A evidência gerada está em `tmp/cabinet/rea-evidence`; resumo em `tmp/cabinet/rea-summary.json`.
5. Leitura dos trechos públicos correspondentes ao Canvas, às molas e aos eventos, seguida de implementação própria em HTML, CSS e JavaScript.

Comando da análise (substituir caminhos absolutos conforme o ambiente):

```text
rea analyze-javascript-application C:/Projetos/victmm-portfolio/tmp/cabinet --source-path chunk-14.js --source-path chunk-10.js --max-semantic-nodes 2500 --max-semantic-unknowns 1000 --detail summary --evidence_output C:/Projetos/victmm-portfolio/tmp/cabinet/rea-evidence --format json
```

Resultado: 2 arquivos JavaScript analisados, 90.613 bytes, 20.082 nós AST visitados, 69 findings e nenhuma falha de parsing. Evidence ID: `ev_cfef08c32dfaf7e39ea0733bd1e0c6a9565cd8311d89c9e980f7cadd3d8ee32c`.

O REA trabalha com observações estáticas: não garante equivalência de execução ou completude. O grafo semântico foi limitado a 2.500 nós e 1.000 desconhecidos; outros 15 arquivos inventariados ficaram fora da seleção. A confirmação dos estados de interface foi feita separadamente no navegador.

## O que foi reconstruído

| Referência observada | Implementação local |
|---|---|
| Tela arredondada CRT, papel e scanlines | `.screen` e `.scanlines` |
| Paisagem pixelada com ilhas e nuvens | Canvas `.landscape` |
| Alfabeto raster e letras com movimento independente | Canvas `.title-canvas`, bitmap 5×7 e molas |
| Molas com impulso ao entrar na área da letra | Rigidez 190, amortecimento 11, impulso e movimento senoidal |
| Janela com retrato e painel lateral | `.window`, `.profile`, `.resume-content` |
| Abas, seleção e teclado | Setas, WASD, números 1–4, Enter e Escape |
| Joysticks físicos vermelhos | Elementos CSS com brilho, haste, base e estado pressionado |

`replica.html` é um estudo com personagem fictício; `index.html` adapta o mesmo sistema ao Victor. O desenho da paisagem, os glifos, o retrato e o conteúdo diferem da referência. Não é uma cópia pixel a pixel nem usa os componentes React originais. Não foram incluídos navegação comercial, login ou controles da galeria Motion.

## Validação

Build estático; abertura e fechamento com restauração de foco; sete projetos selecionáveis e respectivos diálogos; três entradas de automação, incluindo Oferta Re; quatro grupos de ferramentas; teclado; troca de tema com ícone correto; Canvas pintado mesmo em aba oculta. Inspeção visual em desktop e em 390×844. As versões anteriores e arquivos de outras sessões foram preservados.
