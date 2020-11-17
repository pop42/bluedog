import {MessageDb} from '../../message_db'

const projection = {
  init() {
    return {
      isSent: false
    }
  },
  EmailVerificationSent(email) {
    email.isSent = true
    return email
  },
}

export const loadEmail = async (emailId: string, messageDb: MessageDb) => {
  const streamName = `email-${emailId}`
  return messageDb.fetch(streamName, projection)
}

