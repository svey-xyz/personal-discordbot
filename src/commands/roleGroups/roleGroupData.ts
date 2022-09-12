import { Guild, Role } from "discord.js";

export class roleGroup {
	tieredRole: Role

	constructor (tieredRole: Role) {
		this.tieredRole = tieredRole
	}
}