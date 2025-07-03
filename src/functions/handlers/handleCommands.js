const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../schemas/guild");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);

        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());

        console.log(
          `Command: ${command.data.name} has been passed through the handler`
        );
      }
    }

    try {
      await client.unloadGlobalCommands()
      await client.unloadCommandsFromGuild()
    } catch (err) {
      console.error(err)
    }

    const clientId = "1077326128374628423";

    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );



    try {
      const { DEV_MODE_ENABLED } = process.env;

      if (DEV_MODE_ENABLED === "TRUE") {
        console.log(chalk.bgCyan("[DEV MODE ENABLED]"));
        const { DEV_GUILD_ID } = process.env;

        console.log(chalk.blue("Started refreshing application (/) commands."));
        await rest.put(
          Routes.applicationGuildCommands(clientId, DEV_GUILD_ID),
          {
            body: client.commandArray,
          }
        );
        console.log(`[Guild]: ${DEV_GUILD_ID}`);
        console.log(
          chalk.green("Successfully reloaded application (/) commands.")
        );
      } else {
        //For guild level commands use:
        const guilds = await Guild.find();

        console.log(chalk.blue("Started refreshing application (/) commands."));
        for (const guild of guilds) {
          await rest.put(
            Routes.applicationGuildCommands(clientId, guild.guildId),
            {
              body: client.commandArray,
            }
          );
          console.log(`[Guild]: ${guild.guildId}`);
        }

        console.log(
          chalk.green("Successfully reloaded application (/) commands.")
        );
        //For global level commands use:
        // await rest.put(Routes.applicationCommands(clientId), {
        //   body: client.commandArray,
        // });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
