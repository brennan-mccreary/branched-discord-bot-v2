const EventTemplate = require("../../schemas/eventTemplate");

module.exports = (client) => {
  client.getEventTemplateByName = async (name) => {
    let template = await EventTemplate.findOne({ name: name });

    if (!template) return false;
    else return template;
  };
};
