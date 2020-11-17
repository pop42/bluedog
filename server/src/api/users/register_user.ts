import {v4 as uuid} from 'uuid'
export const registerUser = async (messageDb, body) => {
  const {firstName, lastName, emailAddress} = body
  const userId = uuid()
  const traceId = uuid()
  const messageId = uuid()

  const streamName = `user:command-${userId}`

  const message = {
    id: messageId,
    type: 'RegisterUser',
    metadata: {
      traceId,
      userId,
    },
    data: {
      userId,
      firstName,
      lastName,
      emailAddress,
    },
  }
  await messageDb.write(streamName, message)
  return message
}
