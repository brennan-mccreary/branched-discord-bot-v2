const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns embed'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Embed Title`)
            .setDescription(`Embed description`)
            .setColor(0xFFFFFF)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://windhoppergames.com`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL(`https://windhoppergames.com`)
            .addFields([
                {
                    name: `additional name`,
                    value: `additional value`,
                    inline: true
                },
                {
                    name: `additional name 2`,
                    value: `additional value 2`,
                    inline: true
                }
            ])

        await interaction.reply({
            embeds: [embed]
        })
    }
}