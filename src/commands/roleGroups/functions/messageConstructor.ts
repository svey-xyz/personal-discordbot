import { MessageActionRow, MessageButton } from "discord.js";

export function constructMessageRows(roleRows: Array<MessageActionRow>, activePage: number = 0): Array<MessageActionRow> {
	let msgRows: Array<MessageActionRow> = []
	let nextBtn = new MessageButton()
		.setCustomId('nextPageBtn')
		.setLabel('Next')
		.setStyle('SECONDARY')
		.setDisabled(true)
	let prevBtn = new MessageButton()
		.setCustomId('prevPageBtn')
		.setLabel('Previous')
		.setStyle('SECONDARY')
		.setDisabled(true)

	msgRows.push(roleRows[activePage]);
	if (roleRows.length > 1) {
		if (activePage > 0) prevBtn.setDisabled(false).setStyle('PRIMARY');
		if (activePage < roleRows.length - 1) nextBtn.setDisabled(false).setStyle('PRIMARY');
		let buttonRow = new MessageActionRow().addComponents([prevBtn, nextBtn])
		msgRows.push(buttonRow)
	}

	return msgRows;
}