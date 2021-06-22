import Discord from 'discord.js'
import { IncomingWebhook } from '@slack/webhook'
import dotenv from 'dotenv'
import * as voiceStateUpdate from './voiceStateUpdateHandler'

dotenv.config()

const client = new Discord.Client()
const DISCODE_TOKEN = process.env.DISCODE_TOKEN
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK

const webhook = new IncomingWebhook(SLACK_WEBHOOK)

client.on('ready', () => {
  console.log('ready...')
})

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.on('voiceStateUpdate', voiceStateUpdate.create(webhook))

client.login(DISCODE_TOKEN)
