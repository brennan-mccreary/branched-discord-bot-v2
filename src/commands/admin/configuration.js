const {
  PermissionFlagsBits,
  ChannelType,
  SlashCommandBuilder,
  MessageFlags
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("configuration")
    .setDescription("Configuration settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommandGroup((group) =>
      group
        .setName("set")
        .setDescription("Set configuration settings")
        //Live
        .addSubcommand((subcommand) =>
          subcommand
            .setName("live")
            .setDescription("Configure live messages")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Select a text channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
        //Logs
        .addSubcommand((subcommand) =>
          subcommand
            .setName("logs")
            .setDescription("Configure log messages")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Select a text channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
        //Birthdays
        .addSubcommand((subcommand) =>
          subcommand
            .setName("birthdays")
            .setDescription("Configure birthday messages")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Select a text channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
        //Interactive Voice
        .addSubcommand((subcommand) =>
          subcommand
            .setName("interactive_voice")
            .setDescription("Configure interactive voice lobbies")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Select a template")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
            )
        )
        //Voting
        .addSubcommand((subcommand) =>
          subcommand
            .setName("voting")
            .setDescription("Configure voting messages")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Select a text channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
    ),

  //   async autocomplete(interaction, client) {
  //     //Get typed value and subcommand
  //     const focusedValue = interaction.options.getFocused();
  //     const subcommand = interaction.options.getSubcommand();
  //     let choices = [];

  //     //Autocomplete switch for subcommand field
  //     switch (subcommand) {
  //       case "schedule":
  //       case "delete":
  //         if (templates.length > 0) {
  //           templates.map((e) => {
  //             choices.push(e.name);
  //           });
  //         }
  //         break;
  //       default:
  //         break;
  //     }

  //     //Filter choice list by typed value
  //     const filtered = choices.filter((choice) =>
  //       choice.toLowerCase().startsWith(focusedValue)
  //     );

  //     await interaction.respond(
  //       filtered.map((choice) => ({ name: choice, value: choice }))
  //     );
  //   },
  async execute(interaction, client) {
    try {
      //Get subcommand group and current subcommand
      const group = interaction.options.getSubcommandGroup();
      const subcommand = interaction.options.getSubcommand();

      //Determine code block for group and subcommand
      switch (group) {
        case "set":
          client.setConfiguration(interaction, subcommand, client);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);

      return interaction.reply({
        content: `Error encountered: ${err}`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
