const chalk = require("chalk");

module.exports = {
  name: "channelCreate",
  async execute(channel) {
    console.log(
      chalk.cyan(`[Event Notice] [Channel Create] [Id: ${channel.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
