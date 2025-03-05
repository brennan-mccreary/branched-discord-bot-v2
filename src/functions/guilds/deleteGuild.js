const Guild = require("../../schemas/guild");
const chalk = require("chalk");

module.exports = async (client) => {
  client.deleteGuild = async (guild) => {
    await Guild.findOneAndDelete({ guildId: guild.id })
      .then((res) => {
        console.log(chalk.blue(`[Guild Deleted] GuildId: ${res.id}`));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
