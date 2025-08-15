const Member = require("../../schemas/member");
const { MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  client.viewModComments = async (interaction, client) => {
    try {
      //Find member
      const member = await Member.findOne({
        userId: interaction.options.getUser("user").id,
      });
      console.log(member);

      //Extract comments
      const comments = member.moderation.comments;

      //Build embed
      const embed = new EmbedBuilder()
        .setTitle(`Moderator Comments`)
        .addFields(
          comments.map((el, i) => {
            return {
              name: `Comment [${i}] - ${el.addedBy}`,
              value: `"${el.text}"`,
            };
          })
        )
        .setFooter({ text: `Total comments: ${comments.length}` });

      //Reply
      return interaction.reply({
        content: `Displaying Comments for ${member.userId}`,
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
