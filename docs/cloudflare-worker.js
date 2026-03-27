// Cloudflare Worker para bot de Telegram
// Responde automáticamente con el Chat ID del usuario

const BOT_TOKEN = '8337214917:AAGy0B95qQItjRvEP55TC7kqq6IYH3AvMAA';
const SITE_URL = 'https://braiantuck.github.io/claude_copilot_codex/';

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Bot activo', { status: 200 });
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (!message || !message.chat) {
        return new Response('OK', { status: 200 });
      }

      const chatId = message.chat.id;
      const firstName = message.from?.first_name || 'Usuario';
      const text = message.text || '';

      let responseText;

      if (text === '/start' || text === '/id') {
        responseText = `¡Hola ${firstName}! 👋

🔑 Tu Chat ID es:

\`${chatId}\`

📋 Copiá ese número y pegalo en la web para recibir notificaciones de:

🎬 Nuevos videos de YouTube
📝 Posts de LinkedIn

🔗 ${SITE_URL}`;
      } else {
        responseText = `Tu Chat ID es: \`${chatId}\`

Copialo y pegalo en la web: ${SITE_URL}`;
      }

      // Enviar respuesta
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: responseText,
          parse_mode: 'Markdown',
        }),
      });

      return new Response('OK', { status: 200 });
    } catch (err) {
      console.error('Error:', err);
      return new Response('OK', { status: 200 });
    }
  },
};
