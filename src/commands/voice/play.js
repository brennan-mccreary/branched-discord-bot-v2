const { SlashCommandBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const ytdl = require("@distube/ytdl-core");

module.exports = {
  data: new SlashCommandBuilder().setName("play").setDescription("Plays sound"),
  async execute(interaction, client) {
    try {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const voiceChannel = interaction.member.voice.channel;

      if (!voiceChannel) {
        return interaction.reply("❌ You need to be in a voice channel!");
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const stream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio",
      });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      await interaction.reply("✅ Joined the voice channel!");
    } catch (err) {
      console.log(err);
    }
  },
};
