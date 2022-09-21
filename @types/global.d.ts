import type { databaseHandler } from "../src/databaseHandler";

declare global {
	var __BOT_DATA__: databaseHandler;
}

export { }