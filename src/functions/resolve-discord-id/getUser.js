module.exports = async (client) => {
  client.getUser = async (userId, client) => {
    try {
      let user = client.users.cache.get(userId);
      if (!user) {
        user = await client.users.fetch(userId); // fetch from API if not cached
      }
      return user;
    } catch (err) {
      console.error("❌ Could not resolve user:", err);
    }
  };
};
