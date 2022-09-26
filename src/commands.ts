import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9';
const path = require('node:path');
import { Collection } from 'discord.js';
import { Command } from './command';

let commands: Array<JSON> = []

export function deployCommands(client: any): Array<JSON> {
	if (!client.commands) client.commands = new Collection();

	const commandsPath = path.join(__dirname, 'commands');
	const commandSubDirs = readdirSync(commandsPath);

	for (const subDir of commandSubDirs) {
		try {
			const commandPath: string = path.join(commandsPath, subDir, subDir) as string;
			const command: Command = require(commandPath)
			client.commands.set(command.cmdData.name, command);
			commands.push(command.cmdData.toJSON());
		} catch (error) {
			console.log(`Error Reading Dir: ${error}`)
		}
	}

	registerCommands(client);

	return commands;
};

function registerCommands(client: any) {
	const clientId = (String)(process.env.DISCORD_CLIENT_ID);
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