import {loadUser} from '../load_user'
import {writeUserRegisteredEvent} from './write_user_registered_event'


export const registerUser = (messageDb) => async (message) => {
  const userId = message.data.userId

  const user = await loadUser(userId, messageDb)

  if (!user.isRegistered) {
    return writeUserRegisteredEvent(message, messageDb)
  }

}
