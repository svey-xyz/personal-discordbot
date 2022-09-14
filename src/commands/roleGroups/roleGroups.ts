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
				const dataSet: string = `${selectInteraction.guildId}-roleGroups`
				console.log('madeIT!')

				let roleData = await data.getArrayData(dataSet, selectCustomID.tR)

				const component = selectInteraction.component as MessageSelectMenu
				const removed = component.options.filter((option) => {
					return !values.includes(option.value)
				})

				for (const option of removed) {
					roleData.splice(roleData.indexOf(option.value), 1);
				}
				for (const id of values) {
					if (roleData.indexOf(id) == -1) roleData.push(id);
				}

				await data.setArrayData(dataSet, selectCustomID.tR, roleData)
				console.log(await data.getArrayData(dataSet, selectCustomID.tR))

				selectInteraction.reply({content:'Roles added', ephemeral: true})
				break;
			default:
				break;
		}
	}
};

module.exports = roleGroups;
