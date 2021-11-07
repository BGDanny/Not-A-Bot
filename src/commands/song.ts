import { Command, PieceContext } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { player } from "..";

export default class MusicCommand extends Command {
    constructor(context: PieceContext) {
        super(context);
    }

    async messageRun(message: Message) {
        if (!message.member!.voice.channel) {
            message.reply("Join a voice channel first");
            return;
        }
        let guildQueue = player.getQueue(message.guild!.id);
        if (!guildQueue)
            return;
        const nowPlaying = guildQueue.nowPlaying;
        const messageEmbed = new MessageEmbed();
        messageEmbed
            .setTitle(nowPlaying.name)
            .setDescription(guildQueue.createProgressBar().prettier)
            .setThumbnail(nowPlaying.thumbnail)
            .setURL(nowPlaying.url);
        message.reply({ embeds: [messageEmbed] });
    }
}