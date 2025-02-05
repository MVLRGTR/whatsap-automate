const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Criar cliente com sessão salva para não precisar escanear sempre
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Exibir QR Code para login no WhatsApp Web
client.on('qr', (qr) => {
    console.log('📌 Escaneie este QR Code para conectar ao WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('✅ Bot conectado e pronto para enviar mensagens!');
});

// Função para enviar mensagem para um usuário
const enviarMensagem = async (numero, mensagem) => {
    try {
        let chatId = `${numero}@c.us`; // Número no formato correto
        await client.sendMessage(chatId, mensagem);
        console.log(`📩 Mensagem enviada para ${numero}`);
    } catch (error) {
        console.error("❌ Erro ao enviar mensagem:", error);
    }
};

// Escutar mensagens recebidas
client.on('message', async (msg) => {
    console.log(`📨 Mensagem recebida de ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase().includes("oi")) {
        await client.sendMessage(msg.from, "Olá! Como posso te ajudar?");
    } else if (msg.body.toLowerCase().includes("ajuda")) {
        await client.sendMessage(msg.from, "Claro! Me diga como posso ajudar.");
    } else {
        await client.sendMessage(msg.from, "Desculpe, não entendi. Tente dizer 'Oi' ou 'Ajuda'.");
    }
});

client.initialize();

// Teste automático de envio de mensagem após 5 segundos
setTimeout(() => {
    enviarMensagem("5571992944856", "Oi! Esse é um teste de mensagem automática do chatBot! 🚀")
    console.log('entrou aqui ')
}, 10000);
