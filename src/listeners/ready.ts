import { Client } from "discord.js";
import { deployCommands } from "../commands";
import databaseHandler from "../databaseHandler";

export default (client: Client, data: databaseHandler): void => {
	client.on("ready", async () => {
		if (!client.user || !client.application) {
			return;
		}

		await data.ready();
		await deployCommands(client);

		console.log(`${client.user.username} is online`);
	});
};