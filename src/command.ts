import { BaseCommandInteraction, ChatInputApplicationCommandData, Client, ApplicationCommand } from "discord.js";

export interface Command {
	data: any,
	execute(interaction: BaseCommandInteraction): void
}