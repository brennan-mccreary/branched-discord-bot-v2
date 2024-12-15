const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Returns user balance")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you would like to view the balance of.")
    ),
  async execute(interaction, client) {
    const selectedUser =
      interaction.options.getUser("target") || interaction.user;
    const storedBalance = await client.getBalance(selectedUser.id);

    if (!storedBalance)
      return await interaction.reply({
        content: `${selectedUser.tag}, doesn't have a balance.`,
        ephemeral: true,
      });
    else {
      const embed = new EmbedBuilder()
        .setTitle(`${selectedUser.username}'s Balance`)
        .setTimestamp()
        .addFields([
          {
            name: `${storedBalance.balance} XP`,
            value: `\u200b`,
          },
        ])
        .setFooter({
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        });

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
