const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Cast Vote")
    .setType(ApplicationCommandType.Message),
  async execute(interaction, client) {
    //Channel restriction
    try {
      const ALLOWED_CHANNEL = "1368270934078656613";
      if (interaction.channelId !== ALLOWED_CHANNEL) {
        return interaction.reply({
          content:
            "❌ You can only use this command in the designated channel.",
          ephemeral: true,
        });
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const message = interaction.targetMessage;
      const user = interaction.user.id;
      const vote = await client.addVote(message, user);

      //Reply
      // if (vote) {
      //   await interaction.reply({
      //     content: `Vote cast!`,
      //     flags: MessageFlags.Ephemeral,
      //   });
      // }
      //else {
      //   await interaction.reply({
      //     content: `You have already voted for this clip...`,
      //     flags: MessageFlags.Ephemeral,
      //   });
      // }

      await interaction.reply({
        content: `Vote cast!`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
