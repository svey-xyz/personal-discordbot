import { BaseCommandInteraction, Client, Interaction, MessageComponent, MessageComponentInteraction, SelectMenuInteraction, } from "discord.js";
import { Command } from "src/command";
import databaseHandler from "../databaseHandler";

export default (client: Client, data: databaseHandler): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			await handleCommand(client, data, interaction);
		}
	});
};

const handleCommand = async (client: any, data: databaseHandler, interaction: BaseCommandInteraction): Promise<void> => {
	const command = client.commands.get(interaction.commandName);
	// const slashCommand = commands.find(c => c.data.name === interaction.commandName);
	if (!command) {
		interaction.followUp({ content: "An error has occurred" });
		return;
	}

	try {
		await command.execute(client, data, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

	// slashCommand.run(client, interaction);
};