import { Collection,  MessageActionRow, MessageSelectMenu, Role } from "discord.js";

type MessageSelectOption = { label: string, description: string, value: string }

export async function rolesToMessageComponent(roles: Array<Role> | Collection<string, Role>, minSelection?: number, maxSelection?: number): Promise<Array<MessageActionRow>> {
	let messageRows = rolesArrayToMessageRows(roles);

	let rows: any = []
	messageRows.forEach((rolesArray, index) => {
		let selectComponent = new MessageSelectMenu()
			.setCustomId(`roleGroupRow-${index}`)
			.setPlaceholder('Nothing selected')
			.addOptions(rolesArray)
			.setMinValues(minSelection ? minSelection : 0)

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
function rolesArrayToMessageRows(rolesArray: Array<Role> | Collection<string, Role>): Array<Array<MessageSelectOption>> {
	let splitRolesRows: Array<Array<MessageSelectOption>> = []
	let splitIndex: number = 0
	let loopIndex: number = 0

	rolesArray.forEach((role, index) => {
		if (!splitRolesRows[splitIndex]) splitRolesRows[splitIndex] = []
		let roleRow: MessageSelectOption = { label: role.name, description: '', value: role.id }

		splitRolesRows[splitIndex].push(roleRow)
		if (loopIndex % 25 == 0 && loopIndex != 0) splitIndex++;
		loopIndex++;
	});
	return splitRolesRows;
}