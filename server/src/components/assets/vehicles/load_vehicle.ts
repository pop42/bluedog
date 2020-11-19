import {MessageDb} from '../../../message_db'

export interface VehicleProjection {
  id: string
  name: string
  description: string
  odometerInKilometers: number
  vin: string
  make: string
  model: string
  companyId: string
  isAdded: boolean
  sequence: number
}

const projection = {
  init() {
    return {
      id: null,
      odometerInKilometers: null,
      vin: null,
      name: null,
      description: null,
      make: null,
      model: null,
      companyId: null,
      isAdded: false,
      sequence: 0,
    }
  },
  VehicleAdded(vehicle: VehicleProjection, event) {
    const data = event.data
    vehicle.id = data.vehicleId
    vehicle.odometerInKilometers = data.odomentInKilometers
    vehicle.vin = data.vin
    vehicle.name = data.name
    vehicle.description = data.description
    vehicle.make = data.make
    vehicle.model = data.model
    vehicle.companyId = data.companyId
    vehicle.isAdded = true
    return vehicle
  },

}

export const loadVehicle = async (vehicleId: string, messageDb: MessageDb) => {
  const streamName = `vehicle-${vehicleId}`
  return await messageDb.fetch(streamName, projection) as VehicleProjection
}

