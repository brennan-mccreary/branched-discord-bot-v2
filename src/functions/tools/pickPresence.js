const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "over the network",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "users for commands.",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "solitaire in solitutde",
        status: "dnd",
      },
      {
        type: ActivityType.Streaming,
        text: "Daredevil: Born Again on Disney+",
        url: "https://twitch.tv/snowmonk1337",
      },
      {
        type: ActivityType.Competing,
        text: "the arena for your <3",
        status: "invisible",
      },
      {
        type: ActivityType.Custom,
        text: "Currently being built",
        status: "dnd",
      },
    ];

    // const option = Math.floor(Math.random() * options.length);
    const option = 1;

    client.user.setPresence({
      activities: [
        {
          name: options[option]?.text ,
          type: options[option].type ,
          url: options[option]?.url ,
        },
        {
            name: options[1]?.text ,
            type: options[1].type ,
            url: options[1]?.url ,
          },
      ],
      status: options[option].status,
    });
  };
};
