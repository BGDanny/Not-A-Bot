import { SlashCommandBuilder } from "@discordjs/builders";
import { mapIds, mapNames, brawlerIdToNames } from "../index";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { findBestMatch } from "string-similarity";
import { getMap } from "../api";

export default {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Get stats for a BS map')
        .addStringOption(option => option.setName('name').setDescription('Enter the name of a map').setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: interaction.channelId !== "898783957452193812" });
        const userInput = interaction.options.getString("name")?.toLowerCase() as string;
        const resultIndex = findBestMatch(userInput, mapNames).bestMatchIndex;
        const map = await getMap(mapIds[resultIndex]);
        const message = new MessageEmbed();
        if (map) {
            let brawlerPick = "";
            if (map.stats.length > 20) {
                for (let i = 0; i < 20; i++) {
                    brawlerPick += `${brawlerIdToNames[map.stats[i].brawler]}: ${Math.round(map.stats[i].winRate)}%\n`;
                }
            } else {
                brawlerPick = "N/A";
            }
            message
                .setTitle(map.name)
                .setThumbnail(map.imageUrl)
                .setURL(map.link)
                .addField("Top Brawler Win Rate", brawlerPick)
                .setTimestamp()
                .setFooter(map.gameMode.name, map.gameMode.imageUrl);
        }
        await interaction.editReply({ embeds: [message] });
    },
};