const { MessageFlags } = require("discord.js");

module.exports = async (client) => {
  client.eventTemplateDelete = async (interaction, client) => {
    const name = interaction.options.getString("name");
    const template = await client.deleteEventTemplate(name);

    if (template) {
      return await interaction.reply({
        content: `Template deleted`,
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.reply({
        content: `I ran into some trouble deleting that template...`,
        flags: MessageFlags.Ephemeral,
      });
  };
};
