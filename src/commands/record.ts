import { SlashCommandBuilder } from "@discordjs/builders";
import { brawlerNames, brawlerIds } from "../index";
import { ColorResolvable, CommandInteraction, MessageEmbed, EmbedFieldData } from "discord.js";
import { findBestMatch } from "string-similarity";
import { getRecords, getBrawler } from "../api";

export default {
    data: new SlashCommandBuilder()
        .setName('record')
        .setDescription('Get the record for a BS brawler')
        .addStringOption(option => option.setName('name').setDescription('Enter the name of a brawler').setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const userInput = interaction.options.getString("name")?.toLowerCase() as string;
        const resultIndex = findBestMatch(userInput, brawlerNames).bestMatchIndex;
        const brawlerId = brawlerIds[resultIndex];
        const brawler = await getBrawler(brawlerId);
        const bralwerRecords = await getRecords();
        let message = new MessageEmbed();
        if (brawler && bralwerRecords) {
            let bralwerRecordData: EmbedFieldData[] = [];
            let brawlerRecord = bralwerRecords[brawlerId];
            if (brawlerRecord.length > 3) {
                for (let i = 0; i < 3; i++) {
                    bralwerRecordData.push({
                        name: brawlerRecord[i].player.name, value: `${brawlerRecord[i].best}:trophy: Achieved at ${new Date(brawlerRecord[i].achieved_at).toLocaleDateString()}`
                    })
                }
            } else {
                bralwerRecordData = [{ name: "N/A", value: "N/A" }];
            }
            message
                .setTitle(brawler.name)
                .setThumbnail(brawler.imageUrl)
                .setURL(brawler.link)
                .setDescription("Highest recorded trophy")
                .setColor(brawler.rarity.color as ColorResolvable)
                .addFields(bralwerRecordData)
                .setTimestamp()
                .setFooter(brawler.class.name, brawler.imageUrl3);
        }
        await interaction.editReply({ embeds: [message] });
    },
};