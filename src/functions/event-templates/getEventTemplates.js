const EventTemplate = require("../../schemas/eventTemplate");

module.exports = (client) => {
  client.getEventTemplates = async (guild) => {
    const templates = await EventTemplate.find({guild: guild});

    if (!templates) return false;
    else return templates;
  };
};
