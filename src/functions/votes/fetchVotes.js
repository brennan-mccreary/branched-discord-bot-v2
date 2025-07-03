const ClipVote = require("../../schemas/clipVote");
const chalk = require("chalk");

module.exports = async (client) => {
  client.fetchVotes = async (limit) => {
    try {
      const votes = await ClipVote.aggregate([
        { $sort: { votes: -1 } },
        { $limit: limit ?? 50 },
      ]);
      return votes;
    } catch (err) {
      console.error(err);
    }
  };
};
