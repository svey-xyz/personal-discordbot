import { CommandInteraction, Role } from "discord.js";
import { SubCommand } from "src/subCommand";
import { getGuildRoles } from "../functions/getGuildRoles";

export const list: SubCommand = {
	async execute(commandInteraction: CommandInteraction) {
		let roleGroups: Array<Role> = []
		let roleNames: Array<string> = []
		const guildRoles = await getGuildRoles(commandInteraction)

		for (const role of guildRoles.values()) {
			if (await global.__BOT_DATA__.hasData(commandInteraction.guildId as string, role.id)) roleGroups.push(role);
		}

		for (const role of roleGroups) {
			roleNames.push(role.name)
		}

		const reply = roleNames.length > 0 ? `These roles have groups: ${roleNames.join(', ')}` : `No roles have groups!`
		commandInteraction.reply({ content: reply, ephemeral: true })
	},
}