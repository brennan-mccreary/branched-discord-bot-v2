const chalk = require("chalk");

module.exports = {
  name: "guildMemberUpdate",
  async execute(member, newMember) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Member Update] [Id: ${member.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
