import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9';
const path = require('node:path');
import { Client, Collection } from 'discord.js';

const dotenv = require('dotenv');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
let commands: Array<JSON> = []

export function deployCommands(client: any): Array<JSON> {
	if (!client.commands) client.commands = new Collection();

	commandFiles.forEach((file) => {
		const commandPath = path.join(commandsPath, file);
		const command = require(commandPath);

		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	});

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
			console.log(commands)
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