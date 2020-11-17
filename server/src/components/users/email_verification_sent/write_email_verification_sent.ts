import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeEmailVerificationSentEvent = (message: Event, messageDb: MessageDb) => {

  const event = {
    id: uuid(),
    type: 'EmailVerificationSent',
    metadata: {
      traceId: message.metadata.traceId,
      userId: message.metadata.userId,
    },
    data: {
      userId: messageDb.streamNameToId(message.metadata.originStreamName),
      emailId: message.data.emailId,
    },
  }

  const streamName = message.metadata.originStreamName!

  return messageDb.write(streamName, event)

}


