const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 10000);
        console.log(chalk.blue(`[Bot Status]: ${client.user.tag} is online`));
    }
}