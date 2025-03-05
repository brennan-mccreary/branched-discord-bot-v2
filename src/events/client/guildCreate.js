const chalk = require("chalk");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(chalk.cyan(`[Event Notice] [Guild Create] [Id: ${guild.id}]`));

    try {
      //Add new guild to database
      await client.addGuild(guild);
    } catch (err) {
      console.log(err);
    }
  },
};
