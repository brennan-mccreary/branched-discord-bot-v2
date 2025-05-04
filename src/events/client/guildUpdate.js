const chalk = require("chalk");

module.exports = {
  name: "guildUpdate",
  async execute(guild, newGuild, client) {
    console.log(chalk.cyan(`[Event Notice] [Guild Update] [Id: ${guild.id}]`));

    try {
      //Update guild in database
      await client.updateGuild(guild, newGuild);
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Guild Updated";
      const description = "-# An update was made to the guild.";
      const color = "notif";
      const info = null;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
