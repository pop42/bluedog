import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeCompanyJoinedEvent = (message: Event, messageDb: MessageDb) => {

  const event = {
    id: uuid(),
    type: 'CompanyJoined',
    metadata: message.metadata,
    data: message.data,
  }

  const streamName = `user-${message.data.userId}`

  return messageDb.write(streamName, event)
}
