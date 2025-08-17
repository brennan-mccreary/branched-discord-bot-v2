const Member = require("../../schemas/member");
const { MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  client.viewModStrikes = async (interaction, client) => {
    try {
      //Find member
      const member = await Member.findOne({
        userId: interaction.options.getUser("user").id,
      });

      //Extract comments
      const strikes = member.moderation.strikes;

      //Build embed
      const embed = new EmbedBuilder().setTitle(`Moderator Strikes`).addFields({
        name: `Strikes`,
        value: `${strikes}`,
      });

      //Reply
      return interaction.reply({
        content: `Displaying Strikes for ${member.userId}`,
        embeds: [embed],
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
