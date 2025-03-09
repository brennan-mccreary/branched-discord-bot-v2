const { Schema, model } = require("mongoose");
const memberSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: String, required: true, unique: true },
  birthday: {
    date: { type: Date, required: false },
    isRecognized: { type: Boolean, required: false },
  },
  balance: { type: Number, default: 0, required: true },
});

module.exports = model("Member", memberSchema, "members");
