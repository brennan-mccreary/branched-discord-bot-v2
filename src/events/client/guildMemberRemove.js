const chalk = require("chalk");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Member Remove] [Id: ${member.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
