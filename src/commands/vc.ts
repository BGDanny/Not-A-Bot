import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";
import { DiscordTogether } from "discord-together";
import { client } from "..";

export default {
    data: new SlashCommandBuilder()
        .setName('vc')
        .setDescription('Create a Together event in VC')
        .addStringOption(option => option.setName('choose')
            .setDescription('Choose one')
            .setRequired(true)
            .addChoice("Youtube", "youtube")
            .addChoice("Chess", "chess")
            .addChoice("Betrayal", "betrayal")
            .addChoice("Fishington", "fishing")
            .addChoice("Letter Tile", "lettertile")
            .addChoice("Words Snack", "wordsnack")
            .addChoice("Doodle Crew", "doodlecrew")
            .addChoice("SpellCast", "spellcast")
            .addChoice("Awkword", "awkword")
            .addChoice("Poker", "poker")),
    async execute(interaction: CommandInteraction) {
        if (interaction.member instanceof GuildMember) {
            if (!interaction.member.voice.channelId) {
                await interaction.reply({ content: "Join a voice channel first", ephemeral: true });
                return;
            }
            const userInput = interaction.options.getString("choose")?.toLowerCase() as string;
            new DiscordTogether(client).createTogetherCode(interaction.member.voice.channelId, userInput).then(async (invite) => {
                interaction.reply(invite.code);
            });
        }
    },
};