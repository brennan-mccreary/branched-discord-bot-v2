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
        console.log(`[${userId}] User joined chat`)
      }

      console.log(voiceTimes)
      // User leaves a voice channel
      if (voiceState.channelId && !newVoiceState.channelId) {
        console.log(`[${userId}] User left chat`)
        console.log(voiceTimes)

        //Check if user in in map
        if (voiceTimes.has(userId)) {
          //Fetch join time from map and calculate duration
          const joinTime = voiceTimes.get(userId);
          const timeSpent = Math.floor((Date.now() - joinTime) / 60000); // Minutes spent

          //Remove user from map
          voiceTimes.delete(userId);

          // Award XP (adjust values as needed)
          const xpEarned = Math.floor(timeSpent * 0.5);
          
          //Resolve user id to user object
          const user = await client.users.fetch(voiceState.id)

          //Add balance to user
          const res = await client.addBalance(user, xpEarned);
          console.log(res)
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
