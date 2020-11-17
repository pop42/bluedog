import {v4 as uuid} from 'uuid'

export const addVehicle = async (messageDb, body) => {

  const traceId = uuid()
  const messageId = uuid()
  const userId = uuid()
  const assetId = uuid()
  const companyId = body.companyId
  const assetType = 'Vehicle'

  const streamName = `asset:command-${assetId}`
  const message = {
    id: messageId,
    type: 'AddVehicle',
    metadata: {
      traceId,
      userId,
      assetId,
      assetType,
      companyId,
    },
    data: {
      assetId, ...body,
    },
  }

  await messageDb.write(streamName, message)

  return message
}
