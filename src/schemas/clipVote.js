const { Schema, model } = require("mongoose");
const clipVoteSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  messageId: { type: String },
  votes: { type: Number, default: 0 },
  voters: [{ type: String}]
});

module.exports = model("ClipVote", clipVoteSchema, "clipVotes");
