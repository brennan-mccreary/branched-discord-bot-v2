const crypto = require("crypto");
const express = require("express");
const app = express();
const port = 4000;
const { TWITCH_SIGNING_SECRET, TWITCH_API_SECRET } = process.env;

// Notification request headers
const TWITCH_MESSAGE_ID = "Twitch-Eventsub-Message-Id".toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  "Twitch-Eventsub-Message-Timestamp".toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  "Twitch-Eventsub-Message-Signature".toLowerCase();
const MESSAGE_TYPE = "Twitch-Eventsub-Message-Type".toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification";
const MESSAGE_TYPE_NOTIFICATION = "notification";
const MESSAGE_TYPE_REVOCATION = "revocation";

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = "sha256=";

const startTwitchServer = (client) => {
  app.use(express.json());

  app.post("/callback", async (req, res) => {
    //Handling webhook challenge
    if (
      req.header("Twitch-EventSub-Message-Type") ===
      "webhook_callback_verification"
    ) {
      console.log("Verifying webhook is from twitch");
      return res
        .set("Content-Type", "text/plain")
        .status(200)
        .send(req.body.challenge);
    }
  });

  app.post("/twitch/eventsub", (req, res) => {
    const messageType = req.headers["twitch-eventsub-message-type"];

    console.log("📥 Incoming EventSub request:", messageType);

    if (messageType === "webhook_callback_verification") {
      console.log("🔐 Verifying webhook...");
      console.log("Challenge:", req.body.challenge);
      res.status(200).send(req.body.challenge); // Twitch needs this EXACTLY
    } else if (messageType === "notification") {
      console.log("📡 Event Received:", req.body);
      res.sendStatus(204); // Twitch expects 204 for normal events
    } else if (messageType === "revocation") {
      console.log("⚠️ Subscription revoked:", req.body);
      res.sendStatus(204);

      const channel = "1070892446478782526";
      client.sendLiveNotification(channel, res.broadcaster_user_id);
    } else {
      console.log("ℹ️ Unknown EventSub message type");
      res.sendStatus(200);
    }
  });

  app.listen(port, () => {
    console.log(`Twitch app listening`);
  });

  function getSecret() {
    // TODO: Get secret from secure storage. This is the secret you pass
    // when you subscribed to the event.
    return TWITCH_API_SECRET;
    //return TWITCH_SIGNING_SECRET;
  }
};

module.exports = startTwitchServer;
