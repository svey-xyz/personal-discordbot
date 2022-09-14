import { Collection,  MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role } from "discord.js";

export async function rolesToMessageComponent(tieredrole: Role, roles: Array<Role> | Collection<string, Role>, minSelection?: number, maxSelection?: number): Promise<Array<MessageActionRow>> {
	let messageRows = rolesArrayToMessageRows(roles);

	let rows: any = []
	messageRows.forEach((rolesArray, index) => {
		const customID = JSON.stringify({
			cmdN: 'rolegroup',
			fn: 'c',
			tR: tieredrole.id
		})
		let selectComponent = new MessageSelectMenu()
			.setCustomId(customID)
			.setPlaceholder('Nothing selected')
			.addOptions(rolesArray)
			.setMinValues(minSelection ? minSelection : 0)
			// .setDisabled(true)

		rows.push(
			new MessageActionRow().addComponents(
				maxSelection ? selectComponent.setMaxValues(maxSelection) : selectComponent
			)
		)
	});

	return rows;
}

/**
 *
 *	Returns an array of arrays because discord can only handle a max of 25 rows per message
 * @param {Array<Role>} rolesArray
 * @return {*}  {Array<Array<MessageSelectOption>>}
 */
function rolesArrayToMessageRows(rolesArray: Array<Role> | Collection<string, Role>): Array<Array<MessageSelectOptionData>> {
	let splitRolesRows: Array<Array<MessageSelectOptionData>> = []
	let splitIndex: number = 0
	let loopIndex: number = 0

	rolesArray.forEach((role, index) => {
		if (!splitRolesRows[splitIndex]) splitRolesRows[splitIndex] = []
		let roleRow: MessageSelectOptionData = { label: role.name, description: '', value: role.id }

		splitRolesRows[splitIndex].push(roleRow)
		if (loopIndex % 25 == 0 && loopIndex != 0) splitIndex++;
		loopIndex++;
	});
	return splitRolesRows;
}