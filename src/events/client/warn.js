const chalk = require("chalk");

module.exports = {
  name: "warn",
  async execute(warning) {
    console.log(chalk.yellow(`[Warning] [Info: ${warning}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
