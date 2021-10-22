import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const commands = [];

(async () => {
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const { default: command } = await import(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(process.env.token as string);

    rest.put(Routes.applicationGuildCommands(process.env.clientId as string, process.env.guildId as string), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})();



