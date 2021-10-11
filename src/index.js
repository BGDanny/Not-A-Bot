import dotenv from "dotenv";
import { Client, Intents, Collection } from "discord.js";
import fs from "fs";

dotenv.config();

const getCommand = async (file) => {
    const { default: command } = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    getCommand(file);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.token);