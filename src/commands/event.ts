import { SlashCommandBuilder } from "@discordjs/builders";
import { mapIds, mapNames, brawlerIdToNames } from "../index";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { getEvents } from "../api";

export default {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Get the schedule for BS events')
        .addStringOption(option => option.setName('choose')
            .setDescription('Choose one')
            .setRequired(true)
            .addChoice("Active", "active")
            .addChoice("Upcoming", "upcoming")),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: interaction.channelId !== "898783957452193812" });
        const userInput = interaction.options.getString("choose")?.toLowerCase() as string;
        const events = await getEvents();
        let message = new MessageEmbed();
        if (events) {
            const msToTime = (ms: number): string => {
                let days = Math.floor(ms / (60000 * 60 * 24));
                ms %= (60000 * 60 * 24);
                let hours = Math.floor(ms / (60000 * 60));
                ms %= (60000 * 60);
                let minutes = Math.floor(ms / 60000);
                let result = "";
                if (days) {
                    if (days === 1) {
                        result += "1 Day ";
                    }
                    else {
                        result += `${days} Days `
                    }
                }
                if (hours) {
                    if (hours === 1) {
                        result += "1 Hour ";
                    }
                    else {
                        result += `${hours} Hours `
                    }
                }
                if (minutes) {
                    if (minutes === 1) {
                        result += "1 Minute";
                    }
                    else {
                        result += `${minutes} Minutes`
                    }
                }
                return result;
            }

            if (userInput === "active")
                message
                    .setTitle("Active Events")
                    .addFields(events.active.map(entry => {
                        if (entry.slot.id === 8) {
                            return { name: "Showdown+", value: `${entry.map.name} :alarm_clock: Ends in ${msToTime(new Date(entry.endTime).getTime() - Date.now())}` }
                        }
                        return { name: entry.map.gameMode.name, value: `${entry.map.name} :alarm_clock: Ends in ${msToTime(new Date(entry.endTime).getTime() - Date.now())}` }
                    }))
                    .setTimestamp();
            else if (userInput === "upcoming")
                message
                    .setTitle("Upcoming Events")
                    .addFields(events.upcoming.map(entry => {
                        if (entry.slot.id === 8) {
                            return { name: "Showdown+", value: `${entry.map.name} :alarm_clock: Starts in ${msToTime(new Date(entry.startTime).getTime() - Date.now())}` }
                        }
                        return { name: entry.map.gameMode.name, value: `${entry.map.name} :alarm_clock: Starts in ${msToTime(new Date(entry.startTime).getTime() - Date.now())}` }
                    }))
                    .setTimestamp();
        }
        await interaction.editReply({ embeds: [message] });
    },
};