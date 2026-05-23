import { Client, GatewayIntentBits, Events } from 'discord.js'
import { IncomingWebhook } from '@slack/webhook'
import dotenv from 'dotenv'
import * as voiceStateUpdate from './voiceStateUpdateHandler'

dotenv.config()

const options = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
}
const client = new Client(options)
const DISCODE_TOKEN = process.env.DISCODE_TOKEN
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK

const webhook = new IncomingWebhook(SLACK_WEBHOOK)

client.on(Events.ClientReady, () => {
  console.log('ready...')
})

client.on(Events.MessageCreate, async (msg) => {
  if (msg.content === 'ping') {
    await msg.reply('Pong!')
  }
})

client.on(Events.VoiceStateUpdate, voiceStateUpdate.create(webhook))

client.login(DISCODE_TOKEN)
