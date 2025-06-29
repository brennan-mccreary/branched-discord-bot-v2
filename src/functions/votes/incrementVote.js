const ClipVote = require("../../schemas/clipVote");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = async (client) => {
  client.incrementVote = async (message, user) => {
    try {
      const updatedVote = await ClipVote.findOneAndUpdate(
        { messageId: message.id, voters: { $ne: user } }, // Prevent double vote
        {
          $inc: { votes: 1 },
          $push: { voters: user },
        }
      )
        .then((res) => {
          if (res) console.log(chalk.blue(`[Vote Updated] VoteId: ${res.id}`));
        })
        .catch((err) => {
          console.log(err);
        });

      return updatedVote;
    } catch (err) {
      console.error(err);
    }
  };
};
