import { BaseCommandInteraction, Guild,  MessageActionRow, MessageSelectMenu } from "discord.js";

type MessageSelectOption = { label: string, description: string, value: string }
type MessageSelectOptions = Array<MessageSelectOption>

export async function rolesAsMessageRows(interaction: BaseCommandInteraction, minSelection?: number, maxSelection?: number): Promise<Array<MessageActionRow>> {
	const guild = interaction.guild
	if (guild == null) throw new Error("Are you in a guild?");
	
	const guildRoles = await guild.roles.fetch();
	let splitRoleSelection: Array<MessageSelectOptions> = []
	let arrayIndex: number = 0
	let loopIndex: number = 0;

	guildRoles.filter(r => !r.managed).forEach((role, index) => { // Filter out managed (i.e. bot) roles
		if (!splitRoleSelection[arrayIndex]) splitRoleSelection[arrayIndex] = []

		let typedRole: MessageSelectOption = { label: role.name, description: '', value: role.id }
		splitRoleSelection[arrayIndex].push(typedRole)

		loopIndex++;
		if (loopIndex % 25 == 0) arrayIndex++;
	});

	let rows: any = []
	splitRoleSelection.forEach((rolesArray, index) => {
		let selectComponent = new MessageSelectMenu()
			.setCustomId('rolegroup')
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