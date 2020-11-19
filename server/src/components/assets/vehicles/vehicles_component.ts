import {Promise} from 'bluebird'

import {MessageDb} from '../../../message_db'
import {addVehicle} from './add_vehicle/add_vehicle'


export const vehicleComponent = (messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'vehicle:command',
    handlers: {
      AddVehicle: addVehicle(messageDb),
    },
    subscriberId: 'components:asset:vehicle:command',
  }).start(),


])


