import { CommandInteraction, Message, Role } from "discord.js";
import databaseHandler from "src/databaseHandler";
import { rolesAsMessageRows } from "../functions/rolesAsMessageRows";



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

	const rows = await rolesAsMessageRows(commandInteraction, 1);
	await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole.name}!`, ephemeral: true, components: [...rows] })
		.then(async () => {

			const message: Message = <Message>(await commandInteraction.fetchReply())
			message.awaitMessageComponent({ filter, componentType: "SELECT_MENU", time: 60000 })
				.then(async (selectInteraction: any) => {
					await data.setArrayData(dataSet, tieredRole.id, selectInteraction.values)
					commandInteraction.editReply({ content: `Role group created for ${tieredRole.name}.`, components: [] })
				})
				.catch((err: any) => console.log(`No interactions were collected: `, err));
		})
		.catch(console.error);
}