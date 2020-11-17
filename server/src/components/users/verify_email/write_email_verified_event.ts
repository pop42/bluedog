import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeEmailVerifiedEvent = (message: Event, messageDb: MessageDb) => {


  const event = {
    id: uuid(),
    type: 'EmailVerified',
    metadata: {
      traceId: message.metadata.traceId,
      userId: message.metadata.userId,
    },
    data: message.data,
  }

  const streamName = `user-${message.data.userId}`

  return messageDb.write(streamName, event)

}


