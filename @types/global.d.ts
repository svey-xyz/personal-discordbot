import type databaseHandler from "../src/database/databaseHandler";

declare global {
	var __BOT_DATA__: databaseHandler;
}

export { }