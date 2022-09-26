import { ButtonInteraction, CommandInteraction, SelectMenuInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./commandData"
import { group } from "./subCommands/group";
import { list } from "./subCommands/list";
import { menu } from "./subCommands/menu";

const roles: Command = {
	cmdData: commandData,
	async execute(commandInteraction: CommandInteraction) {
		switch (commandInteraction.options.getSubcommand()) {
			case ('group'):
				group.execute(commandInteraction);
				break;
			case ('menu'):
				menu.execute(commandInteraction)
				break;
			case ('list'):
				list.execute(commandInteraction)
				break;
			default:
				commandInteraction.reply({ content: `No command found!` })
				break;
		}
	},
	async select(selectInteraction: SelectMenuInteraction) {
		const { customId, values, member } = selectInteraction
		const selectCustomID = JSON.parse(customId)
		
		switch (selectCustomID.fn) {
			case ('c'):
				group.selectHandler!(selectInteraction)
				break;
			case ('m'):
				menu.selectHandler!(selectInteraction)
				break;
			default:
				break;
		}
	},
	async button(buttonInteraction: ButtonInteraction) {
		const { customId, member } = buttonInteraction
		const selectCustomID = JSON.parse(customId)

		switch (selectCustomID.fn) {
			case ('c'):
				group.buttonHandler!(buttonInteraction)
				break;
			default:
				break;
		}
	}
};

module.exports = roles;