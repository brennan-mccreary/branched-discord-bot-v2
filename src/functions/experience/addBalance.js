const Balance = require("../../schemas/balance");

module.exports = async (client) => {
  client.addBalance = async (author, amount) => {
    if (author.bot) return;

    const storedBalance = await client.fetchBalance(author.id);

    await Balance.updateOne(
      { _id: storedBalance._id },
      { $inc: { balance: amount }}
    );
  };
};
