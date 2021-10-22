import dotenv from "dotenv";
import { Client, Intents, Collection, CommandInteraction } from "discord.js";
import fs from "fs";
import get from "./api";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = new Collection<string, { name: string, execute: (interaction: CommandInteraction) => void }>();

let brawlerToId = {};
let mapToId = {};

(async () => {
    brawlerToId = await get("brawlers").then((data: any) => data.list.map((element: any) => ({
        [element.name]: element.id,
    })));

    mapToId = await get("maps").then((data: any) => data.list.map((element: any) => ({
        [element.name]: element.id,
    })));

    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const { default: command } = await import(`./commands/${file}`);
        commands.set(command.data.name, command);
    }

    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));

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

export default commands;
export { brawlerToId, mapToId };
