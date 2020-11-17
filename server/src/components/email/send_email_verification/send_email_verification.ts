import {loadEmail} from '../load_email'
import {writeEmailVerificationSentEvent} from './write_email_verification_sent_event'
import {MessageDb} from '../../../message_db'

export const sendEmailVerification = (messageDb: MessageDb) => async (message) => {
  const emailId = message.data.emailId

  const email = await loadEmail(emailId, messageDb)

  if (!email.isSent) {
    return writeEmailVerificationSentEvent(message, messageDb)
  }

}
