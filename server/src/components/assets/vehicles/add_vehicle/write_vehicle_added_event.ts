import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../../message_db'

export const writeVehicleAddedEvent = (message: Event, messageDb: MessageDb) => {

  const event = {
    id: uuid(),
    type: 'VehicleAdded',
    metadata: {
      ...message.metadata
    },
    data: {
      ...message.data,
    },
  }

  const streamName = `vehicle-${message.data.vehicleId}`

  return messageDb.write(streamName, event, -1)

}


