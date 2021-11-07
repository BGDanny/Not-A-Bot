import { Command, PieceContext } from "@sapphire/framework";
import { Message } from "discord.js";
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";
import path from "path";
import { player as musicPlayer } from "..";

export default class MusicCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            name: "india",
        });
    }

    async messageRun(message: Message) {
        if (!message.member!.voice.channel) {
            message.reply("Join a voice channel first");
            return;
        }
        let guildQueue = musicPlayer.getQueue(message.guild!.id);
        if (guildQueue) {
            message.reply("Stop the music player first");
            return;
        }
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: message.member!.voice.channel.id,
            guildId: message.guild!.id,
            //@ts-ignore
            adapterCreator: message.guild!.voiceAdapterCreator,
        });
        const resource = createAudioResource(path.join(__dirname, "..", "assets", "funny_indian.mp3"));
        player.play(resource);
        connection.subscribe(player);
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }
}