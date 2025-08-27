const Guild = require("../../schemas/guild");
const { MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  client.setConfiguration = async (interaction, subcommand, client) => {
    try {
      //data
      const guildId = interaction.guildId;
      const channel = interaction.options.getChannel("channel").id;

      switch (subcommand) {
        case "live":
          await Guild.findOneAndUpdate(
            { guildId: guildId },
            { $set: { "channels.live": channel } },
            { new: true, upsert: true }
          );

          return interaction.reply({
            content: `Updated configuration settings.`,
            flags: MessageFlags.Ephemeral,
          });
        case "logs":
          await Guild.findOneAndUpdate(
            { guildId: guildId },
            { $set: { "channels.logs": channel } },
            { new: true, upsert: true }
          );

          return interaction.reply({
            content: `Updated configuration settings.`,
            flags: MessageFlags.Ephemeral,
          });
        case "birthdays":
          await Guild.findOneAndUpdate(
            { guildId: guildId },
            { $set: { "channels.birthdays": channel } },
            { new: true, upsert: true }
          );

          return interaction.reply({
            content: `Updated configuration settings.`,
            flags: MessageFlags.Ephemeral,
          });
        case "interactive_voice":
          await Guild.findOneAndUpdate(
            { guildId: guildId },
            { $set: { "channels.interactiveVoice": channel } },
            { new: true, upsert: true }
          );

          return interaction.reply({
            content: `Updated configuration settings.`,
            flags: MessageFlags.Ephemeral,
          });
        case "voting":
          await Guild.findOneAndUpdate(
            { guildId: guildId },
            { $set: { "channels.voting": channel } },
            { new: true, upsert: true }
          );

          return interaction.reply({
            content: `Updated configuration settings.`,
            flags: MessageFlags.Ephemeral,
          });
        default:
          return interaction.reply({
            content: `No changes were made...`,
            flags: MessageFlags.Ephemeral,
          });
      }
    } catch (err) {
      console.error(err);

      return interaction.reply({
        content: `Error encountered: ${err}`,
        flags: MessageFlags.Ephemeral,
      });
    }
  };
};
