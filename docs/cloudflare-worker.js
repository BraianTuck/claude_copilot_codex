// Cloudflare Worker para bot de Telegram
// El BOT_TOKEN se configura en Cloudflare Dashboard > Worker > Settings > Variables (como Secret)

export default {
  async fetch(request, env) {
    const BOT_TOKEN = env.BOT_TOKEN;
    const SITE_URL = 'https://braiantuck.github.io/claude_copilot_codex/';

    if (request.method !== 'POST') {
      return new Response('Bot activo', { status: 200 });
    }

    try {
      const update = await request.json();
      const message = update.message;
      if (!message || !message.chat) return new Response('OK');

      const chatId = message.chat.id;
      const firstName = message.from?.first_name || 'Usuario';

      const responseText = `¡Hola ${firstName}! 👋\n\n🔑 Tu Chat ID es:\n\n${chatId}\n\n📋 Copiá ese número y pegalo en la web:\n${SITE_URL}`;

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: responseText }),
      });

      return new Response('OK');
    } catch (err) {
      return new Response('OK');
    }
  },
};
