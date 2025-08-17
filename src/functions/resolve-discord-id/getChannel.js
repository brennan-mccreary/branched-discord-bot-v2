module.exports = async (client) => {
  client.getChannel = async (channelId, client) => {
    try {
      let channel = client.channels.cache.get(channelId);
      if (!channel) {
        channel = await client.channels.fetch(channelId); // fetch from API if not cached
      }
      return channel;
    } catch (err) {
      console.error("❌ Could not resolve channel:", err);
    }
  };
};
