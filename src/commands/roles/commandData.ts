import { SlashCommandBuilder } from '@discordjs/builders';

export const commandData: any = new SlashCommandBuilder()
	.setName('roles')
	.setDescription("Manage roles.")
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('group')
			.setDescription('Create a new role group.')
			.addRoleOption(
				(option: any) =>
					option.setName('tiered-role')
						.setDescription('The role to rule them all.')
						.setRequired(true)
			)
	)
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('menu')
			.setDescription('Create a role group menu.')
			.addRoleOption(
				(option: any) =>
					option.setName('tiered-role')
						.setDescription('Role group head role.')
						.setRequired(true)
			)
	)