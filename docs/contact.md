# Contato

O WhatsApp abre uma conversa com a mensagem: “Olá, Victor! Vi seu portfólio e gostaria de conversar sobre uma oportunidade ou projeto.” A mensagem é editável no WhatsApp antes do envio.

O botão de e-mail e o formulário abrem um diálogo com Gmail, Outlook, aplicativo instalado e cópia da mensagem. O formulário preserva nome, e-mail para retorno, assunto e mensagem. A pessoa revisa e envia em seu próprio serviço de e-mail. Não há disparo automático nem confirmação simulada de entrega.

O fluxo está em `contact.js`, carregado somente na página inicial. URLs de composição usam parâmetros codificados para preservar acentos, quebras de linha e caracteres como `&`. A cópia usa Clipboard API; se não estiver disponível, seleciona o texto e orienta a cópia manual. O diálogo fecha pelo botão, Escape ou clique fora.

O formulário não envia dados a um servidor do portfólio. Nenhum teste desta implementação disparou e-mails ou mensagens de WhatsApp.
