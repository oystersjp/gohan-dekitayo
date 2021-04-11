const Discord = require("discord.js")//todo:import文を使う
import { IncomingWebhook } from "@slack/webhook";
import { VoiceState } from "discord.js";

const client = new Discord.Client();
const DISCODE_TOKEN = "";
const SLACK_WEBHOOK = "";

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

client.on("ready", () => {
	console.log("ready...");
});

client.on("message", (msg: { content: string; reply: (arg0: string) => void; }) => {
	if (msg.content === "ping") {
		msg.reply("Pong!");
	}
});

client.on("voiceStateUpdate", async (oldState: VoiceState, newState: VoiceState) => {
	if (oldState.channel?.members.size === undefined && newState.channel?.members.size === 1) {
		// User Joins a voice channel
		(async () => {
			await webhook.send({
				// @ts-ignore
				text: `もしもし私 ${newState.channel?.members.toJSON()[0].displayName}、
今discordにいるの`
			});
		})();
	};
});

client.login(DISCODE_TOKEN);