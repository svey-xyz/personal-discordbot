import { Client } from "discord.js";
import { Sequelize } from "sequelize";
import { deployCommands } from "../commands";

export default (client: Client, sequelizer: Sequelize): void => {
	client.on("ready", async () => {
		if (!client.user || !client.application) {
			return;
		}

		try {
			await sequelizer.authenticate();
			console.log('Connection has been established successfully.');
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}

		await deployCommands(client);
		console.log(`${client.user.username} is online`);
	});
};