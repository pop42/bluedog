import {pick} from 'lodash'

export const companyAdded = (viewDb) => async (event) => {
  const companyId = event.data.companyId
  const companyData = pick(event.data, [
    'name',
    'billingEmail',
    'billingAddress.street1',
    'billingAddress.street2',
    'billingAddress.city',
    'billingAddress.state',
    'billingAddress.postalCode',
    'billingAddress.country',
  ])


  const queryString = `
    INSERT INTO 
    companies(id, data)
    values(:companyId, :companyData)
    ON CONFLICT (id) DO NOTHING
    `

  return viewDb.then(client => client.raw(queryString, {
    companyId,
    companyData,
  }))
}