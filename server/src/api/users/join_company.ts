import {v4 as uuid} from 'uuid'
import {Promise} from 'bluebird'

export const joinCompany = async (viewDb, messageDb, body) => {
  const {userId, companyId, role} = body
  const authenticatedUserId = uuid()
  const traceId = uuid()
  const messageId = uuid()

  const companyPromise = viewDb
    .then(client => client('companies')
      .where({id: companyId})
      .limit(1))
    .then(rows => rows[0])

  const userPromise = viewDb
    .then(client => client('users')
      .where({id: userId})
      .limit(1))
    .then(rows => rows[0])

  const [company, user] = await Promise.all([
    companyPromise,
    userPromise,
  ])

  if (!company) {
    throw new Error(`Company with ${companyId} must exist`)
  }

  if (!user) {
    throw new Error(`User with ${userId} must exist`)
  }

  if (!user.is_email_verified) {
    throw new Error(`User ${userId} must have verified email`)
  }

  const streamName = `user:command-${userId}`

  const message = {
    id: messageId,
    type: 'JoinCompany',
    metadata: {
      traceId,
      userId: authenticatedUserId,
    },
    data: {
      userId,
      companyId,
      role,
    },
  }
  await messageDb.write(streamName, message)
  return message

}
