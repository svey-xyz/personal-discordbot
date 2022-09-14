import { Client, CommandInteraction, MessageSelectMenu, SelectMenuInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./commandData"
import databaseHandler from "../../databaseHandler";
import { createRoleGroup } from "./subCommands/createRoleGroup";
import { menuRoleGroup } from "./subCommands/menuRoleGroup";

const roleGroups: Command = {
	cmdData: commandData,
	async execute(data: databaseHandler, commandInteraction: CommandInteraction) {

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
	},
	async select(data: databaseHandler, selectInteraction: SelectMenuInteraction) {
		const { customId, values, member } = selectInteraction
		const selectCustomID = JSON.parse(customId)

		switch (selectCustomID.fn) {
			case ('c'):
				console.log('madeIT!')

				const component = selectInteraction.component as MessageSelectMenu
				const removed = component.options.filter((option) => {
					return !values.includes(option.value)
				})

				for (const id of values) {
					// data.setArrayData(id.split('%'))
				}

				break;
			default:
				break;
		}
	}
};

module.exports = roleGroups;
