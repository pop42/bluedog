import {loadUser} from '../load_user'
import {writeEmailVerifiedEvent} from './write_email_verified_event'

export const verifyEmail = messageDb => async (message) => {
  const userId = message.data.userId

  const user = await loadUser(userId, messageDb)

  if (user.isRegistered && !user.isEmailVerified) {
    return writeEmailVerifiedEvent(message, messageDb)
  }
}