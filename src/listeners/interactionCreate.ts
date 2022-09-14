import { CommandInteraction, Client, Interaction, SelectMenuInteraction, ContextMenuInteraction, } from "discord.js";
import { Command } from "src/command";
import databaseHandler from "../databaseHandler";

export default (client: Client, data: databaseHandler): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			await handleCommand(client, data, interaction);
		}

		if (interaction.isSelectMenu()) {
			await handleSelect(client, data, interaction);
		}
	});
};

const handleSelect = (client: any, data: databaseHandler, interaction: SelectMenuInteraction): void => {
	console.log(`Parsed ID: `, JSON.parse(interaction.customId))
	const command: Command = client.commands.get(JSON.parse(interaction.customId).cmdN);
	if (!command) {
		// interaction.followUp({ content: "An error has occurred" });
		return;
	}

	try {
		if (command.select) command.select(data, interaction);
	} catch (error) {
		console.error(error);
		// interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
};

const handleCommand = (client: any, data: databaseHandler, interaction: CommandInteraction | ContextMenuInteraction): void => {
	const command = client.commands.get(interaction.commandName);
	if (!command) {
		interaction.followUp({ content: "An error has occurred" });
		return;
	}

	try {
		command.execute(data, interaction);
	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
};