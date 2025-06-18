const chalk = require("chalk");
const cron = require("node-cron");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(chalk.cyan(`[Event Notice] [Ready] [${client.user.username} online]`));

    //Birthday check
    try {
      cron.schedule("0 19 * * *", client.birthdayCheck)
    } catch (err) {
      console.log(err);
    }

    //Presence cycler
    try {
      setInterval(client.pickPresence, 10000);
    } catch (err) {
      console.log(err);
    }

    //Youtube Video RSS Feed checker
    try {
      // setTimeout(client.checkVideo, 5000)
    } catch (err) {
      console.log(err);
    }
  },
};
