const chalk = require("chalk");

module.exports = {
  name: "messageUpdate",
  async execute(message, newMessage) {
    console.log(
      chalk.cyan(`[Event Notice] [Message Update] [Id: ${message.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
