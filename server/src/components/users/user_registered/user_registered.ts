import {loadUser} from '../load_user'
import {writeSendEmailVerificationEvent} from './write_send_email_verification_event'

export const userRegistered = messageDb => async (message) => {
  const userId = message.data.userId

  const user = await loadUser(userId, messageDb)

  if (!user.isEmailVerificationSent) {
    const email = {
      html: 'This is my email html',
      text: 'This is my email text',
      subject: 'This is my email subject',
    }

    return writeSendEmailVerificationEvent({
      email,
      message,
      user,
      messageDb: messageDb,
    })
  }

}
