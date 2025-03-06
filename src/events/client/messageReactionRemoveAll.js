const chalk = require("chalk");

module.exports = {
  name: "messageReactionRemoveAll",
  async execute(message) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Message Reaction Remove All] [Id: ${message.id}]`
      )
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
