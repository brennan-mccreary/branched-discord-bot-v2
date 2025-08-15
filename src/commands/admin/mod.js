const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("Moderate members")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommandGroup((group) =>
      group
        .setName("comment")
        .setDescription("Manage user comments")
        .addSubcommand((sub) =>
          sub
            .setName("add")
            .setDescription("Add a comment to a user")
            .addUserOption((opt) =>
              opt
                .setName("user")
                .setDescription("User to comment on")
                .setRequired(true)
            )
            .addStringOption((opt) =>
              opt
                .setName("comment")
                .setDescription("Comment text")
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("view")
            .setDescription("View comments for a user")
            .addUserOption((opt) =>
              opt
                .setName("user")
                .setDescription("User to view comments for")
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("remove")
            .setDescription("Remove a comment from a user")
            .addUserOption((opt) =>
              opt
                .setName("user")
                .setDescription("User to remove comment from")
                .setRequired(true)
            )
            .addIntegerOption((opt) =>
              opt
                .setName("index")
                .setDescription("Comment index to remove")
                .setRequired(true)
            )
        )
    ),
  async execute(interaction, client) {
    try {
      //Get subcommand group and current subcommand
      const group = interaction.options.getSubcommandGroup();
      const subcommand = interaction.options.getSubcommand();

      //Determine code block for group and subcommand
      switch (group) {
        case "comment":
          if (subcommand === "add") {
            client.addModComment(interaction, client);
          } else if (subcommand === "view") {
            client.viewModComments(interaction, client);
          } else if (subcommand === "remove") {
            client.removeModComment(interaction, client);
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
