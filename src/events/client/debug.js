const chalk = require("chalk");
const { DEBUG } = process.env;
module.exports = {
  name: "debug",
  async execute(debug) {
    if (DEBUG === "TRUE") {
      console.log(chalk.blue(`[Debug] [Info: ${debug}]`));
    }
    

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
