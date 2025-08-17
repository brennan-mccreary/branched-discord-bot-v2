module.exports = async (client) => {
  client.getGuild = async (guildId, client) => {
    try {
      let guild = client.guilds.cache.get(guildId);
      if (!guild) {
        guild = await client.guilds.fetch(guildId); // fetch from API if not cached
      }
      return guild;
    } catch (err) {
      console.error("❌ Could not resolve guild:", err);
    }
  };
};
