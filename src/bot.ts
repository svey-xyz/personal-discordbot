import { Client, Intents } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const dotenv = require('dotenv');
dotenv.config()

const token: string = (String)(process.env.DISCORD_TOKEN);

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

ready(client);
interactionCreate(client);

client.login(token)


// https://discord.com/api/oauth2/authorize?client_id=992148264356941844&permissions=1644971949559&scope=bot%20applications.commands