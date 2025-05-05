const chalk = require("chalk");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Member Add] [Id: ${member.id}]`)
    );

    try {
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Member Joined";
      const description = null;
      const color = "info";
      const info = `<@${member.id}>`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
