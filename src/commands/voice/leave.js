const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves a voice channel'),
    async execute(interaction, client) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('❌ I am not in a voice channel!');
        }

        connection.destroy();
        await interaction.reply('👋 Left the voice channel!');
    }
}