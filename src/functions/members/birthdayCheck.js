const Member = require("../../schemas/member");

module.exports = async (client) => {
  client.birthdayCheck = async () => {
    try {
      const today = new Date();
      const month = today.getMonth();
      const day = today.getDate();

      const birthdays = await Member.find({birthday: {month: month, day: day, isRecognized: true}})

      if (birthdays.length > 0) {
        const channel = client.channels.cache.get("1070892446478782526");

        birthdays.forEach((user) => {
          channel.send(`Happy birthday, <@${user.userId}>! 🎂`)
        })
      }
    } catch (err) {
      console.error(err);
    }
  };
};
