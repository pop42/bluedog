import {writeCompanyJoinedEvent} from './write_company_joined_event'
import {MessageDb} from '../../../message_db'
import {loadUser} from '../load_user'
import {writeJoinCompanyFailedEvent} from './write_join_company_failed_event'

export const joinCompany = (messageDb: MessageDb) => async (message) => {
  const {userId} = message.data

  const user = await loadUser(userId, messageDb)

  if (user.sequence > message.globalPosition) {
    return // do nothing
  } else if (user.isCompanyJoined) {
    return  writeJoinCompanyFailedEvent(message, messageDb)
  } else if (!user.isRegistered || !user.isEmailVerified) {
    return writeJoinCompanyFailedEvent(message, messageDb)
  } else {
    return writeCompanyJoinedEvent(message, messageDb)
  }

}
//