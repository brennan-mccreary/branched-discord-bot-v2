require("dotenv").config();

const { MONGO_DB } = process.env;
const { DISCORD_BOT_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { connect } = require("mongoose");
const fs = require("fs");
const twitch = require("./twitch/twitch-bot");
const sendLiveNotification = require("./functions/twitch-interactions/sendLiveNotification");

//New Discord App Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

//Declare collections for discord app
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

client.color = "";

//Get all folders from src/functions then grab files and call functions in js files.
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    console.log(`Function: ${file} has passed through onboarding`);
    require(`./functions/${folder}/${file}`)(client);
  }
}

//Grab event handlers, commands, and components
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(DISCORD_BOT_TOKEN);

//Connect DB
(async () => {
  await connect(MONGO_DB).catch(console.error);
})();

//Start twitch listener server
twitch(client)
