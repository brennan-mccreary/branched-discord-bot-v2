const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: "vc-close",
  },
  async execute(interaction, client) {
    try {
      //Split channel id from button customId
      const option = interaction.customId.split("_")[1];

      //Get voice channel
      const voiceChannel = interaction.guild.channels.cache.get(option);

      //Change permissions
      await voiceChannel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          Connect: false,
          SendMessages: false,
          ViewChannel: true,
        }
      );

      //Reply to confirm changes
      await interaction.reply({
        content: `🔒  Channel is closed.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
