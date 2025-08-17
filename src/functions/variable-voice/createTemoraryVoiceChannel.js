const guild = require("../../schemas/guild");
const Guild = require("../../schemas/guild");
const {
  MessageFlags,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = async (client) => {
  client.createTemporaryVoiceChannel = async (voiceState, client) => {
    try {
      //Resolve discord id's
      const guild = await client.getGuild(voiceState.guild.id, client);
      const user = await client.getUser(voiceState.id, client);
      const member = await guild.members.fetch(user.id);
      const category = voiceState.channel.parentId;

      //Create voice channel
      const channel = await guild.channels.create({
        name: `${member.nickname ?? user.username}'s VC`,
        type: ChannelType.GuildVoice,
        parent: category,
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            allow: [PermissionFlagsBits.Connect],
          },
          {
            id: user.id,
            allow: [
              PermissionFlagsBits.Connect,
              PermissionFlagsBits.Speak,
              PermissionFlagsBits.ManageChannels,
            ],
          },
        ],
      });

      //Check user is connected
      if (!member.voice.channel) {
        return console.log("❌ User is not in a voice channel.");
      }

      //Move the member into the new channel
      await member.voice.setChannel(channel);
    } catch (err) {
      console.error(err);
    }
  };
};
