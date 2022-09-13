import { BaseCommandInteraction, Client, MessageEmbed, SelectMenuInteraction } from "discord.js";
import databaseHandler from "./databaseHandler";
export const { SlashCommandBuilder } = require('@discordjs/builders');
export const discordInterface = { BaseCommandInteraction, Client, MessageEmbed }

export interface Command {
	cmdData: any,
	execute(client: Client, data: databaseHandler, interaction: BaseCommandInteraction): void,
	select?(client: Client, data: databaseHandler,  interaction: SelectMenuInteraction): void
}