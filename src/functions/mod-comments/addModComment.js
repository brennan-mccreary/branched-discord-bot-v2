const Member = require("../../schemas/member");
const { MessageFlags } = require("discord.js");

module.exports = async (client) => {
  client.addModComment = async (interaction, client) => {
    try {
      //Find member and update
      const executor = interaction.user.id;
      const date = new Date();
      const comment = {
        text: interaction.options.getString("comment"),
        timestamp: date.getTime(),
        addedBy: executor,
      };

      const member = await Member.findOneAndUpdate(
        {
          userId: interaction.options.getUser("user").id,
        },
        { $push: { "moderation.comments": comment } },
        { new: true, upsert: true }
      );

      return interaction.reply({
        content: `✅ Comment added.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error(err);

      return interaction.reply({
        content: `Error encountered: ${err}`,
        flags: MessageFlags.Ephemeral,
      });
    }
  };
};
