const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(chalk.cyan(`[Event Notice] [Ready] [Id: ${client.id} online]`));

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
