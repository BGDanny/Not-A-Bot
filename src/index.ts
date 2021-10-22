import dotenv from "dotenv";
import { Client, Intents, Collection, CommandInteraction } from "discord.js";
import fs from "fs";
import { getBrawler } from "./api";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = new Collection<string, { name: string, execute: (interaction: CommandInteraction) => void }>();

let brawlerToId: { [key: string]: number }[];
// let mapToId = {};

const dynamicImport = async () => {
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
}

(async () => {
    await dynamicImport();

    const brawler = await getBrawler();

    if (brawler) {
        brawlerToId = brawler.list.map(i => {
            return { [i.name]: i.id };
        });
        console.log(brawlerToId);
    }

})();

client.login(process.env.token);

export default commands;
export { brawlerToId };
