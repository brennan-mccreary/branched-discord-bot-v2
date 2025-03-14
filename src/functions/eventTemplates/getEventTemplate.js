const EventTemplate = require("../../schemas/eventTemplate");

module.exports = (client) => {
  client.getEventTemplates = async () => {
    const templates = await EventTemplate.find();

    if (!templates) return false;
    else return templates;
  };
};
