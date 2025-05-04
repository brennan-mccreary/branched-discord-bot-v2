const chalk = require("chalk");

module.exports = {
  name: "messageDelete",
  async execute(message, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Message Delete] [Id: ${message.id}]`)
    );

    try {
      // console.log(message)
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Message Deleted";
      const description = null;
      const color = "alert";
      const info = `**Channel:** <#${message.channelId}>\n**Author:** <@${message.author.id}> `;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
