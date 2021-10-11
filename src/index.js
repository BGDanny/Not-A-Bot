import dotenv from "dotenv";
import { Client, Intents, Collection } from "discord.js";
import fs from "fs";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

(async () => {
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const { default: command } = await import(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }
})();

(async () => {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const { default: event } = await import(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
})();

client.login(process.env.token);