import {MessageDb} from '../../message_db'
import {companyAdded} from './company_added'

export const companiesAggregator = (viewDb, messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'company',
    handlers: {CompanyAdded: companyAdded(viewDb)},
    subscriberId: 'aggregator:company',
  }).start(),
])
