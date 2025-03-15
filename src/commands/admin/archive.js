const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Archive & Delete")
    .setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    try {
      const date = new Date(
        interaction.targetMessage.createdTimestamp
      ).toLocaleDateString();
      const message = interaction.targetMessage.content;
      const authorIcon = interaction.targetMessage.author.displayAvatarURL();
      const authorName = interaction.targetMessage.author.globalName;
      const authorId = interaction.targetMessage.author.id;
      const channelId = "1350597987750903878";
      const archive_channel = await client.channels.fetch(channelId);

      const embed = new EmbedBuilder()
        .setTitle(`Archived Message`)
        .setDescription(`*${message}*`)
        .setColor(0xff0000)
        .setAuthor({
          iconURL: authorIcon,
          name: authorName,
        })
        .setFooter({
          iconURL: interaction.user.displayAvatarURL(),
          text: `Archived By: ${interaction.user.tag}`,
        });

      //Send archive embed
      archive_channel.send({ embeds: [embed] });
      //Reply
      await interaction.reply({
        content: `Post deleted and archived.  It is now available in <#${channelId}>`,
        flags: MessageFlags.Ephemeral,
      });

      setTimeout(() => {
        interaction.targetMessage.delete().catch(console.error);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  },
};
