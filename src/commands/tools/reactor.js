const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Returns reactions.'),
    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `React here!`,
            fetchReply: true
        });

        //const emoji = clinet.guild.emojis.cache.find(emoji => emoji.id = 'id'); //single server
        //const emoji = client.emojis.cache.find(emoji => emoji.id == 'id'); //all servers
        // message.react(emoji);

        message.react('😀');

        const filter = (reaction, user) => {
            return reaction.emoji.name == '😀' && user.id == interaction.user.id
        };

        const collector = message.createReactionCollector({
            time: 15000,
            filter
        });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items.`);
        });
    }
}