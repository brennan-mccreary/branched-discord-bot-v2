const {
    MessageFlags,
  } = require("discord.js");

module.exports = async (client) => {
  client.eventTemplateCreate = async (interaction, client) => {
    //Get variables
    const name = interaction.options.getString("name");
    const channel = interaction.options.getChannel("location");
    const topic = interaction.options.getString("topic");
    const description =
      interaction.options.getString("description") ?? "";
    const image = interaction.options.getAttachment("image") ?? "";

    //Post template to db
    const template = await client.addEventTemplate(
      name,
      channel,
      topic,
      description,
      image,
      interaction.guildId
    );

    if (template) {
      await interaction.reply({
        content: `Template Created\nName: ${name}\nTopic: ${topic}`,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: `I ran into some trouble creating that event...`,
        flags: MessageFlags.Ephemeral,
      });
    }
  };
};

















