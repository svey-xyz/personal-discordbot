import { CommandInteraction, Message, Role, MessageButton, MessageActionRow, SelectMenuInteraction, Collection, MessageSelectMenu } from "discord.js";
import databaseHandler from "src/databaseHandler";
import { rolesToMessageComponent } from "../functions/rolesAsMessageRows";

export async function createRoleGroup(commandInteraction: CommandInteraction, data: databaseHandler, dataSet: string) {
	const filter = (i: any) => {
		i.deferUpdate();
		return i.user.id === commandInteraction.user.id; // Collector interaction must be by same user as command interaction
	};

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

	const roleSelectRows = await rolesToMessageComponent(guildRoles, 1);

	await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole.name}!`, ephemeral: true })
		.then(async () => {
			roleSelectRows.forEach(roleRow => {
				commandInteraction.followUp({ ephemeral: true, components: [roleRow] }).then(async (roleRowMessage) => {
					(<Message>roleRowMessage).awaitMessageComponent({ filter, componentType: "SELECT_MENU", time: 120000 })
						.then(async (selectInteraction: SelectMenuInteraction) => {
							addRoles(data, dataSet, tieredRole.id, selectInteraction)
						})
						.catch((err: any) => console.log(`No interactions were collected: `, err));
				});
			});
		})
		.catch(console.error);
}

async function addRoles(data: databaseHandler, dataSet: string, tieredRole: string,  selectInteraction: SelectMenuInteraction) {
	const selectedRoleIDs = selectInteraction.values
	const rolesRows:any = selectInteraction.message.components![0].components;
	let rowRoleIDs: Array<string> = []

	rolesRows.forEach((row: MessageSelectMenu) => {
		if (row.customId == selectInteraction.customId)
		row.options.forEach(option => {
			rowRoleIDs.push(option.value)
		});
	});

	let existingRoles = await data.getArrayData(dataSet, tieredRole)
	let roles: Array<string> = (typeof existingRoles !== 'undefined') ? existingRoles : [];
	rowRoleIDs.forEach((roleID) => {
		if (selectedRoleIDs.indexOf(roleID) == -1) roles.splice(roles.indexOf(roleID), 1)
		if (roles.indexOf(roleID) == -1 && selectedRoleIDs.indexOf(roleID) !== -1) roles.push(roleID);
	});

	console.log(`Selected roles: `, rowRoleIDs)

	await data.setArrayData(dataSet, tieredRole, roles)
}