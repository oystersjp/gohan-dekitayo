import { IncomingWebhook } from '@slack/webhook'
import Discord, { VoiceState } from 'discord.js'

type voiceStateUpdateHandler = Parameters<Discord.Client['on']>[1]

const sendStartingSessionMessage = (
  webhook: IncomingWebhook,
  { channel, guild }: { channel: Discord.VoiceChannel; guild: Discord.Guild }
) => {
  const member = channel.members.first()
  if (!member) {
    return
  }

  return webhook.send({
    blocks: [
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url:
              member.user.displayAvatarURL({ size: 128, format: 'png' }) || '',
            alt_text: member.displayName,
          },
          {
            type: 'mrkdwn',
            text: `＜ :slack_call: :watashi: :in: <https://discord.com/channels/${guild.id}|#${channel.name}> :in: :discord: :now:`,
          },
        ],
      },
    ],
  })
}

const isAfkChannel = ({ guild, channel }: VoiceState): boolean => {
  return guild.afkChannelID === channel?.id
}

export const create: (webhook: IncomingWebhook) => voiceStateUpdateHandler = (
  webhook
) => {
  return async (before: VoiceState, after: VoiceState) => {
    if (
      !before.channel &&
      after.channel?.members.size === 1 &&
      !isAfkChannel(after)
    ) {
      return sendStartingSessionMessage(webhook, {
        channel: after.channel,
        guild: after.guild,
      })
    }
  }
}
