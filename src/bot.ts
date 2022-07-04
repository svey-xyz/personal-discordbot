import { Client, Intents } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const dotenv = require('dotenv');
dotenv.config()

const token: string = (String)(process.env.DISCORD_TOKEN);
const prefix: string = 'x!';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

ready(client);
interactionCreate(client);

client.login(token)


// https://discord.com/api/oauth2/authorize?client_id=992148264356941844&permissions=1644971949559&scope=bot%20applications.commands