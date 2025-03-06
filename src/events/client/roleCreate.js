const chalk = require("chalk");

module.exports = {
  name: "roleCreate",
  async execute(role) {
    console.log(chalk.cyan(`[Event Notice] [Role Create] [Id: ${role.id}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
