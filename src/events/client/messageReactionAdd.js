const chalk = require("chalk");

module.exports = {
  name: "messageReactionAdd",
  async execute(message) {
    console.log(
      chalk.cyan(`[Event Notice] [Message Reaction Add] [Id: ${message.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
