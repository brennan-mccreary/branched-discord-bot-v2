const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans member')
        .addUserOption(option => (
                option
                    .setName('target')
                    .setDescription('Member to ban')
                    .setRequired(true)
            ))
        .addStringOption(option => (
                option
                    .setName('reason')
                    .setDescription("The reason for banning member.")
            )),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason') 
        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(console.error)

        if (!reason) reason = "No reason provided.";

        await member.ban({
            deleteMessageDays: 1,
            reason: reason,
        })
        .catch(console.error);

        await interaction.reply({
            content: `Banned ${user.tag}.`,
            ephemeral: true
        })
    }
}