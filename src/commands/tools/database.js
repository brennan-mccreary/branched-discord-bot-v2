const Guild = require('../../schemas/guild');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Returns information from the database'),
    async execute(interaction, client) {
        // console.log(interaction.guild)
        console.log(client.guilds.cache.get('1121179513947181160'))

        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if(!guildProfile) {
            guildProfile = await new Guild({
                _id: new mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "none"
            });

        await guildProfile.save().catch(console.error);
        await interaction.reply({
            content: `Server Name: ${guildProfile.guildName}`
        })
        
      

        } else {
            await guildProfile.save().catch(console.error);
            await interaction.reply({
                content: `Server Id: ${guildProfile.guildId}\nServer Icon: ${guildProfile.guildIcon}`
            })
            // console.log(guildProfile);
        }

    }
}