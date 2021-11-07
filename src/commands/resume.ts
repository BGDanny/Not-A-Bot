import { Command, PieceContext } from "@sapphire/framework";
import { Message } from "discord.js";
import { player } from "..";

export default class MusicCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            name: "resume",
            aliases: ["r"],
        });
    }

    async messageRun(message: Message) {
        if (!message.member!.voice.channel) {
            message.reply("Join a voice channel first");
            return;
        }
        let guildQueue = player.getQueue(message.guild!.id);
        if (!guildQueue)
            return;
        guildQueue.setPaused(false);
    }
}