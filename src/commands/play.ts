import { Command, PieceContext, Args } from "@sapphire/framework";
import { Message } from "discord.js";
import { player } from "..";
import { getVoiceConnection } from "@discordjs/voice";

export default class MusicCommand extends Command {
    constructor(context: PieceContext) {
        super(context);
    }

    async messageRun(message: Message, args: Args) {
        if (!message.member!.voice.channel) {
            message.reply("Join a voice channel first");
            return;
        }
        const connection = getVoiceConnection(message.guild!.id);
        if (connection) {
            message.reply("Something is playing already");
            return;
        }
        const urlPromise = await args.pickResult("string");
        if (urlPromise.error) {
            message.reply("An error occured");
            return;
        }
        let guildQueue = player.getQueue(message.guild!.id);
        if (!guildQueue) {
            guildQueue = player.createQueue(message.guild!.id);
        }
        await guildQueue.join(message.member!.voice.channel);
        await guildQueue.play(urlPromise.value)
            .then(() => message.reply("Song queued"))
            .catch(console.log);
    }
}