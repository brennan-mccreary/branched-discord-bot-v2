require('dotenv').config();

const { DISCORD_BOT_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.commands = new Collection();
client.commandArray = [];

client.colour = "";

//Get all folders from src/functions then grab files and call functions in js files.
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(DISCORD_BOT_TOKEN);