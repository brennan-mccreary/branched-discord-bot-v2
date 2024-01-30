const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const admin = '1070892444243202081';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permission')
        .setDescription('Requires permission')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const role = await interaction.guild.roles
            .fetch(admin)
            .catch(console.error)

        const testRole = await interaction.guild.roles.create({
            name: 'Test',
            permissions: [PermissionsBitField.Flags.KickMembers]
        })
        .catch(console.error);

        if (roles.cache.has(admin)) {
            await interaction.deferReply({
                fetchReply: true
            })

            // await roles.remove(role).catch(console.error);
            await interaction.editReply({
                content: `Removed: ${role.name} from you!`
            });
        } else {
            await interaction.reply({
                content: `You do not have the ${role.name} role.`
            })
        }

        await roles.add(testRole).catch(console.error);

        await testRole
            .setPermissions([PermissionsBitField.Flags.BanMembers])
            .catch(console.error);

        const channel = await interaction.guild.channels.create({
            name: `Test`,
            permssionOverwrite: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: testRole.id,
                    allow: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        })

        await channel.permissionOverwrites
            .edit(testRole.id, { SendMessages: false })
            .catch(console.error);
    }
}