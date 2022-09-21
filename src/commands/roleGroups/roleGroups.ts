import { ButtonInteraction, Client, CommandInteraction, MessageSelectMenu, SelectMenuInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./commandData"
import { create } from "./subCommands/create";
import { menu } from "./subCommands/menu";

const roleGroups: Command = {
	cmdData: commandData,
	async execute(commandInteraction: CommandInteraction) {
		switch (commandInteraction.options.getSubcommand()) {
			case ('create'):
				create.execute(commandInteraction);
				break;
			case ('menu'):
				menu.execute(commandInteraction)
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
				create.selectHandler!(selectInteraction)
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
				create.buttonHandler!(buttonInteraction)
				break;
			default:
				break;
		}
	}
};

module.exports = roleGroups;
