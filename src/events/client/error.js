const chalk = require("chalk");

module.exports = {
  name: "error",
  async execute(error, client) {
    console.log(chalk.red(`[Error] [Info: ${error}]`));

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Error";
      const description = null;
      const color = "alert";
      const info = `${error}`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
