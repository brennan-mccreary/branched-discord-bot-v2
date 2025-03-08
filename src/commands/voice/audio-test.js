const { SlashCommandBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("@distube/ytdl-core");
const play = require("play-dl");
const fs = require("fs");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("audio-test")
    .setDescription("Plays music")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Search query or youtube link to play.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    try {
      //Get Command String Option & Voice channel
      const url = interaction.options.getString("song");
      const voiceChannel = interaction.member.voice.channel;

      //Check that user is in a voice channel
      if (!voiceChannel) {
        return interaction.reply("❌ You need to be in a voice channel!");
      }

      //Declare queue
      const queue = new Map();

      //Instantiate voice channel connection
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      //Fetch stream from URL
      const stream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio",
      });

      if (!stream) {
        await interaction.reply(`🎶 Unable to fetch stream`);
      } else {
        console.log(chalk.blue(`[YTDL] [Stream Fetched]`));
        //Create audio resource and resource player
        //subscribe the player to voice connection
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);

        //Reply
        await interaction.reply(`🎶 Streaming audio from YouTube!`);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
