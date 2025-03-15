const {
  SlashCommandBuilder,
  ChannelType,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
  MessageFlags,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Create events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommandGroup((group) =>
      group
        .setName("template")
        .setDescription("Event template interactions")
        //Schedule
        .addSubcommand((subcommand) =>
          subcommand
            .setName("schedule")
            .setDescription("Schedule an event from a template")
            .addStringOption((option) =>
              option
                .setName("template")
                .setDescription("Select a template")
                .setRequired(true)
                .setAutocomplete(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("timestamp")
                .setDescription("Unix timestamp for event start")
                .setRequired(false)
            )
        )
        //Create
        .addSubcommand((subcommand) =>
          subcommand
            .setName("create")
            .setDescription("Create an event template")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name for template")
                .setRequired(true)
            )
            .addChannelOption((option) =>
              option
                .setName("location")
                .setDescription("Event channel location")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
            )
            .addStringOption((option) =>
              option
                .setName("topic")
                .setDescription("Event topic")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("Event description")
                .setRequired(false)
            )
            .addAttachmentOption((option) =>
              option
                .setName("image")
                .setDescription("Event cover image")
                .setRequired(false)
            )
        )
        //Delete
        .addSubcommand((subcommand) =>
          subcommand
            .setName("delete")
            .setDescription("Delete an event template")
            .addStringOption((option) =>
              option
                .setName("name")
                .setDescription("Name of template")
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
    ),

  async autocomplete(interaction, client) {
    //Get typed value and subcommand
    const focusedValue = interaction.options.getFocused();
    const subcommand = interaction.options.getSubcommand();
    let choices = [];

    //Autocomplete switch for subcommand field
    switch (subcommand) {
      case "schedule":
      case "delete":
        const templates = await client.getEventTemplates(interaction.guildId);

        if (templates.length > 0) {
          templates.map((e) => {
            choices.push(e.name);
          });
        }
        break;
      default:
        break;
    }

    //Filter choice list by typed value
    const filtered = choices.filter((choice) =>
      choice.toLowerCase().startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    try {
      //Get subcommand group and current subcommand
      const group = interaction.options.getSubcommandGroup();
      const subcommand = interaction.options.getSubcommand();

      //Determine code block for group and subcommand
      switch (group) {
        case "template":
          if (subcommand === "create") {
            client.eventTemplateCreate(interaction, client);
          } else if (subcommand === "schedule") {
            client.eventTemplateSchedule(interaction, client);
          } else if (subcommand === "delete") {
            client.eventTemplateDelete(interaction, client);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
};
