import { BaseCommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageActionRowComponent } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./slashCommand"
import { rolesAsMessageRows } from "./functions/rolesAsMessageRows";

const reactionRole: Command = {
	data: commandData,
	async execute(client: Client, interaction: BaseCommandInteraction) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setDescription('Create a reaction role!')


		const rows = await rolesAsMessageRows(interaction, 1);
		await interaction.reply({ embeds: [embed], ephemeral: true, components: [...rows] })
			.then(() => {
				console.log('Reply sent.')
				interaction
			})
			.catch(console.error);
	}
};

module.exports = reactionRole;
