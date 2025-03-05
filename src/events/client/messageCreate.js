
module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    //Add 10xp to person for sending message
    await client.addBalance(message, 10);

    
  },
};
