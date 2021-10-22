import { Message } from "discord.js";

export default {
    name: 'messageCreate',
    execute(message: Message) {
        if (message.content === "ratio" && message.reference) {
            message.react("❤");
            message.channel.messages.fetch(message.reference.messageId as string)
                .then(msg => msg.reply("assist <:getrekt:899038315326607432>"))
                .catch(e => console.log(e));
        }
    },
}