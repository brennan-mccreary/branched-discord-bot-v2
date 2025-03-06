const chalk = require("chalk");

module.exports = {
  name: "error",
  async execute(error) {
    console.log(chalk.red(`[Error] [Info: ${error}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
