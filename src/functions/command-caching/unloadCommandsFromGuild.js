const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../schemas/guild");

module.exports = (client) => {
  client.unloadCommandsFromGuild = async (guildId) => {
    const clientId = "1077326128374628423";

    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      console.log(
        chalk.blue("Started unloading guild application (/) commands.")
      );

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: [],
      });
      console.log(`[Guild Command Cache Unloaded]: ${guildId}`);

      console.log(
        chalk.green("Successfully unloaded guild application (/) commands.")
      );
    } catch (error) {
      console.error(error);
    }
  };
};
