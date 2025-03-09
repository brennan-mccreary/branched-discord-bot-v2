const chalk = require("chalk");
const voiceTimes = new Map();

module.exports = {
  name: "voiceStateUpdate",
  async execute(voiceState, newVoiceState, client) {
    console.log(
      chalk.cyan(
        `[Event Notice] [Voice State Update] [Id: ${newVoiceState.channelId}]`
      )
    );

    //Time earned XP
    try {
      const userId = newVoiceState.id;

      // User joins a voice channel
      if (!voiceState.channelId && newVoiceState.channelId) {
        voiceTimes.set(userId, Date.now());
      }

      console.log(voiceTimes)
      // User leaves a voice channel
      if (voiceState.channelId && !newVoiceState.channelId) {
        console.log("voiceTimes")
        console.log(voiceTimes)
        if (voiceTimes.has(userId)) {
          console.log(voiceTimes)
          const joinTime = voiceTimes.get(userId);
          const timeSpent = Math.floor((Date.now() - joinTime) / 60000); // Minutes spent
          voiceTimes.delete(userId);

          // Award XP (adjust values as needed)
          const xpEarned = timeSpent * 10; // Example: 10 XP per minute
          console.log(timeSpent * 10)
          await client.addBalance(voiceState.id, xpEarned);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
