import * as utils from '../../utils'
export const adminTraceIds = (viewDb) => async (event) => {
  const {streamName, type, globalPosition, metadata} = event
  const category = utils.streamNameToCategory(streamName)
  const traceId = metadata.traceId
  const data = `["${category}.${type}"]`

  if (traceId) {
    const queryString = `
    INSERT INTO
    admin_trace_ids(trace_id, json_data, last_message_global_position)
    values(:traceId,:data, :globalPosition)
    ON CONFLICT (trace_id) DO UPDATE
      SET
        json_data = admin_trace_ids.json_data || :data,
        last_message_global_position = :globalPosition
      WHERE
        admin_trace_ids.last_message_global_position < :globalPosition
    `

    return viewDb.then(client => client.raw(queryString, {
      traceId,
      data,
      globalPosition,
    }))
  }
}

