import { Client } from "discord.js";
import { deployCommands } from "../commands";

export default (client: Client): void => {
	client.on("ready", async () => {
		if (!client.user || !client.application) {
			return;
		}

		await deployCommands(client);
		console.log(`${client.user.username} is online`);
	});
};