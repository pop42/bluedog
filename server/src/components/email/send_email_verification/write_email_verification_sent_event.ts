import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeEmailVerificationSentEvent = (message: Event, messageDb: MessageDb) => {

  const event = {
    id: uuid(),
    type: 'EmailVerificationSent',
    metadata: {
      originStreamName: message.metadata.originStreamName,
      traceId: message.metadata.traceId,
      userId: message.metadata.userId,
    },
    data: message.data,
  }

  const streamName = `email-${message.data.emailId}`

  return messageDb.write(streamName, event)

}
