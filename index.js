// import * as Discord from 'discord.js'
const Discord = require("discord.js");

const { IncomingWebhook } = require("@slack/webhook");

const client = new Discord.Client();
const DISCODE_TOKEN = "";
const SLACK_WEBHOOK = "";

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

client.on("ready", () => {
  console.log("ready...");
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  // console.log('old:', JSON.stringify(oldState))
  // console.log('new:', JSON.stringify(newState))

  //誰もいない状態で入室してきたら通知する
  if (oldState.channel?.members.size === undefined) {
    (async () => {
      await webhook.send({
        text:
          newState.channel?.members.toJSON()[0].displayName +
          " がにゅうしつしました",
      });
    })();
    return;
  }

  //退出後誰もいなくなったら通知する
  if (newState.channel?.members.size === undefined) {
    (async () => {
      await webhook.send({
        text: "全てがまさかる(誰もいないよ)",
      });
    })();
    return;
  }
});

client.login(DISCODE_TOKEN);
