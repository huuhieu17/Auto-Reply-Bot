import TelegramBot from "node-telegram-bot-api";
import { findAnswerByQuestion } from "../../services/message.js";

function initBot() {
    const bot = new TelegramBot(process.env.TELEGRAM_KEY, { polling: true });
    bot.onText(/./g, async (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
        const chatId = msg.chat.id;
        const text = msg.text;
        const message = await findAnswerByQuestion(text);
        if(message){
            bot.sendMessage(chatId, message.answer, {
                reply_to_message_id: msg.message_id
            });
        }
        // send back the matched "whatever" to the chat
       
    });

    // // Listen for any kind of message. There are different kinds of
    // // messages.
    // bot.on('message', (msg) => {
    //     console.log(msg)
    //     const chatId = msg.chat.id;

    //     // send a message to the chat acknowledging receipt of their message
    //     bot.sendMessage(chatId, 'Received your message');
    // });
}

export default initBot;