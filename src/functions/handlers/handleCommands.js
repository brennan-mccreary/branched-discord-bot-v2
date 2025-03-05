const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require("../../schemas/guild")

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

    const clientId = "1077326128374628423";
    // const guildId = "1121179513947181160";

    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      console.log(chalk.blue("Started refreshing application (/) commands."));

      // await rest.put(Routes.applicationCommands(clientId), {
      //   body: client.commandArray,
      // });

      //For single guild use:
      const guilds = await Guild.find();

      for (const guild of guilds) {
        await rest.put(Routes.applicationGuildCommands(clientId, guild.guildId), {
          body: client.commandArray,
        });
        console.log(`[Guild]: ${guild.guildId}`)
      }
      

      console.log(
        chalk.green("Successfully reloaded application (/) commands.")
      );
    } catch (error) {
      console.error(error);
    }
  };
};
