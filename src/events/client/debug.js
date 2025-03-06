const chalk = require("chalk");

module.exports = {
  name: "debug",
  async execute(debug) {
    console.log(chalk.blue(`[Debug] [Info: ${debug}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
