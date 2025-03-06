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
  },
};
