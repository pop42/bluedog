import {Message} from './index'

interface RawMessage {
  id: string
  stream_name: string
  type: string
  position: string
  global_position: string
  data: Record<string, unknown> | string
  metadata: Record<string, unknown> | string
  time: string
}

export const deserializeMessage = (rawMessage: RawMessage | null): Message | null => {
  if (!rawMessage) {
    return null
  }

  return {
    id: rawMessage.id,
    streamName: rawMessage.stream_name,
    type: rawMessage.type,
    position: parseInt(rawMessage.position, 10),
    globalPosition: parseInt(rawMessage.global_position, 10),
    data: rawMessage.data ? JSON.parse(rawMessage.data as string) : {},
    metadata: rawMessage.metadata ? JSON.parse(rawMessage.metadata as string) : {},
    time: rawMessage.time,
  }
}


