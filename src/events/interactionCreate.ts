import commands from "../index";
import { CommandInteraction } from "discord.js";

export default {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction) {
        const command = commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
}