const Member = require("../../schemas/member");
const { MessageFlags } = require("discord.js");

module.exports = async (client) => {
  client.addModStrike = async (interaction, client) => {
    try {
      //Find member and update
      const member = await Member.findOneAndUpdate(
        {
          userId: interaction.options.getUser("user").id,
        },
        { $inc: { "moderation.strikes": 1 } },
        { new: true, upsert: true }
      );

      //Send mod log message
      //
      //

      return interaction.reply({
        content: `✅ Strike issued.`,
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
