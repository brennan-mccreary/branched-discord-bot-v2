const Member = require("../../schemas/member");
const { Types } = require("mongoose");

module.exports = async (client) => {
    client.setMemberBirthday = async (user, month, day, isRecognized) => {
      try {
        let member = await Member.findOne({ userId: user.id });
        if (!member) {
          member = await client.addMember(user);
        }

        await member.updateOne({birthday: {month: month, day: day, isRecognized: isRecognized}})
      } catch (err) {
        console.error(err);
      }
    };
  };
  