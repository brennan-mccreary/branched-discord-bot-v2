const Balance = require("../../schemas/balance");
const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.logEvent = async (channelId, title, description, color, info) => {
    try {
      switch (color) {
        case "alert":
          color = 0xe13c38;
          break;
        case "warn":
          color = 0xe9e957;
          break;
        case "notif":
          color = 0x5757e9;
          break;
        case "info":
          color = 0x84e862;
          break;
        case "dark":
          color = 0x383b37;
          break;
        default:
          break;
      }
      const channel = client.channels.cache.get(channelId);
      const embed = new EmbedBuilder()
        .setTitle(title ?? " ")
        .setDescription(description ?? " ")
        .setColor(color ?? 0xffffff)
        .setTimestamp(Date.now())
        .addFields([
          {
            name: "Information",
            value: info ?? "-# None",
            inline: false,
          },
        ]);

      if (channel) {
        channel.send({ embeds: [embed] });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//Default implementation
// //Log event
// try {
//   const channel = null;
//   const title = null;
//   const description = null;
//   const color = null;
//   const info = null;

//   await client.logEvent(channel, title, description, color, info);
// } catch (err) {
//   console.log(err);
// }
