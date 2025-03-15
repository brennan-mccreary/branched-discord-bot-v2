const {
    GuildScheduledEventPrivacyLevel,
    GuildScheduledEventEntityType,
  } = require("discord.js");

module.exports = async (client) => {
  client.eventTemplateSchedule = async (interaction, client) => {
    //Get name from command option, template from DB, and timestamp option or assign default
    //Default timestamp for event is +1 hour from command.
    const name = await interaction.options.getString("template");
    const template = await client.getEventTemplateByName(name);
    const timestamp =
      (await interaction.options.getInteger("timestamp")) ??
      Date.now() + 3600000;

    //Create event 
    if (template) {
      const event = await interaction.guild.scheduledEvents.create({
        name: template.topic,
        description: template?.description,
        scheduledStartTime: new Date(timestamp),
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.Voice,
        channel: template.channel,
        image: template?.cover_image,
      });
      return await interaction.reply(
        `Event created:\n[${event.name}](${event.url})`
      );
    }

    //Error response
    await interaction.reply(
      `I ran into some trouble creating that event...`
    );
  };
};

















