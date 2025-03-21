const Member = require("../../schemas/member");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = async (client) => {
  client.addMember = async (user) => {
    try {
      const member = await Member.findOne({ userId: user.id });
      if (member) return;

      const newMember = new Member({
        _id: new Types.ObjectId(),
        userId: user.id,
        balance: 0,
      });

      await newMember
        .save()
        .then(async (res) => {
          console.log(chalk.blue(`[Member Created] MemberId: ${res.id}`));
        })
        .catch(console.error);

      return newMember;
    } catch (err) {
      console.error(err);
    }
  };
};
