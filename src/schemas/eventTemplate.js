const { Schema, model } = require("mongoose");
const eventTemplateSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, min: 1, max: 25 },
  channel: { type: String, required: true},
  topic: { type: String, required: true, min: 1, max: 50 },
  description: { type: String, required: false, min: 0, max: 1000 },
  cover_image: { type: String, required: false }
});

module.exports = model("EventTemplate", eventTemplateSchema, "eventTemplates");
