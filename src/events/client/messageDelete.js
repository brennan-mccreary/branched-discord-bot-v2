const chalk = require("chalk");

module.exports = {
  name: "messageDelete",
  async execute(message) {
    console.log(chalk.cyan(`[Event Notice] [Message Delete] [Id: ${message.id}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
