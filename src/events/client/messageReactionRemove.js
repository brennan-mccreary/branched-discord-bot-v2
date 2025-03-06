const chalk = require("chalk");

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Message Reaction Remove] [Id: ${reaction.message.id}]`
      )
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
