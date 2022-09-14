export const { SlashCommandBuilder } = require('@discordjs/builders');


export const commandData: any = new SlashCommandBuilder()
	.setName('rolegroup')
	.setDescription("Manage role groups.")
	.addSubcommand((subcommand: any) =>
		subcommand
			.setName('create')
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
			.setName('edit')
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
			.setName('menu')
			.setDescription('Create a role group menu.')
			.addRoleOption(
				(option: any) =>
					option.setName('tiered-role')
						.setDescription('Role group head role.')
						.setRequired(true)
			)
	)