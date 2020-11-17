import {v4 as uuid} from 'uuid'

export const addCompany = async (messageDb, body) => {
  const companyId = uuid()
  const traceId = uuid()
  const messageId = uuid()
  const userId = uuid()

  const streamName = `company:command-${companyId}`
  const message = {
    id: messageId,
    type: 'AddCompany',
    metadata: {
      traceId,
      userId,
    },
    data: {
      companyId, ...body,
    },
  }

  await messageDb.write(streamName, message)

  return message
}
