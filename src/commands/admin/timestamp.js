const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timestamp")
    .setDescription("Generate timestamps")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unix")
        .setDescription("Generate a unix timestamp from a human readable date")
        .addIntegerOption((option) =>
          option.setName("month").setDescription("Month").setRequired(true)
        )
        .addIntegerOption((option) =>
          option.setName("day").setDescription("Day").setRequired(true)
        )
        .addIntegerOption((option) =>
          option.setName("year").setDescription("Year").setRequired(true)
        )
        .addIntegerOption((option) =>
          option.setName("hour").setDescription("Hour").setRequired(false)
        )
        .addIntegerOption((option) =>
          option.setName("minute").setDescription("Minute").setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("human")
        .setDescription("Generate a human timestamp from a unix timestamp")
        .addIntegerOption((option) =>
          option
            .setName("unix")
            .setDescription("Unix timestamp (milliseconds)")
            .setRequired(false)
        )
    ),
  async execute(interaction, client) {
    try {
      //Get subcommand group and current subcommand
      const subcommand = interaction.options.getSubcommand();

      //Determine code block for group and subcommand
      switch (subcommand) {
        case "unix":
          client.convertHumanToUnix(interaction, client);
          break;
        case "human":
          client.convertUnixToHuman(interaction, client);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
};
