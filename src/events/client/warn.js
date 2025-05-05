const chalk = require("chalk");

module.exports = {
  name: "warn",
  async execute(warning, client) {
    console.log(chalk.yellow(`[Warning] [Info: ${warning}]`));

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Warn";
      const description = null;
      const color = "warn";
      const info = `${warning}`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
