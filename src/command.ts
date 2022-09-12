import { BaseCommandInteraction, Client, MessageEmbed, SelectMenuInteraction } from "discord.js";
export const { SlashCommandBuilder } = require('@discordjs/builders');
export const discordInterface = { BaseCommandInteraction, Client, MessageEmbed }

export interface Command {
	data: any,
	execute(client: Client, interaction: BaseCommandInteraction): void,
	select?(client: Client, interaction: SelectMenuInteraction): void
}