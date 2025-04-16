const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../schemas/guild");

module.exports = (client) => {
  client.unloadGlobalCommands = async () => {
    const clientId = "1077326128374628423";

    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      console.log(
        chalk.blue("Started unloading global application (/) commands.")
      );

      await rest.put(Routes.applicationCommands(clientId), {
        body: [],
      });
      console.log(`[Global Command Cache Unloaded]`);

      console.log(
        chalk.green("Successfully unloaded global application (/) commands.")
      );
    } catch (error) {
      console.error(error);
    }
  };
};
