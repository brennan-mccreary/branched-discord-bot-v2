const chalk = require("chalk");

module.exports = {
  name: "voiceStateUpdate",
  async execute(voiceState, newVoiceState) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Voice State Update] [Id: ${newVoiceState.channelId}]`
      )
    );

    try {
    } catch (err) {
      console.log(err);
    }
  },
};
