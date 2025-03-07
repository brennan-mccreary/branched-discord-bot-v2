const chalk = require("chalk");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Message Reaction Add] [Id: ${reaction.message.id}]`)
    );

    //Add 10xp to person for sending message
    try {
      await client.addBalance(user, 2);
    } catch (err) {
      console.log(err);
    }
  },
};
