const EventTemplate = require("../../schemas/eventTemplate");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = async (client) => {
  client.addEventTemplate = async (name, channel, topic, description, cover_image) => {
    const existing = await EventTemplate.find({ name: name });
    if (existing.length > 0) return;

    const template = new EventTemplate({
      _id: new Types.ObjectId(),
      name: name,
      channel: channel.id,
      topic: topic,
      description: description ?? "",
      cover_image: cover_image.url ?? ""
    });

    await template
      .save()
      .then(async (res) => {
        console.log(chalk.blue(`[Event Template Created] Template: ${res._id}`));
      })
      .catch(console.error);
  };
};
