const Balance = require("../../schemas/balance");

module.exports = async (client) => {
  client.addBalance = async (author, amount) => {
    if (author.bot) return;
    const storedBalance = await client.fetchBalance(author.id);

    const updatedBalance = await Balance.findOneAndUpdate(
      { _id: storedBalance._id },
      { $inc: { balance: amount } },
      { upsert: true }
    );

    return updatedBalance;
  };
};
