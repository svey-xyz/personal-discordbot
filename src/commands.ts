import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9';
const path = require('node:path');
import { Client, Collection } from 'discord.js';

const commandsPath = path.join(__dirname, 'commands');
const commandSubDirs = readdirSync(commandsPath);
let commands: Array<JSON> = []

export function deployCommands(client: any): Array<JSON> {
	if (!client.commands) client.commands = new Collection();
	for (const subDir of commandSubDirs) {
		try {
			const command = require(path.join(commandsPath, subDir, 'index.ts'))
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		} catch (error) {
			console.log(`Error Reading Dir: ${error}`)
		}
	}

	registerCommands(client);

	return commands;
};

function registerCommands(client: any) {
	const clientId = '992148264356941844';
	const token: string = (String)(process.env.DISCORD_TOKEN);

	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();
}