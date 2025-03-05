const Balance = require("../../schemas/balance");

module.exports = async (client) => {
  client.addBalance = async (message, amount) => {
    if (message.author.bot) return;

    const storedBalance = await client.fetchBalance(message.author.id);

    await Balance.updateOne(
      { _id: storedBalance._id },
      { $inc: { balance: amount }}
    );
  };
};
