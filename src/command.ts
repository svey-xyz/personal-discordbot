import { Client, SelectMenuInteraction, CommandInteraction } from "discord.js";
import databaseHandler from "./databaseHandler";

export interface Command {
	cmdData: any,
	execute(data: databaseHandler, interaction: CommandInteraction): void,
	select?(data: databaseHandler, interaction: SelectMenuInteraction): void
}