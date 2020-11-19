import {writeVehicleAddedEvent} from './write_vehicle_added_event'
import {loadVehicle} from '../load_vehicle'

export const addVehicle = (messageDb) => async (message) => {
  const vehicleId = message.data.vehicleId

  const vehicle = await loadVehicle(vehicleId, messageDb)

  if (!vehicle.isAdded) {
    return writeVehicleAddedEvent(message, messageDb)
  }

}
