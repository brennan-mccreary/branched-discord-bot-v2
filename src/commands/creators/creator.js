const Creator = require("../../schemas/creator");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("creator")
    .setDescription("Create or view content creator profiles.")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Subcommand action.")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["create", "read", "update", "delete"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString("action");

    switch (option) {
      case "create":
        await interaction.reply({ content: `You told me '${option}'` });
        break;
      case "read":
        await interaction.reply({ content: `You told me '${option}'` });
        break;
      case "update":
        await interaction.reply({ content: `You told me '${option}'` });
        break;
      case "delete":
        await interaction.reply({ content: `You told me '${option}'` });
        break;
      default:
        await interaction.reply({ content: `Invalid operation.` });
        break;
    }
  },
};
