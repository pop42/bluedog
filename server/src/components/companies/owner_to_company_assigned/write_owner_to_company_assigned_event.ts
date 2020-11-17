import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeOwnerToCompanyAssignedEvent = (message: Event, messageDb: MessageDb) => {

  const event = {
    id: uuid(),
    type: 'OwnerToCompanyAssigned',
    metadata: message.metadata,
    data: {
      companyId: messageDb.streamNameToId(message.metadata.originStreamName),
      ownerId: message.data.ownerId,
    },
  }

  const streamName = message.metadata.originStreamName!

  return messageDb.write(streamName, event)

}


