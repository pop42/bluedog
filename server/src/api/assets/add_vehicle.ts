import {v4 as uuid} from 'uuid'

export const addVehicle = async (messageDb, body) => {

  const traceId = uuid()
  const messageId = uuid()
  const userId = uuid()
  const vehicleId = uuid()
  const companyId = body.companyId


  const streamName = `vehicle:command-${vehicleId}`
  const message = {
    id: messageId,
    type: 'AddVehicle',
    metadata: {
      traceId,
      userId,
      vehicleId,
      companyId,
    },
    data: {
      vehicleId, ...body,
    },
  }

  await messageDb.write(streamName, message)

  return message
}
