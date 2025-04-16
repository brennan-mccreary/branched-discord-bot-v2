const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../schemas/guild");

module.exports = (client) => {
  client.fetchGlobalCommands = async () => {
    const clientId = "1077326128374628423";

    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      const globalCommands = await rest.get(Routes.applicationCommands(clientId));
      console.log("[Global Commands]", globalCommands);

    } catch (error) {
      console.error(error);
    }
  };
};
