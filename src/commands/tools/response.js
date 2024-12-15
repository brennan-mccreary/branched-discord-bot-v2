const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("response")
    .setDescription("Returns command method responses."),
  async execute(interaction, client) {
    // Normal reply
    await interaction.reply({
      content: "This is a normal reply",
    });

    // // Ephemeral reply
    // await interaction.reply({
    //     content: "This is a normal reply",
    //     ephemeral: true
    //   });

    // // Edit reply
    // await interaction.reply({
    //   content: "This is a normal reply",
    // });
    // await interaction.editReply({
    //   content: "This is a edited reply",
    // });

    // // Deferred reply
    // await interaction.deferReply({
    //     ephemeral: true ,
    // });
    // await interaction.editReply({
    //     content: "This is a deferred reply",
    //     ephemeral: true
    // });

    // // Follow-up reply
    // await interaction.reply({
    //     content: "This is a normal reply",
    // });

    // await interaction.follwUp({
    //     content: "This is a follow-up reply",
    // });

    // // Deleted Reply
    // await interaction.reply({
    //     content: "This is a normal reply",
    // });

    // await interaction.deleteReply();

    // // Fetching replies
    // const message = await interaction.reply({
    //     content: "This is a normal reply",
    //     fetchReply: true
    // });
    // console.log(message);

    // // Localized reply
    // const locales = {
    //   de: "Hallow Welt!",
    //   "en-US": "Hello World!",
    // };
    // await interaction.reply({
    //   content: locales[interaction.locale] ?? "Hello World!",
    // });
  },
};
