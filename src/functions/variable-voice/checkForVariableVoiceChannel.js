const Guild = require("../../schemas/guild");

module.exports = async (client) => {
  client.checkForVariableVoiceChannel = async (
    channelId,
    guildInfo,
    client
  ) => {
    try {
      //Find guild
      const guild = await Guild.findOne({
        guildId: guildInfo.id,
      });

      //Extract channels
      const channels = guild.channels;

      //Check variable voice channel id
      if (channels.interactiveVoice == channelId) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };
};
