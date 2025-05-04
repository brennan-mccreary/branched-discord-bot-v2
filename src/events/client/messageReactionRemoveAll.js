const chalk = require("chalk");

module.exports = {
  name: "messageReactionRemoveAll",
  async execute(message, x, client) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Message Reaction Remove All] [Id: ${message.id}]`
      )
    );

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "All Message Reactions Removed";
      const description = null;
      const color = "alert";
      const info = `**Channel:** <#${message.channelId}>\n**Author:** <@${message.author.id}> `;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
