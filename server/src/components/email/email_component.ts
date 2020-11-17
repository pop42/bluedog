import {Promise} from 'bluebird'
import {MessageDb} from '../../message_db'
import {sendEmailVerification} from './send_email_verification/send_email_verification'

export const emailComponent = (messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'email:command',
    handlers: {SendEmailVerification: sendEmailVerification(messageDb)},
    subscriberId: 'components:email:command',
  }).start(),
])
