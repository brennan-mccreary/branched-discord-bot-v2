const {
  SlashCommandBuilder,
  ChannelType,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Create events")
    .addSubcommandGroup((group) =>
      group
        .setName("template")
        .setDescription("Event template interactions")
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
        )
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
    ),

  async autocomplete(interaction, client) {
    //Get typed value and subcommand
    const focusedValue = interaction.options.getFocused();
    const subcommand = interaction.options._subcommand;
    let choices = [];

    //Autocomplete switch for subcommand field
    switch (subcommand) {
      case "schedule":
        const templates = await client.getEventTemplates();

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
            //Get variables
            const name = interaction.options.getString("name");
            const channel = interaction.options.getChannel("location");
            const topic = interaction.options.getString("topic");
            const description =
              interaction.options.getString("description") ?? "";
            const image = interaction.options.getAttachment("image") ?? "";

            //Post template to db
            await client.addEventTemplate(
              name,
              channel,
              topic,
              description,
              image
            );

            await interaction.reply({
              content: `# Template Created\n## Name: ${name}\n### Topic: ${topic}`,
            });
          } else if (subcommand === "schedule") {
            const name = await interaction.options.getString("template");
            const template = await client.getEventTemplateByName(name);
            if (template) {
                const event = await interaction.guild.scheduledEvents.create({
                    name: template.topic,
                    description: template?.description,
                    scheduledStartTime: new Date(Date.now() + 3600000),
                    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
                    entityType: GuildScheduledEventEntityType.Voice,
                    channel: template.channel,
                    image: template?.cover_image,
                  });
                  return await interaction.reply(`✅ Event created: ${event.url}`);
            }
            await interaction.reply(`I ran into some trouble creating that event...`);
          }
          break;
        case "":
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
};
