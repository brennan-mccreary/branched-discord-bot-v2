const chalk = require("chalk");

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user, client) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Message Reaction Remove] [Id: ${reaction.message.id}]`
      )
    );

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Message Reaction Removed";
      const description = null;
      const color = "alert";
      const info = `**Channel:** <#${message.channelId}>\n**Author:** <@${message.author.id}> `;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
