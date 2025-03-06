const chalk = require("chalk");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Member Add] [Id: ${member.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
