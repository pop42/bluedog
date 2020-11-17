import {Promise} from 'bluebird'
import {MessageDb} from '../../message_db'
import {addCompany} from './add_company/add_company'

export const companyComponent = (messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: 'company:command',
    handlers: {AddCompany: addCompany(messageDb)},
    subscriberId: 'components:company:command',
  }).start(),
  // messageDb.subscribe({
  //   streamName: 'company',
  //   handlers: {CompanyAdded: assignOwnerToCompany(messageDb)},
  //   subscriberId: 'components:company',
  // }).start(),
  // messageDb.subscribe({
  //   streamName: 'user',
  //   handlers: {OwnerToCompanyAssigned: ownerToCompanyAssigned(messageDb)},
  //   subscriberId: 'components:company:user',
  //   originStreamName: 'company',
  // }).start(),
])
