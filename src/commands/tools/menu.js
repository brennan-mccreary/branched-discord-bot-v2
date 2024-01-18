const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Returns menu'),
    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
            .setPlaceholder(`Choose your choice`)
            .setCustomId(`sub-menu`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new StringSelectMenuOptionBuilder({
                    label: `Option 1`,
                    value: `www.google.com`
                }), 
                new StringSelectMenuOptionBuilder({
                    label: `Option 2`,
                    value: `www.branchedgaming.net`
                })
            );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
}