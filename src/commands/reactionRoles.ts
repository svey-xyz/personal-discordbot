import { Command } from "../command";
const { SlashCommandBuilder } = require('@discordjs/builders');
import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";


const commandData: any = new SlashCommandBuilder()
	.setName('reactionrole')
	.setDescription("Create an embed for reaction roles.")
	.addSubcommand((subcommand:any)=>
		subcommand
			.setName('create')
			.setDescription('Create a new reaction role command.')
			.addChannelOption((option:any) => option.setName('destination').setDescription('Select a channel for the message.'))
		)
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('edit')
			.setDescription('Edit an existing reaction role command.')
			.addStringOption((option: any) => option.setName('target').setDescription('The message ID.'))
	)

const reactionRole: Command = {
	data: commandData,
	async execute(interaction: BaseCommandInteraction) {
		const embed = new MessageEmbed().setDescription('Create a reaction role!');

		await interaction.reply({ embeds: [embed], ephemeral: true })
			.then(() => console.log('Reply sent.'))
			.catch(console.error);
	}
};



module.exports = reactionRole;