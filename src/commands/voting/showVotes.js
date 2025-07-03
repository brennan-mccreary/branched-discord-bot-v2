const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showvotes")
    .setDescription("Show voting standings")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    try {
      const votes = await client.fetchVotes(3);

      const embed = new EmbedBuilder()
        .setTitle("📊 Clip Voting Results")
        .setColor(0xffffff)
        
        votes.forEach((e, i) => {
            embed.addFields(
          { name: `Clip (${e.messageId})`, value: `https://discord.com/channels/705103840776683581/1368270934078656613/${e.messageId}`, inline: false },
          { name: "Votes", value: `${e.votes}`, inline: true },
          { name: "Rank", value: `#${i + 1}`, inline: true }
        )
        });
        
        embed.setTimestamp();
      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
