const ClipVote = require("../../schemas/clipVote");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = async (client) => {
  client.addVote = async (message, user) => {
    try {
      const vote = await ClipVote.findOne({ messageId: message.id });
      if (vote) {
        return await client.incrementVote(message, user);
        
      };

      const newVote = new ClipVote({
        _id: new Types.ObjectId(),
        messageId: message.id,
        votes: 1,
        voters: [user]
      });

      await newVote
        .save()
        .then(async (res) => {
          console.log(chalk.blue(`[Vote Created] VoteId: ${res.id}`));
        })
        .catch(console.error);

      return newVote;
    } catch (err) {
      console.error(err);
    }
  };
};
