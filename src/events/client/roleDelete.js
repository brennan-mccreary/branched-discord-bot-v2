const chalk = require("chalk");

module.exports = {
  name: "roleDelete",
  async execute(role, client) {
    console.log(chalk.cyan(`[Event Notice] [Role Delete] [Id: ${role.id}]`));

    try {
      // console.log(role)
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Role Deleted";
      const description = null;
      const color = "alert";
      const info = `*${role.name}*`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
