export const adminStreams = (viewDb) => async (event) => {
  const {streamName, id, globalPosition} = event

  const queryString = `
    INSERT INTO 
    admin_streams(stream_name, message_count, last_message_id, last_message_global_position)
    values(:streamName, 1, :id, :globalPosition)
    ON CONFLICT (stream_name) DO UPDATE
      SET
        message_count = admin_streams.message_count + 1,
        last_message_id = :id,
        last_message_global_position = :globalPosition
      WHERE
        admin_streams.last_message_global_position < :globalPosition
    `

  return viewDb.then(client => client.raw(queryString, {
    streamName,
    id,
    globalPosition,
  }))
}