import { CommandInteraction, Role, ButtonInteraction, Interaction, Collection, MessageOptions, InteractionUpdateOptions, SelectMenuInteraction, MessageSelectMenu } from "discord.js";
import { SubCommand } from "src/subCommand";
import { constructMessageOptions } from "../functions/messageConstructor";
import { rolesToMessageComponent } from "../functions/rolesAsMessageRows";

export const create: SubCommand = {
	async execute(commandInteraction: CommandInteraction) {
		const tieredRole: Role = <Role>commandInteraction.options.getRole('tiered-role');
		const tieredRoleID: string = tieredRole.id

		// Handle existing data
		if (await global.__BOT_DATA__.hasData(commandInteraction.guildId as string, tieredRole.id)) {
			commandInteraction.reply({
				content: `A group already exist for: ${tieredRole.name}! You can edit or delete the existing group.`, ephemeral: true
			})
			return;
		}

		const roles = await getAllRoles(commandInteraction)
		const preSelected = await global.__BOT_DATA__.getArrayData(commandInteraction.guildId as string, tieredRoleID)
		const roleSelectRows = await rolesToMessageComponent(tieredRoleID, roles, 'c', preSelected);
		const messageOptions = constructMessageOptions(tieredRoleID, roleSelectRows, 'c')


		await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole.name}!`, ephemeral: true, components: messageOptions.components })
	},
	
	async buttonHandler(buttonInteraction: ButtonInteraction) {
		const { customId, member } = buttonInteraction
		const buttonCustomID = JSON.parse(customId)
		const tieredRoleID: string = buttonCustomID.tR

		const roles = await getAllRoles(buttonInteraction)
		const preSelected = await global.__BOT_DATA__.getArrayData(buttonInteraction.guildId as string, tieredRoleID)
		const roleSelectRows = await rolesToMessageComponent(tieredRoleID, roles, 'c', preSelected);

		let messageOptions: MessageOptions = { content: "Something's gone wrong!" };
		let pageNumber: number = parseFloat(buttonCustomID.p)

		switch (buttonCustomID.btn) {
			case ('p'):
				pageNumber--;
				messageOptions = constructMessageOptions(tieredRoleID, roleSelectRows, 'c', pageNumber);
				buttonInteraction.update(messageOptions as InteractionUpdateOptions)
				break;
			case ('n'):
				pageNumber++;
				messageOptions = constructMessageOptions(tieredRoleID, roleSelectRows, 'c', pageNumber);
				buttonInteraction.update(messageOptions as InteractionUpdateOptions)
				break;
			case ('a'):
				let tieredRole: Role = await buttonInteraction.guild?.roles.fetch(tieredRoleID) as Role
				buttonInteraction.update({ content: `Role group created for ${tieredRole.name}! You can dismiss this message.`, components: [] })
				break;
			default:
				break;
		}

	},

	async selectHandler(selectInteraction: SelectMenuInteraction) {
		const { customId, values, member } = selectInteraction
		const selectCustomID = JSON.parse(customId)
		const tieredRoleID = selectCustomID.tR

		const component = selectInteraction.component as MessageSelectMenu
		const removed = component.options.filter((option) => {
			return !values.includes(option.value)
		})

		let roleData = await global.__BOT_DATA__.getArrayData(selectInteraction.guildId as string, tieredRoleID)

		for (const option of removed) {
			if (roleData.indexOf(option.value) !== -1) roleData.splice(roleData.indexOf(option.value), 1);
		}
		for (const id of values) {
			if (roleData.indexOf(id) == -1) roleData.push(id);
		}

		await global.__BOT_DATA__.setArrayData(selectInteraction.guildId as string, tieredRoleID, roleData)
		selectInteraction.deferUpdate()
	}
}

async function getAllRoles(interaction: Interaction): Promise<Collection<string, Role>> {
	const guild = interaction.guild;
	if (guild == null) throw new Error("Are you in a guild?");
	// const guildRoles = (await guild.roles.fetch()).filter(r => !r.managed); // filter out managed roles (i.e. bots)
	const guildRoles = (await guild.roles.fetch())
	return guildRoles;
}