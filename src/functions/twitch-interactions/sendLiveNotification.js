const Balance = require("../../schemas/balance");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const axios = require("axios");

module.exports = (client) => {
  client.sendLiveNotification = async (channelId, data) => {
    try {
      //Fetch user information
      let user_res;
      let stream_res;

      if (data.broadcaster_user_id) {
        const { TWITCH_API_KEY, access_token } = process.env;

        user_res = await axios.get("https://api.twitch.tv/helix/users", {
          headers: {
            "Client-ID": TWITCH_API_KEY,
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            id: data.broadcaster_user_id,
          },
        });

        stream_res = await axios.get("https://api.twitch.tv/helix/streams", {
          headers: {
            "Client-ID": TWITCH_API_KEY,
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            user_id: data.broadcaster_user_id,
          },
        });
      }

      //define fields
      //   const user = user_res.data.data[0];
      //   const stream = stream_res.data.data[0];

      const user = {
        id: "184426286",
        login: "bigbeenest",
        display_name: "BigBeenest",
        type: "",
        broadcaster_type: "affiliate",
        description:
          "HELLO! I TEND TO BE LOUD AND SCREAM! PLEASE ADJUST VOLUME. I'm not great at gaming but I am also just chillin most of the time, so come by often. :)",
        profile_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/dc8461e7-1d53-4cab-a540-60af709e6dea-profile_image-300x300.png",
        offline_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/ce507040-6b17-4a87-b4ef-7ecd16a326b8-channel_offline_image-1920x1080.png",
        view_count: 0,
        created_at: "2017-12-04T21:51:51Z",
      };
      const stream = {
        id: "319743853561",
        user_id: "184426286",
        user_login: "bigbeenest",
        user_name: "BigBeenest",
        game_id: "516575",
        game_name: "VALORANT",
        type: "live",
        title:
          "relaxing on val on alt and then mayhaps comp later...? ٩(ˊᗜˋ*)و ♡ |",
        viewer_count: 11,
        started_at: "2025-05-04T23:44:57Z",
        language: "en",
        thumbnail_url:
          "https://static-cdn.jtvnw.net/previews-ttv/live_user_bigbeenest-{width}x{height}.jpg",
        tag_ids: [],
        tags: [
          "smallstreamer",
          "HmongStreamer",
          "sigmafemale",
          "ALPHAFEMALE",
          "English",
          "RaspyEboyVoice",
          "BigPPEnergy",
          "bee",
        ],
        is_mature: false,
      };

      const channel = client.channels.cache.get(channelId);
      const name = stream.user_name ?? null;
      const title = stream.title ?? null;
      const thumbnail =
        stream.thumbnail_url
          .replace("{width}", "1280")
          .replace("{height}", "720") ?? null;
      const game = stream.game_name ?? null;
      const viewers = stream.viewer_count ?? "0";
      const pfp = user.profile_image_url ?? null;

      //build embed
      const embed = new EmbedBuilder()
        .setTitle(`${title}`) //stream title (hyperlink)
        .setColor(0x8956fb) //twitch purple
        .setImage(thumbnail) //Stream thumbnail
        .setThumbnail(pfp) //creator pfp
        .setTimestamp(Date.now())
        .setAuthor({
          //Displayed at the top
          url: `https://twitch.tv/${name}`,
          iconURL: pfp,
          name: `${name} is now live!`,
        })
        .setFooter({
          //displayed at the bottom
          iconURL: null,
          text: "Branched Live Notifications",
        })
        .setURL(`https://twitch.tv/${name}`)
        .addFields([
          {
            name: `Game`,
            value: `${game}`,
            inline: true,
          },
          {
            name: `Viewers`,
            value: `${viewers}`,
            inline: true,
          },
        ]);

      // build watch now button
      const watchNowButton = new ButtonBuilder()
        .setLabel("Watch Now")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://twitch.tv/${name}`);
      const bgnButton = new ButtonBuilder()
        .setLabel("Check out BGN")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://branchedgaming.net`);

      //build action row
      const row = new ActionRowBuilder().addComponents([
        watchNowButton,
        bgnButton,
      ]);

      //send message
      if (channel) {
        await channel.send({
          content: "### 🚨  Now Live on Twitch!  🚨",
          embeds: [embed],
          components: [row],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
