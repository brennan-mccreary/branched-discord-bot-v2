const { ChannelType, PermissionFlagsBits } = require("discord.js");

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
            id: guild.roles.everyone.id, // deny @everyone
            allow: [
              PermissionFlagsBits.Speak,
              PermissionFlagsBits.UseVAD,
              PermissionFlagsBits.Stream,
              PermissionFlagsBits.ViewChannel
            ],
            deny: [
              PermissionFlagsBits.Connect,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.UseEmbeddedActivities,
              PermissionFlagsBits.ReadMessageHistory
            ],
          },
          {
            id: user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.Connect,
              PermissionFlagsBits.Speak,
              PermissionFlagsBits.Stream,
              PermissionFlagsBits.MoveMembers,
              PermissionFlagsBits.UseVAD,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.MuteMembers
            ],
            deny: [
              PermissionFlagsBits.CreateEvents
            ]
          },
        ],
      });

      //Check user is connected
      if (!member.voice.channel) {
        return console.log("❌ User is not in a voice channel.");
      }

      //Move the member into the new channel
      await member.voice.setChannel(channel);

      //Invoke privacy control panel
      client.channelPrivacyPrompt(channel, user)
    } catch (err) {
      console.error(err);
    }
  };
};
