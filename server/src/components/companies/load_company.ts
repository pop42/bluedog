import {merge, pick} from 'lodash'
import {MessageDb} from '../../message_db'

const projection = {
  init() {
    return {
      id: null,
      name: null,
      billingEmail: null,
      billingAddress: {
        street1: null,
        street2: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      subscriptionId: null,
      isAdded: false,
      isSubscriptionCreated: false,
    }
  },
  CompanyAdded(company, event) {
    company.isAdded = true

    return merge(company, pick(event.data, [
      'id',
      'name',
      'billingEmail',
      'billingAddress.street1',
      'billingAddress.street2',
      'billingAddress.city',
      'billingAddress.state',
      'billingAddress.postalCode',
      'billingAddress.country',
    ]))
  },
  NameChanged(company, event) {
    company.name = event.data.name
    return company
  }

}

export const loadCompany = async (companyId: string, messageDb: MessageDb) => {
  const streamName = `company-${companyId}`
  return messageDb.fetch(streamName, projection)
}

