import {v4 as uuid, v5 as uuidv5} from 'uuid'
import {Event, MessageDb} from '../../../message_db'
import {UserProjection} from '../load_user'

export const writeSendEmailVerificationEvent = (args: {
  message: Event
  email: {
    subject: string
    text: string
    html: string
  }
  user: UserProjection
  messageDb: MessageDb
}) => {

  const {message, email, user, messageDb} = args
  const emailId = uuidv5(user.emailAddress, 'ec427571-6a21-4c5d-bcae-69ac12924e67')
  const event = {
    id: uuid(),
    type: 'SendEmailVerification',
    metadata: {
      originStreamName: `user-${user.id}`,
      traceId: message.metadata.traceId,
      userId: message.metadata.userId,
    },
    data: {
      emailId,
      to: user.emailAddress,
      subject: email.subject,
      text: email.text,
      html: email.html,
    },
  }

  const streamName = `email:command-${emailId}`

  return messageDb.write(streamName, event)

}


