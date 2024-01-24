const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('quoteMessage')
        .setType(ApplicationCommandType.Message),
    async execute(interaction, client) {

        var date = new Date(interaction.targetMessage.createdTimestamp);
        var formatDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
       

        await interaction.reply({
            content: `"${interaction.targetMessage.content}" -${interaction.targetMessage.author.globalName} (${formatDate})`
        })
        
        //console.log(interaction.targetMessage)
    }
}