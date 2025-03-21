const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Manage member birthdays")
    .addStringOption((option) =>
      option
        .setName("month")
        .setDescription("Enter the month")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("day").setDescription("Enter the day").setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Enter the target user")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("recognition")
        .setDescription("Would you like us to recognize this birthday?")
        .setRequired(false)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October", 
      "November", 
      "December",
    ];
    const filtered = choices.filter((choice) =>
      choice.toLowerCase().startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    try {
      //Capture inputs
      const user = interaction.options.getUser("target") ?? interaction.user;
      const month = interaction.options.getString("month") ?? "January";
      const day = interaction.options.getInteger("day") ?? 1;
      const isRecognized =
        interaction.options.getBoolean("recognition") ?? false;

      //Resolve month maximum
      const monthInfo = await client.resolveMonth(month);

      //Guard clauses
      if (monthInfo.month === null) {
        return interaction.reply("I ran into an issue resolving that month...");
      } else if (day > monthInfo.max) {
        return interaction.reply("That doesn't seem to be a valid date...");
      }

      //Update user in db
      client.setMemberBirthday(user, monthInfo.month, day, isRecognized);

      //Generate embed from custom component ref
      const embed = new EmbedBuilder()
        .setTitle(`Birthday Saved`)
        .setDescription(`I will update ${user}'s member profile!`)
        .setColor(0x15b740)
        .setFooter({
          iconURL: interaction.user.displayAvatarURL(),
          text: interaction.user.tag,
        })
        .addFields([
          {
            name: `Birthday`,
            value: `${monthInfo.monthName} ${day}`,
            inline: true,
          },
          {
            name: `Recognize`,
            value: `${isRecognized}`,
            inline: true,
          },
        ]);

      //Reply
      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      console.error(err);
    }
  },
};
