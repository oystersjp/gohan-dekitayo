import Discord from 'discord.js'
import { IncomingWebhook } from "@slack/webhook";
import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client();
const DISCODE_TOKEN = process.env.DISCODE_TOKEN;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

client.on("ready", () => {
	console.log("ready...");
});

client.on("message", msg => {
	if (msg.content === "ping") {
		msg.reply("Pong!");
	}
});

client.on("voiceStateUpdate", async (oldState, newState) => {
	if (oldState.channel?.members.size === undefined && newState.channel?.members.size === 1) {
		// User Joins a voice channel
		const member = newState.channel?.members.first()
		if (!member) {
			return
		}

		const { channel, guild } = newState

		await webhook.send({
			blocks: [
				{
					type: 'context',
					elements: [
						{
							type: 'image',
							image_url: member.user.displayAvatarURL({ size: 128, format: 'png' }) || '',
							alt_text: member.displayName,
						},
						{
							type: 'mrkdwn',
							text: `＜ :slack_call: :watashi: :discord: :in: <https://discord.com/channels/${guild.id}|#${channel.name}> :now:`,
						}
					]
				}
			]
		});
	};
});

client.login(DISCODE_TOKEN);
