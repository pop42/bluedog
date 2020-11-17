import {pick} from 'lodash'

export const emailVerified = (viewDb) => async (event) => {
  const userId = event.data.userId
  const globalPosition = event.globalPosition
  const queryString = `
    UPDATE users
    SET email_verified = true, 
    last_message_global_position = :globalPosition
    WHERE id = :userId
    AND last_message_global_position < :globalPosition
    `

  return viewDb.then(client => client.raw(queryString, {
    userId,
    globalPosition
  }))
}

