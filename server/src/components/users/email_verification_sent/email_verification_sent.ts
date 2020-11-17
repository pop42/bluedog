import {writeEmailVerificationSentEvent} from './write_email_verification_sent'
import {loadUser} from '../load_user'

export const emailVerificationSent = (messageDb) => async (message) => {

  const userId = messageDb.streamNameToId(message.metadata.originStreamName)

  const user = await loadUser(userId, messageDb)

  if (!user.isEmailVerificationSent) {
    return writeEmailVerificationSentEvent(message, messageDb)
  }

}
