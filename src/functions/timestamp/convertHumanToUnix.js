module.exports = async (client) => {
  client.convertHumanToUnix = async (interaction, client) => {
    //Get variables
    const month = interaction.options.getInteger("month") - 1;
    const day = interaction.options.getInteger("day");
    const year = interaction.options.getInteger("year");
    const hour = interaction.options.getInteger("hour") ?? 12;
    const minute =
      Math.round(interaction.options.getInteger("minute") / 15) * 15 ?? 0;

    //Generate date
    const date = new Date(year, month, day, hour, minute);
    const seconds = date.getTime() / 1000;
    const milliseconds = date.getTime();

    //Reply
    await interaction.reply({
        content: `Timestamps:\n**Seconds:** __${seconds}__\n**Milliseconds:** __${milliseconds}__`,
      });
  };
};
