const Member = require("../../schemas/member");
const { MessageFlags } = require("discord.js");

module.exports = async (client) => {
  client.removeModComment = async (interaction, client) => {
    try {
      //Pull index option
      const index = interaction.options.getInteger("index");

      //Find member and unset index
      const member = await Member.findOneAndUpdate(
        {
          userId: interaction.options.getUser("user").id,
        },
        { $unset: { [`moderation.comments.${index}`]: 1 } },
        { new: true, upsert: true }
      );

      //Remove null fields
      await member.updateOne(
        { $pull: { "moderation.comments": null } },
        { new: true }
      );

      //Reply
      return interaction.reply({
        content: `✅ Comment removed.`,
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
