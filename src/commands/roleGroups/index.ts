import { Client, CommandInteraction, MessageEmbed, SelectMenuInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./slashCommand"
import { rolesAsMessageRows } from "./functions/rolesAsMessageRows";

const reactionRole: Command = {
	data: commandData,
	async execute(client: Client, interaction: CommandInteraction) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setDescription('Create a reaction role!')


		const rows = await rolesAsMessageRows(interaction, 1);
		await interaction.reply({ embeds: [embed], ephemeral: true, components: [...rows] })
			.then(() => {

				switch(interaction.options.getSubcommand()) {
					case('create'):
						let tieredRole = interaction.options.getRole('tiered-role')
						break;
					case('edit'):
						break;
					default:
						break;
				}

			})
			.catch(console.error);
	},
	async select(client: Client, interaction: SelectMenuInteraction) {
		const selectedRoleIDs = interaction.values;
		selectedRoleIDs.forEach(roleID => {
			const role = interaction.guild?.roles.fetch(roleID)
			// console.log(role);

		});
	}
};

module.exports = reactionRole;
