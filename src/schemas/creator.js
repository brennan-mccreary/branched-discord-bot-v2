const { Schema, model } = require('mongoose');
const creatorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    profilePicture: String,
    displayName: String,
    primaryPlatform: String
});

module.exports = model("Creator", creatorSchema, "creators");