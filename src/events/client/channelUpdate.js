const chalk = require("chalk");

module.exports = {
  name: "channelUpdate",
  async execute(channel, newChannel) {
    console.log(
      chalk.cyan(`[Event Notice] [Channel Update] [Id: ${channel.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
