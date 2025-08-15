const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    guildIcon: {type: String, required: false },
    channels: {
        live: {type: String, required: false },
        logs: {type: String, required: false },
        birthdays: {type: String, required: false },
        interactiveVoice: {type: String, required: false },
        voting: {type: String, required: false },
    }
});

module.exports = model("Guild", guildSchema, "guilds");