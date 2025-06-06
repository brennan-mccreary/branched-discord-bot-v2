const { Schema, model } = require("mongoose");
const memberSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: String, required: true, unique: true },
  birthday: {
    month: { type: Number, required: false, min: 1, max: 12 },
    day: { type: Number, required: false, min: 1, max: 31 }, 
    isRecognized: { type: Boolean },
  },
  balance: { type: Number, default: 0, required: true },
});

module.exports = model("Member", memberSchema, "members");
