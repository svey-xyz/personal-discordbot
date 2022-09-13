import { Client, CommandInteraction, Message, MessageComponentInteraction, MessageEmbed, MessageInteraction, SelectMenuInteraction } from "discord.js";

import { Command } from "../../command";
import { commandData } from "./commandData"
import { rolesAsMessageRows } from "./functions/rolesAsMessageRows";
import databaseHandler from "../../databaseHandler";
import { ComponentType } from "discord-api-types/v9";

// const roleGroupStructure = {
// 	tieredRoleID: {
// 		type: DataTypes.UUID,
// 		unique: true,
// 	},
// 	roleIDs: {
// 		type: DataTypes.v,
// 		defaultValue: 0,
// 		allowNull: false,
// 	},
// }

const roleGroups: Command = {
	cmdData: commandData,
	async execute(client: Client, data: databaseHandler, commandInteraction: CommandInteraction) {


		const filter = (i:any) => {
			i.deferUpdate();
			return true;
			return i.user.id === commandInteraction.user.id;
		};

		const dataSet: string = `${commandInteraction.guildId}-roleGroups`
		// console.log(`Interaction: `, interaction)
		switch (commandInteraction.options.getSubcommand()) {
			case ('create'):
				const rows = await rolesAsMessageRows(commandInteraction, 1);
				const tieredRole = commandInteraction.options.getRole('tiered-role');
				data.addData(dataSet, tieredRole, new Array<string>)

				await commandInteraction.reply({ content: `Creating a role group for: ${tieredRole?.name}!`, ephemeral: true, components: [...rows] })
					.then(async() => {
						const message: Message = <Message>(await commandInteraction.fetchReply())
						message.awaitMessageComponent({ componentType: "SELECT_MENU", time: 60000 })
							.then(async(selectInteraction: any) => {
								let tieredRoleData = await data.getData(dataSet, tieredRole)
								const selectedRoles = selectInteraction.values;
								
								selectedRoles.forEach((role: string) => {
									if (tieredRoleData.indexOf(role) == -1) tieredRoleData.push(role)
								});
								commandInteraction.reply({ content: `Role group created for ${tieredRole?.name}.`, ephemeral: true })
							})
							.catch((err: any) => console.log(`No interactions were collected: `, err));
					})
					.catch(console.error);

				
				break;
			case ('edit'):
				break;
			default:
				break;
		}
		
	}
};

module.exports = roleGroups;
