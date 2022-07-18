import { Client } from "discord.js";
import { deployCommands } from "../commands";

export default (client: Client): void => {
	client.on("ready", async () => {
		if (!client.user || !client.application) {
			return;
		}

		// const Guilds = client.guilds.cache.map((guild) => guild);
		// // console.log(Guilds[0]);
		// const roles = await Guilds[0].roles.fetch()
		// console.log(roles)

		await deployCommands(client);
		console.log(`${client.user.username} is online`);
	});
};