const {
    GuildScheduledEventPrivacyLevel,
    GuildScheduledEventEntityType,
    ChannelType
  } = require("discord.js");

module.exports = async (client) => {
  client.eventTemplateSchedule = async (interaction, client, isVoice) => {
    //Get name from command option, template from DB, and timestamp option or assign default
    //Default timestamp for event is +1 hour from command.
    const name = await interaction.options.getString("template");
    const description = await interaction.options.getString("description") ?? "";
    const template = await client.getEventTemplateByName(name);
    const timestamp =
      (await interaction.options.getInteger("timestamp")) ??
      Date.now() + 3600000;
    const channelData = interaction.guild.channels.cache.get(template.channel);


    //Check voice channel type
    var channelType;
    if(channelData.type === ChannelType.GuildVoice) {
      channelType = GuildScheduledEventEntityType.Voice
    } else if (channelData.type === ChannelType.GuildStageVoice) {
      channelType = GuildScheduledEventEntityType.StageInstance
    }

    //Create event 
    if (template) {
      const event = await interaction.guild.scheduledEvents.create({
        name: template.topic,
        description: template?.description + "\n\n" + description,
        scheduledStartTime: new Date(timestamp),
        scheduledEndTime: new Date(timestamp + 3600000),
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: channelType,
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

















