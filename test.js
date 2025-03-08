const play = require('play-dl');

(async () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your test video
    const stream = await play.stream(url, { quality: 0, format: "opus" });

    console.log("✅ Stream Object:", stream);
    console.log("📌 Stream Type:", stream.type);
    console.log("📌 Stream Stream:", stream.stream);
})();