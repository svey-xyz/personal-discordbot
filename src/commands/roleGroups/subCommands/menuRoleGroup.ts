import { CommandInteraction, Message, Role } from "discord.js";
import databaseHandler from "src/databaseHandler";
import { rolesToMessageComponent } from "../functions/rolesAsMessageRows";

export async function menuRoleGroup(commandInteraction: CommandInteraction, data: databaseHandler, dataSet: string) {

	const tieredRole: Role = <Role>commandInteraction.options.getRole('tiered-role');

	// Handle existing data
	if (!(await data.hasData(dataSet, tieredRole.id))) {
		commandInteraction.reply({
			content: `No 'Role Group' exists for: ${tieredRole.name}! Try creating one first.`, ephemeral: true
		})
		return;
	}

	const roleGroup = await data.getArrayData(dataSet, tieredRole.id)

	const rows = await rolesToMessageComponent(await roleIDsToRolesArray(roleGroup, commandInteraction));
	await commandInteraction.reply({ content: `Role menu for: ${tieredRole.name}!`, components: [...rows] })
		.then(async () => {
			const message: Message = <Message>(await commandInteraction.fetchReply())
		})
		.catch(console.error);
}

async function roleIDsToRolesArray(IDs: Array<string>, interaction: CommandInteraction): Promise<Array<Role>> {
	const guild = interaction.guild
	if (guild == null) throw new Error("Are you in a guild?");

	let roles: Array<Role> = []
	for (const ID of IDs) {
		let role = await guild.roles.fetch(ID)
		if (role !== null) roles.push(role);
	}

	return roles;
}