const Guild = require("../../schemas/guild");
const chalk = require("chalk");

module.exports = async (client) => {
  client.updateGuild = async (oldGuild, newGuild) => {
    await Guild.findOneAndUpdate(
      { guildId: oldGuild.id },
      {
        guildId: newGuild.id,
        guildName: newGuild.name,
        guildIcon:
          "https://cdn.discordapp.com/icons/1070892444201271376/" + newGuild.icon,
      }
    )
      .then(async (res) => {
        console.log(chalk.blue(`[Guild Updated] GuildId: ${res.id}`));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
