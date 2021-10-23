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
        await interaction.deferReply();
        const userInput = interaction.options.getString("name")?.toLowerCase() as string;
        const resultIndex = findBestMatch(userInput, mapNames).bestMatchIndex;
        const map = await getMap(mapIds[resultIndex]);
        let message = new MessageEmbed();
        if (map) {
            let brawlerPick = "";
            let teamComp = "";
            if (map.stats.length > 10 && map.teamStats.length > 10) {
                map.teamStats.sort((first, second) => {
                    return second.data.winRate - first.data.winRate;
                });
                for (let i = 0; i < 10; i++) {
                    brawlerPick += `${brawlerIdToNames[map.stats[i].brawler]}: ${Math.round(map.stats[i].winRate)}%\n`;
                    teamComp += `${map.teamStats[i].name}: ${Math.round(map.teamStats[i].data.winRate)}%\n`;
                }
            } else {
                brawlerPick = teamComp = "N/A";
            }
            message
                .setTitle(map.name)
                .setThumbnail(map.imageUrl)
                .setURL(map.link)
                .addField("Top Brawler Win Rate", brawlerPick)
                .addField("Top Team Win Rate", teamComp)
                .setTimestamp()
                .setFooter(map.gameMode.name, map.gameMode.imageUrl);
        }
        await interaction.editReply({ embeds: [message] });
    },
};