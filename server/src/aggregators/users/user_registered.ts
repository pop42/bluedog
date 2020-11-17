import {pick} from 'lodash'

export const userRegistered = (viewDb) => async (event) => {
  const userId = event.data.userId
  const globalPosition = event.globalPosition
  const userData = pick(event.data, [
    'firstName',
    'lastName',
    'emailAddress',
    'companyId',
    'role',
  ])



  const queryString = `
    INSERT INTO 
    users(id, data, last_message_global_position)
    values(:userId, :userData, :globalPosition)
    ON CONFLICT (id) DO NOTHING
    `

  return viewDb.then(client => client.raw(queryString, {
    userId,
    userData,
    globalPosition
  }))
}

