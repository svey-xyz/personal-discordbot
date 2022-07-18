import { Command, SlashCommandBuilder, discordInterface } from "../command";
import { BaseCommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu  } from "discord.js";


const commandData: any = new SlashCommandBuilder()
	.setName('embedroles')
	.setDescription("Create an embed for reaction roles.")
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('create')
			.setDescription('Create a group of roles to be used for the reaction role embed.')
			.addRoleOption(
				(option: any) =>
					option.setName('role')
						.setDescription('Select a role.')
						
			)
	)

const row = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('Nothing selected')
			.addOptions([
				{
					label: 'Select me',
					description: 'This is a description',
					value: 'first_option',
				},
				{
					label: 'You can select me too',
					description: 'This is also a description',
					value: 'second_option',
				},
			]),
	);


const reactionRole: Command = {
	data: commandData,
	async execute(client: Client, interaction: BaseCommandInteraction) {
		const embed = new MessageEmbed().setDescription('Create a reaction role!');

		await interaction.reply({ embeds: [embed], components:[row], ephemeral: true })
			.then(() => console.log('Reply sent.'))
			.catch(console.error);
	}
};



module.exports = reactionRole;