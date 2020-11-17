import {loadCompany} from '../load_company'
import {writeCompanyAddedEvent} from './write_company_added_event'
import {MessageDb} from '../../../message_db'

export const addCompany = (messageDb: MessageDb) => async (message) => {
  const companyId = message.data.companyId

  const company = await loadCompany(companyId, messageDb)

  if (!company.isAdded) {
    return writeCompanyAddedEvent(message, messageDb)
  }

}
