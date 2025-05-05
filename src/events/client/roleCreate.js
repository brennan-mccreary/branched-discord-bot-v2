const chalk = require("chalk");

module.exports = {
  name: "roleCreate",
  async execute(role, client) {
    console.log(chalk.cyan(`[Event Notice] [Role Create] [Id: ${role.id}]`));

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Role Created";
      const description = null;
      const color = "info";
      const info = `<@&${role.id}>`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
