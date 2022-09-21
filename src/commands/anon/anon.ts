import { MessageEmbed, CommandInteraction, TextBasedChannel } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');
import { Command } from "../../command";

const commandData: any = new SlashCommandBuilder()
	.setName('anon')
	.setDescription("Send an anonymous message in the current channel!")
	.addStringOption(
		(option: any) =>
			option.setName('message')
				.setDescription('Your anonymous message!')
				.setRequired(true)
	)

const anon: Command = {
	cmdData: commandData,
	async execute(commandInteraction: CommandInteraction) {
		const msg: string = commandInteraction.options.getString('message') as string;
		const channel: TextBasedChannel = commandInteraction.channel as TextBasedChannel
		const content: string = `Anon says: ${msg}`

		channel?.send({content: content})
		await commandInteraction.reply({ content:'Anonymous message sent! You can dismiss this message.', ephemeral: true })
	}
};

module.exports = anon;