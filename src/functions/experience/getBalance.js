const Balance = require("../../schemas/balance");

module.exports = (client) => {
  client.getBalance = async (userId) => {
    let storedBalance = await Balance.findOne({ userId: userId });

    if (!storedBalance) return false;
    else return storedBalance;
  };
};
