const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for kicking member.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: `Kicked ${user.tag}.`,
      ephemeral: true,
    });
  },
};
