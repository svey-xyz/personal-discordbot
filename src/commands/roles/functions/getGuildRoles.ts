import { Collection, Interaction, Role } from "discord.js";

export async function getGuildRoles(interaction: Interaction): Promise<Collection<string, Role>> {
	const guild = interaction.guild;
	if (guild == null) throw new Error("Are you in a guild?");
	const guildRoles = (await guild.roles.fetch()).filter(r => !r.managed); // filter out managed roles (i.e. bots)
	// const guildRoles = (await guild.roles.fetch())
	return guildRoles;
}