import { BaseCommandInteraction, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');
import { Command } from "../command";

const commandData: any = new SlashCommandBuilder()
	.setName('ping')
	.setDescription("Friendly reply.")

const ping: Command = {
	data: commandData,
	async execute(interaction: BaseCommandInteraction) {
		const embed = new MessageEmbed().setDescription('Pong!');

		await interaction.reply({ embeds: [embed], ephemeral: true })
			.then(() => console.log('Reply sent.'))
			.catch(console.error);
	}
};

module.exports = ping;