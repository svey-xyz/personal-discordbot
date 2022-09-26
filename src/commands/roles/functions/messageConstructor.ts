import { MessageActionRow, MessageButton, MessageEmbed, MessageOptions, MessagePayload, Role } from "discord.js";

export function constructMessageOptions(tieredRoleID: string, roleRows: Array<MessageActionRow>, fn: 'c' | 'm', activePage: number = 0): MessageOptions {
	let payload: MessageOptions
	let msgRows: Array<MessageActionRow> = []

	const nextBtnID = JSON.stringify({
		cmdN: 'roles',
		fn: fn,
		btn: 'n',
		tR: tieredRoleID,
		p: activePage
	})
	const prevBtnID = JSON.stringify({
		cmdN: 'roles',
		fn: fn,
		btn: 'p',
		tR: tieredRoleID,
		p: activePage
	})
	const applyBtnID = JSON.stringify({
		cmdN: 'roles',
		fn: fn,
		btn: 'a',
		tR: tieredRoleID,
	})

	let nextBtn = new MessageButton()
		.setCustomId(nextBtnID)
		.setLabel('Next')
		.setStyle('SECONDARY')
		.setDisabled(true)
	let prevBtn = new MessageButton()
		.setCustomId(prevBtnID)
		.setLabel('Previous')
		.setStyle('SECONDARY')
		.setDisabled(true)
	let applyBtn = new MessageButton()
		.setCustomId(applyBtnID)
		.setLabel('Apply')
		.setStyle('SUCCESS')
		.setDisabled(false)

	try {
		if (activePage < 0) throw new Error("Page number can't be negative!")
		if (activePage >= roleRows.length) throw new Error("Page number cannot exceed number of pages!")

		msgRows.push(roleRows[activePage]);

		let buttonRow: MessageActionRow = new MessageActionRow()
		if (roleRows.length > 1) {
			if (activePage > 0) prevBtn.setDisabled(false).setStyle('PRIMARY');
			if (activePage < roleRows.length - 1) nextBtn.setDisabled(false).setStyle('PRIMARY');
			buttonRow.addComponents([prevBtn, nextBtn])
			msgRows.push(buttonRow)

		}
		
		payload = { components: msgRows }

	} catch (err) {
		console.log(`Pagination `, err)
		payload = { content: `Pagination Error: ${err}`, components: [] }
	}

	return payload;
}