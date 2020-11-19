import {MessageDb} from '../../../message_db'
import {vehicleAdded} from './vehicle_added'

export const vehiclesAggregator = (viewDb, messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'vehicle',
    handlers: {
      VehicleAdded: vehicleAdded(viewDb),
    },
    subscriberId: 'aggregator:asset:vehicle',
  }).start(),
])
