import {v4 as uuid} from 'uuid'
import {Event, MessageDb} from '../../../message_db'

export const writeCompanyAddedEvent = (message: Event, messageDb: MessageDb) => {

  const companyAddedEvent = {
    id: uuid(),
    type: 'CompanyAdded',
    metadata: message.metadata,
    data: message.data,
  }
  const companyStreamName = `company-${message.data.companyId}`

  return messageDb.write(companyStreamName, companyAddedEvent, -1)

}
