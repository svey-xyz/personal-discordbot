import { Client, CommandInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./commandData"
import databaseHandler from "../../databaseHandler";
import { createRoleGroup } from "./subCommands/createRoleGroup";
import { menuRoleGroup } from "./subCommands/menuRoleGroup";

const roleGroups: Command = {
	cmdData: commandData,
	async execute(client: Client, data: databaseHandler, commandInteraction: CommandInteraction) {

		const dataSet: string = `${commandInteraction.guildId}-roleGroups`

		switch (commandInteraction.options.getSubcommand()) {
			case ('create'):
				createRoleGroup(commandInteraction, data, dataSet);
				break;
			case ('menu'):
				menuRoleGroup(commandInteraction, data, dataSet)
				break;
			default:
				commandInteraction.reply({ content: `No command found!` })
				break;
		}
		
	}
};

module.exports = roleGroups;
