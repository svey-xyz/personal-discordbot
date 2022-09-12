import { BaseCommandInteraction, Client, Interaction, SelectMenuInteraction, } from "discord.js";

export default (client: Client): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			await handleCommand(client, interaction);
		}
		if (interaction.isSelectMenu()) {
			await handleSelect(client, interaction)
		}
	});
};

const handleSelect = async (client: any, interaction: SelectMenuInteraction) => {
	const command = client.commands.get(interaction.customId)

	if (!command) {
		interaction.followUp({ content: "An error has occurred" });
		return;
	}

	try {
		await command.select(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error interacting with the menu!', ephemeral: true });
	}
};

const handleCommand = async (client: any, interaction: BaseCommandInteraction): Promise<void> => {
	const command = client.commands.get(interaction.commandName);
	// const slashCommand = commands.find(c => c.data.name === interaction.commandName);
	if (!command) {
		interaction.followUp({ content: "An error has occurred" });
		return;
	}

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

	// slashCommand.run(client, interaction);
};