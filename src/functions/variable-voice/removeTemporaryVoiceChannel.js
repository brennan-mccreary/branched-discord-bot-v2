const { ChannelType } = require("discord.js");

module.exports = async (client) => {
  client.removeTemporaryVoiceChannel = async (voiceState, client) => {
    try {
      const channel = voiceState.channel;

      if (
        channel.type === ChannelType.GuildVoice &&
        channel.members.size === 0 &&
        channel.name.endsWith("'s VC") // identify temp channels
      ) {
        try {
          await channel.delete("Temporary VC emptied");
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
};
