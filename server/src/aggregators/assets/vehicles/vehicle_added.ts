export const vehicleAdded = (viewDb) => async (event) => {
  const vehicleId = event.data.vehicleId
  const globalPosition = event.globalPosition
  const vehicleData = event.data
  const companyId = event.data.companyId

  const queryString = `
    INSERT INTO 
    vehicles(id, data, company_id, last_message_global_position)
    values(:vehicleId, :vehicleData, :companyId, :globalPosition)
    ON CONFLICT (id) DO NOTHING
    `

  return viewDb.then(client => client.raw(queryString, {
    vehicleId,
    vehicleData,
    companyId,
    globalPosition,
  }))
}

