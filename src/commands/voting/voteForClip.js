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
