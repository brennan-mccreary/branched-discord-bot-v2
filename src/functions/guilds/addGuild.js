const Guild = require("../../schemas/guild");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = async (client) => {
  client.addGuild = async (guild) => {
    let guilds = await Guild.find({ guildId: guild.id });
    if (guilds.length > 0) return;

    const server = new Guild({
      _id: new Types.ObjectId(),
      guildId: guild.id,
      guildName: guild.name,
      guildIcon: "https://cdn.discordapp.com/icons/1070892444201271376/" + guild.icon,
    });

    await server
      .save()
      .then(async (res) => {
        console.log(chalk.blue(`[Guild Created] GuildId: ${res.id}`));
      })
      .catch(console.error);
  };
};
