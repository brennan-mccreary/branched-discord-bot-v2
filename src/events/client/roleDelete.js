const chalk = require("chalk");

module.exports = {
  name: "roleDelete",
  async execute(role) {
    console.log(chalk.cyan(`[Event Notice] [Role Delete] [Id: ${role.id}]`));

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
