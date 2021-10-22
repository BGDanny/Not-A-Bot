import { SlashCommandBuilder } from "@discordjs/builders";
import { brawlerToId } from "../index";
import { CommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Get stats for a BS map')
        .addStringOption(option => option.setName('name').setDescription('Enter the name of a map').setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        console.log(interaction.options.getString("name"));
        console.log(brawlerToId);
        await interaction.editReply('Pong!');
        console.log("1");
    },
};