import { Command, SlashCommandBuilder, discordInterface } from "../command";
import { BaseCommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageActionRowComponent } from "discord.js";
import { IndexType } from "typescript";


const commandData: any = new SlashCommandBuilder()
	.setName('rolegroup')
	.setDescription("Manage role groups.")
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('create')
			.setDescription('Create a new role group.')
			.addStringOption(
				(option: any) =>
					option.setName('title')
						.setDescription('Title the role group.')
						.setRequired(true)
			)
	)
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('edit')
			.setDescription('Create a new role group.')
			.addStringOption(
				(option: any) =>
					option.setName('title')
						.setDescription('Title the role group.')
						.setRequired(true)
			)
	)


type MessageSelectOption = { label: string, description: string, value: string }
type MessageSelectOptions = Array<MessageSelectOption>

const reactionRole: Command = {
	data: commandData,
	async execute(client: Client, interaction: BaseCommandInteraction) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setDescription('Create a reaction role!')

		const guildRoles = await interaction.guild!.roles.fetch();

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
			rows.push(
				new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId(`select-${index}`)
							.setPlaceholder('Nothing selected')
							.addOptions(rolesArray)
							.setMinValues(1)
							// .setMaxValues(25)
					) 
			)
		});

		await interaction.reply({ embeds: [embed], ephemeral: true, components: [...rows]})
			.then(() => console.log('Reply sent.'))
			.catch(console.error);
	}
};

module.exports = reactionRole;