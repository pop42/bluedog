import {loadCompany} from '../load_company'
import {writeOwnerToCompanyAssignedEvent} from './write_owner_to_company_assigned_event'

export const ownerToCompanyAssigned = (messageDb) => async (message) => {

  const companyId = messageDb.streamNameToId(message.metadata.originStreamName)

  const company = await loadCompany(companyId, messageDb)

  if (!company.isOwnerAssigned) {
    return writeOwnerToCompanyAssignedEvent(message, messageDb)
  }

}
