import dotenv from "dotenv";
import { Client, Intents, Collection, CommandInteraction } from "discord.js";
import fs from "fs";
import { getBrawlers, getMaps } from "./api";
import { keepAlive } from "./server";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = new Collection<string, { name: string, execute: (interaction: CommandInteraction) => void }>();

let brawlerNames: string[];
let brawlerIds: number[];
let brawlerIdToNames: { [key: number]: string } = {};
let mapNames: string[];
let mapIds: number[];

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

    const brawlers = await getBrawlers();
    if (brawlers) {
        brawlerNames = brawlers.list.map(i => {
            return i.name.toLowerCase();
        });
        brawlerIds = brawlers.list.map(i => {
            return i.id;
        });
        brawlers.list.forEach(i => {
            brawlerIdToNames[i.id] = i.name;
        });
    }

    const maps = await getMaps();
    if (maps) {
        mapNames = maps.list.map(i => {
            const name = i.name?.toLowerCase();
            if (name !== undefined)
                return name;
            return "";
        });
        mapIds = maps.list.map(i => {
            return i.id;
        });
    }
})();

keepAlive();

client.login(process.env.Token);

export default commands;
export { brawlerNames, brawlerIds, brawlerIdToNames, mapNames, mapIds };
