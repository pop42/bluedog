import {MessageDb} from '../../message_db'
import {userRegistered} from './user_registered'
import {emailVerified} from './email_verified'

export const usersAggregator = (viewDb, messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'user',
    handlers: {
      UserRegistered: userRegistered(viewDb),
      EmailVerified: emailVerified(viewDb),
    },
    subscriberId: 'aggregator:user',
  }).start(),
])
