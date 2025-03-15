module.exports = async (client) => {
  client.convertUnixToHuman = async (interaction, client) => {
    //Get variables
    const timestamp = interaction.options.getInteger("unix") ?? Date.now();
    const date = new Date(timestamp);


    //Reply
    await interaction.reply({
        content: `Timestamps:\n**Date:** __${date}__\n**Date** (localized): __${date.toLocaleDateString()}__`,
      });
  };
};
