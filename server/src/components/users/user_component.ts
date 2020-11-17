import {Promise} from 'bluebird'
import {registerUser} from './register_user/register_user'
import {userRegistered} from './user_registered/user_registered'
import {MessageDb} from '../../message_db'
import {emailVerificationSent} from './email_verification_sent/email_verification_sent'
import {verifyEmail} from './verify_email/verify_email'
import {joinCompany} from './join_company/join_company'

export const userComponent = (messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'user:command',
    handlers: {
      RegisterUser: registerUser(messageDb),
      VerifyEmail: verifyEmail(messageDb),
      JoinCompany: joinCompany(messageDb),
    },
    subscriberId: 'components:user:command',
  }).start(),
  messageDb.subscribe({
    streamName: 'user',
    handlers: {UserRegistered: userRegistered(messageDb)},
    subscriberId: 'components:user',
  }).start(),
  messageDb.subscribe({
    streamName: 'email',
    handlers: {EmailVerificationSent: emailVerificationSent(messageDb)},
    subscriberId: 'components:user:email',
    originStreamName: 'user',
  }).start(),

])


