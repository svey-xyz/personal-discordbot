import { BaseCommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			await handleCommand(client, interaction);
		}
		if (interaction.isSelectMenu()) {
			const selectedRoleIDs = interaction.values;
			selectedRoleIDs.forEach(roleID => {
				const role = interaction.guild?.roles.fetch(roleID)
				console.log(role);

			});

		}
	});
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