const EventTemplate = require("../../schemas/eventTemplate");

module.exports = async (client) => {
  client.deleteEventTemplate = async (name) => {
    const template = await EventTemplate.findOneAndDelete({ name: name })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error;
      });

    return template;
  };
};
