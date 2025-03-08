const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

//Declare queue
const queue = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the current music queue"),
  async execute(interaction) {
    try {
      const serverQueue = queue.get(interaction.guild.id);
      if (!serverQueue || serverQueue.songs.length === 0) {
        return interaction.reply("🎵 The queue is empty!");
      }

      let queueText = "🎶 **Current Queue:**\n";
      serverQueue.songs.forEach((song, index) => {
        queueText += `${index + 1}. ${song.title}\n`;
      });

      await interaction.reply(queueText);
    } catch (err) {
      console.log(err);
    }
  },
};
