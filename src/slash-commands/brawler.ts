import { SlashCommandBuilder } from "@discordjs/builders";
import { brawlerNames, brawlerIds } from "../index";
import { ColorResolvable, CommandInteraction, MessageEmbed } from "discord.js";
import { findBestMatch } from "string-similarity";
import { getBrawler } from "../api";

export default {
    data: new SlashCommandBuilder()
        .setName('brawler')
        .setDescription('Get stats for a BS brawler')
        .addStringOption(option => option.setName('name').setDescription('Enter the name of a brawler').setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: interaction.channelId !== "898783957452193812" });
        const userInput = interaction.options.getString("name")?.toLowerCase() as string;
        const resultIndex = findBestMatch(userInput, brawlerNames).bestMatchIndex;
        const brawler = await getBrawler(brawlerIds[resultIndex]);
        const message = new MessageEmbed();
        if (brawler) {
            message
                .setTitle(brawler.name)
                .setThumbnail(brawler.imageUrl)
                .setURL(brawler.link)
                .setDescription(brawler.description)
                .setColor(brawler.rarity.color as ColorResolvable)
                .addFields(brawler.gadgets.map((gadget, index) => ({
                    name: `Gadget #${++index}: ${gadget.name}`,
                    value: gadget.description.replace(/<\/?[^>]+(>|$)/g, ""),
                })))
                .addFields(brawler.starPowers.map((starPower, index) => ({
                    name: `Starpower #${++index}: ${starPower.name}`,
                    value: starPower.description.replace(/<\/?[^>]+(>|$)/g, ""),
                })))
                .setTimestamp()
                .setFooter(brawler.class.name, brawler.imageUrl3);
        }
        await interaction.editReply({ embeds: [message] });
    },
};