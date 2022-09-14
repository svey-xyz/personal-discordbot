import { CommandInteraction, Message, Role, MessageButton, MessageActionRow, SelectMenuInteraction, Collection, MessageSelectMenu } from "discord.js";
import databaseHandler from "src/databaseHandler";
import { rolesToMessageComponent } from "../functions/rolesAsMessageRows";

export async function createRoleGroup(commandInteraction: CommandInteraction, data: databaseHandler, dataSet: string) {
	const tieredRole: Role = <Role>commandInteraction.options.getRole('tiered-role');

	// Handle existing data
	if (await data.hasData(dataSet, tieredRole.id)) {
		commandInteraction.reply({
			content: `A group already exist for: ${tieredRole.name}! You can edit or delete the existing group.`, ephemeral: true
		})
		return;
	}

	const guild = commandInteraction.guild;
	if (guild == null) throw new Error("Are you in a guild?");
	const guildRoles = (await guild.roles.fetch()).filter(r => !r.managed); // filter out managed roles (i.e. bots)

	const roleSelectRows = await rolesToMessageComponent(tieredRole, guildRoles, 1);
	await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole.name}!`, ephemeral: true, components: [...roleSelectRows] })
}