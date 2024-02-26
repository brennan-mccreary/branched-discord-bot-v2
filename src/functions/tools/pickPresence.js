const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: "over BGN",
                status: "online"
            },
            {
                type: ActivityType.Listening,
                text: "users for commands.",
                status: "idle"
            },
            {
                type: ActivityType.Playing,
                text: "with your mom",
                status: "dnd"
            },
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [{
                name: options[option].text,
                type: options[option].type,
                status: options[option].status,
            }]
        })
    }
}