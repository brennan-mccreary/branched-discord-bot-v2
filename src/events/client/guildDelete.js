const chalk = require("chalk");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Delete] [Id: ${guild.id}]`)
    );

    try {
      //Add new guild to database
      await client.deleteGuild(guild);
    } catch (err) {
      console.log(err);
    }
  },
};
