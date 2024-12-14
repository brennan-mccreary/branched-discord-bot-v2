const Parser = require('rss-parser');
const parser = new Parser();
const fs = require('fs');
const videoChannel = '1121179518711910462';
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.checkVideo = async () => {
        const data = await parser.parseURL(
            'https://www.youtube.com/feeds/videos.xml?channel_id=UCP8zqpfHkElyEBlnKrx3wUA'
                )
            .catch(
                console.error
                );

        const raw = fs.readFileSync(`${__dirname}/../../json/video.json`);
        const json = JSON.parse(raw);

        //console.log(json)

        if (json.id !== data.items[0].id) { //new video or video not sent
            fs.writeFileSync(
                `${__dirname}/../../json/video.json`, 
                JSON.stringify({ id: data.items[0].id})
            );

            const guild = await client.guilds
                .fetch('1121179513947181160')
                .catch(console.error);

            const channel = await guild.channels
                .fetch('1121179518711910462')
                .catch(console.error);

            const { title, link, id, author} = data.items[0]
            const embed = new EmbedBuilder({
                title: title,
                description: "New video out now!",
                url: link,
                timestamp: Date.now(),
                color: 0xFF0000,
                thumbnail: {
                    url: "https://yt3.googleusercontent.com/7Kts9z09FUdljFQOvNsls16tQc5krSI1Zu_9puoImgQIi60ta6PtXa2DI2fWcKjtnAHN342I5A=s1024-c-k-c0x00ffffff-no-rj"
                },
                image: {
                    url:`https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`
                },
                author: {
                    name: author,
                    iconURL: "https://yt3.googleusercontent.com/7Kts9z09FUdljFQOvNsls16tQc5krSI1Zu_9puoImgQIi60ta6PtXa2DI2fWcKjtnAHN342I5A=s176-c-k-c0x00ffffff-no-rj",
                    url: "https://www.youtube.com/channel/UCP8zqpfHkElyEBlnKrx3wUA/?sub_confirmation=1"
                },
                footer: {
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL(),
                }
            });

            await channel.send({ embeds: [embed] }).catch(console.error)
        }
    };
};