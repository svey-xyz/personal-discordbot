import { Collection,  MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role } from "discord.js";

export async function rolesToMessageComponent(tieredRoleID: string, roles: Array<Role> | Collection<string, Role>, fn: 'c' | 'm', preSelected?: Array<string>): Promise<Array<MessageActionRow>> {
	let messageRows = rolesArrayToMessageRows(tieredRoleID, roles, preSelected);

	let rows: any = []
	messageRows.forEach((rolesArray, index) => {
		const customID = JSON.stringify({
			cmdN: 'roles',
			fn: fn,
			tR: tieredRoleID
		})
		let selectComponent = new MessageSelectMenu()
			.setCustomId(customID)
			.setPlaceholder('Nothing selected')
			.addOptions(rolesArray)
			.setMinValues(0)
			.setMaxValues(rolesArray.length)
			// .setDisabled(true)

		rows.push(
			new MessageActionRow().addComponents(selectComponent)
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
function rolesArrayToMessageRows(tieredRoleID: string, rolesArray: Array<Role> | Collection<string, Role>, preSelected?: Array<string>): Array<Array<MessageSelectOptionData>> {
	let splitRolesRows: Array<Array<MessageSelectOptionData>> = []
	let splitIndex: number = 0
	let loopIndex: number = 0

	for (const role of rolesArray.values()) {
		if (!splitRolesRows[splitIndex]) splitRolesRows[splitIndex] = []
		if (role.id == tieredRoleID) continue;
		let selected = (typeof preSelected !== 'undefined') ? preSelected.indexOf(role.id) !== -1 : false;
		let roleRow: MessageSelectOptionData = {
			label: role.name,
			description: '',
			value: role.id,
			default: selected
		}

		splitRolesRows[splitIndex].push(roleRow)

		loopIndex++;
		if (loopIndex % 25 == 0) splitIndex++;
	}

	return splitRolesRows;
}