import { IncomingWebhook } from '@slack/webhook'
import Discord, { VoiceChannel, VoiceState } from 'discord.js'

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
            text: `＜ :slack_call: :watashi: :discord: :in: <https://discord.com/channels/${guild.id}|#${channel.name}> :now:`,
          },
        ],
      },
    ],
  })
}

const isAfkChannel = ({ guild, channel }: VoiceState): boolean => {
  return guild.afkChannelID === channel?.id
}

const isActiveCall = (beforeCh: VoiceChannel | null, afterCh: VoiceChannel| null) => {
  return !beforeCh && afterCh.members.size === 1;
}

export const create: (webhook: IncomingWebhook) => voiceStateUpdateHandler = (
  webhook
) => {
  return async (before: VoiceState, after: VoiceState) => {
    if (
      isActiveCall(before.channel, after.channel)&&
      !isAfkChannel(after)
    ) {
      return sendStartingSessionMessage(webhook, {
        channel: after.channel,
        guild: after.guild,
      })
    }
  }
}
