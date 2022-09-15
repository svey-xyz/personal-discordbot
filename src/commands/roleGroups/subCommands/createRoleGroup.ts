import { CommandInteraction, Role, SelectMenuInteraction, MessageSelectMenu } from "discord.js";
import databaseHandler from "src/databaseHandler";
import { constructMessageRows } from "../functions/messageConstructor";
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

	let messageComponents = constructMessageRows(roleSelectRows)

	await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole.name}!`, ephemeral: true, components: messageComponents })
}

export async function selectionHandler(data: databaseHandler, selectInteraction: SelectMenuInteraction, tieredRoleID: string) {
	const { values } = selectInteraction

	const dataSet: string = `${selectInteraction.guildId}-roleGroups`

	let roleData = await data.getArrayData(dataSet, tieredRoleID)

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

	await data.setArrayData(dataSet, tieredRoleID, roleData)

	selectInteraction.reply({ content: 'Roles added', ephemeral: true })
}