const chalk = require("chalk");

module.exports = {
  name: "channelDelete",
  async execute(channel) {
    console.log(
      chalk.cyan(`[Event Notice] [Channel Delete] [Id: ${channel.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
