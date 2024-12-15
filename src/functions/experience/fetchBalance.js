const Balance = require("../../schemas/balance");
const { Types } = require("mongoose");
const chalk = require("chalk");

module.exports = (client) => {
  client.fetchBalance = async (userId) => {
    let storedBalance = await Balance.findOne({ userId: userId });

    if (!storedBalance) {
      storedBalance = await new Balance({
        _id: new Types.ObjectId(),
        userId: userId,
      });

      await storedBalance
        .save()
        .then(async (balance) => {
          console.log(
            chalk.blue(`[Balance Created]: UserID: ${balance.userId}`)
          );
        })
        .catch(console.error);
      return storedBalance;
    } else return storedBalance;
  };
};
