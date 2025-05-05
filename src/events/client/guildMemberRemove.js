const chalk = require("chalk");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    console.log(
      chalk.cyan(`[Event Notice] [Guild Member Remove] [Id: ${member.user.tag}]`)
    );

    try {
      // console.log(member);
    } catch (err) {
      console.log(err);
    }

    //Log event
    try {
      const channel = "1070892446478782526";
      const title = "Member Left";
      const description = null;
      const color = "alert";
      const info = `<@${member.id}> / ${member.user.tag}`;

      await client.logEvent(channel, title, description, color, info);
    } catch (err) {
      console.log(err);
    }
  },
};
