const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: "vc-hide",
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
          ViewChannel: false
        }
      );

      //Reply to confirm changes
      await interaction.reply({
        content: `👁️ Channel is hidden.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
