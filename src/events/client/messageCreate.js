const Balance = require("../../schemas/balance");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    const randomAmount = Math.floor(Math.random() * 10);

    const storedBalance = await client.fetchBalance(message.author.id);

    await Balance.findOneAndUpdate(
      { _id: storedBalance._id },
      { balance: storedBalance.balance + randomAmount }
    );
  },
};
