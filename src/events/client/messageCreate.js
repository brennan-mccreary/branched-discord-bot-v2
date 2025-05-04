const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Message Create] [Id: ${message.id}]`)
    );

    //Add 10xp to person for sending message
    try {
      await client.addBalance(message.author, 10);
    } catch (err) {
      console.log(err);
    }

  },
};
