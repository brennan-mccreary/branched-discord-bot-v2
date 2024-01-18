const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("modal")
        .setDescription('Returns modal'),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId(`fav-color`)
            .setTitle(`Favorite Color?`);

        const textInput = new TextInputBuilder()
            .setCustomId("favColorInput")
            .setLabel('What is you favorite color?')
            .setRequired(true)
            .setStyle(TextInputStyle.Short);
        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);
    }
}