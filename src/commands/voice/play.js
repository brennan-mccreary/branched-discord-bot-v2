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
//Declare queue
const queue = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Search query or youtube link to play.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    try {
      //Store command arg - URL or Song Name
      const arg = interaction.options.getString("song");

      //Check that user is currently in a voice channel
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {
        return interaction.reply("❌ You need to be in a voice channel!");
      }

      //Initialize server queue
      let serverQueue = queue.get(voiceChannel.guild.id);
      if (!serverQueue) {
        serverQueue = {
          voiceChannel,
          connection: null,
          songs: [],
          player: createAudioPlayer(),
          playing: true,
        };
        queue.set(voiceChannel.guild.id, serverQueue);
      }

      //Query argument to resolve song
      const song = await getSong(arg);
      serverQueue.songs.push(song);

      //Create new voice connection and play music or add music to queue
      if (!serverQueue.connection) {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        serverQueue.connection = connection;
        playNextSong(voiceChannel.guild.id, interaction);
      } else {
        await interaction.reply(`🎵 Added **${song.title}** to the queue!`);
      }
    } catch (err) {
      console.log(err);
    }

    async function getSong(query) {
      const searchResult = await play.search(query, { limit: 1 });
      const video = searchResult[0];
      return {
        title: video.title,
        url: video.url,
      };
    }
    
    async function playNextSong(guildId, interaction) {
      const serverQueue = queue.get(guildId);
      if (!serverQueue || serverQueue.songs.length === 0) {
        stopMusic(guildId);
        return;
      }
    
      const song = serverQueue.songs.shift();
      const stream = await play.stream(song.url, { quality: 0, format: "opus" }).catch((err) => {
        console.error("Error fetching stream:", err);
      });
    
      if (!stream) {
        console.error("Failed to get stream, skipping song...");
    
        return playNextSong(guildId);
      }
      
      console.log(stream.stream)
      console.log(stream.type)
      const resource = createAudioResource(stream.stream);
      
      serverQueue.player.play(resource, );
      serverQueue.connection.subscribe(serverQueue.player);
    
      serverQueue.player.on(AudioPlayerStatus.Idle, () => {
        playNextSong(guildId);
      });
    
      // const channel = serverQueue.voiceChannel.guild.channels.cache.find(c => c.type === 0);
      // if (channel) channel.send(`🎶 Now playing: **${song.title}**`);

      await interaction.reply(`🎵 Added **${song.title}** to the queue!`);
    }
    
    function stopMusic(guildId) {
      const serverQueue = queue.get(guildId);
      if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.player.stop();
        serverQueue.connection.destroy();
        queue.delete(guildId);
      }
    }
  },
};