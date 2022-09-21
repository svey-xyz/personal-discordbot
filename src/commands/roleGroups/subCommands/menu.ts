import { CommandInteraction, GuildMember, Message, MessageSelectMenu, Role, SelectMenuInteraction } from "discord.js";
import { SubCommand } from "src/subCommand";
import { constructMessageOptions } from "../functions/messageConstructor";
import { rolesToMessageComponent } from "../functions/rolesAsMessageRows";

export const menu: SubCommand = {
	async execute(commandInteraction: CommandInteraction) {
		const tieredRole: Role = commandInteraction.options.getRole('tiered-role') as Role;
		const tieredRoleID: string = tieredRole.id

		// Handle existing data
		if (!(await global.__BOT_DATA__.hasData(commandInteraction.guildId as string, tieredRole.id))) {
			commandInteraction.reply({
				content: `No 'Role Group' exists for: ${tieredRole.name}! Try creating one first.`, ephemeral: true
			})
			return;
		}

		const roleGroup = await global.__BOT_DATA__.getArrayData(commandInteraction.guildId as string, tieredRole.id)
		if (roleGroup.length > 0) {
			const groupRoles = await roleIDsToRolesArray(roleGroup, commandInteraction)
			const roleSelectRows = await rolesToMessageComponent(tieredRoleID, groupRoles, 'm');
			const messageOptions = constructMessageOptions(tieredRoleID, roleSelectRows, 'm')

			await commandInteraction.channel?.send({ content: `Role menu for: ${tieredRole.name}!`, components: messageOptions.components })
			await commandInteraction.reply({ content: `Role menu created for ${tieredRole.name}! You can dismiss this message.`, ephemeral: true })
		} else {
			await commandInteraction.reply({ content: `No group exists for that role! Try creating one first.`, ephemeral: true })
		}
	},

	async selectHandler(selectInteraction: SelectMenuInteraction) {
		const guild = selectInteraction.guild;
		if (guild == null) throw new Error("Are you in a guild?");

		const { values, member, customId } = selectInteraction
		const selectCustomID = JSON.parse(customId)
		const tieredRoleID = selectCustomID.tR
		const tieredRole: Role = await guild.roles.fetch(tieredRoleID) as Role
		const roleGroupRoles = await global.__BOT_DATA__.getArrayData(selectInteraction.guildId as string, tieredRoleID)


		// const guildRoles = (await guild.roles.fetch()).filter(r => !r.managed); // filter out managed roles (i.e. bots)
		const component = selectInteraction.component as MessageSelectMenu
		const removed = component.options.filter((option) => {
			return !values.includes(option.value)
		})

		for (const option of removed) {
			const role: Role | null = await guild.roles.fetch(option.value);
			if (role !== null) (member as GuildMember).roles.remove(role);
		}

		for (const id of values) {
			const role: Role | null = await guild.roles.fetch(id);
			if (role !== null) (member as GuildMember).roles.add(role);
		}

		(member as GuildMember).roles.remove(tieredRole);
		for (const role of roleGroupRoles) {
			if ((member as GuildMember).roles.cache.has(role)) {
				(member as GuildMember).roles.add(tieredRole);
				break;
			}
		}

		selectInteraction.reply({ content: 'Roles updated!', ephemeral: true })
	}
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

