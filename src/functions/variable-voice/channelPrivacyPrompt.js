const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");

module.exports = async (client) => {
  client.channelPrivacyPrompt = async (channel, user) => {
    try {
      const embed = new EmbedBuilder()
        .setTitle("Temporary Voice Channel Controls")
        .setDescription(`This channel belongs to <@${user.id}>.\n-# It will automatically delete once everyone has disconnected.`)
        .addFields(
          { name: "🔓 Open", value: "This channel will be viewable and joinable by any member." },
          { name: "🔒 Closed", value: "Only members you move manually from the Waiting Room can access this channel.  Viewable by everyone." },
          { name: "👁️ Hidden", value: "This channel will be hidden and only members you move can access it or see it's activity." }
        )
        .setFooter({ text: `Use the buttons below to manage access.` })
        .setColor("Green");

      // Buttons
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`vc-open_${channel.id}`)
          .setLabel("🔓 Open")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`vc-close_${channel.id}`)
          .setLabel("🔒 Closed")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(`vc-hide_${channel.id}`)
          .setLabel("👁️ Hidden")
          .setStyle(ButtonStyle.Secondary)
      );

      // Send the panel in a text channel
      await channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error(err);
    }
  };
};
