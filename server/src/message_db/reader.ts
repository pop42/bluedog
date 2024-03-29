import {deserializeMessage} from './deserialize_message'
import {map} from 'lodash'
import {Messages} from './index'

const getLastMessageSql = 'SELECT * FROM get_last_stream_message($1)'
const getCategoryMessagesSql = 'SELECT * FROM get_category_messages($1, $2, $3)'
const getStreamMessagesSql = 'SELECT * FROM get_stream_messages($1, $2, $3)'

const getAllMessagesSql = `
  SELECT 
    id::varchar,
    stream_name::varchar,
    type::varchar,
    position::bigint,
    global_position::bigint,
    data::varchar,
    metadata::varchar,
    time::timestamp
  FROM
    messages
  WHERE
    global_position >= $1 
  LIMIT $2`

/**
 * @description Projects an array of events, running them through projection.
 * Does so by checking to see if `projection` defines a handler for each event
 * type.  If it does, then it calls into that function with the running state
 * and current event, passing the return value to the next iteration.
 * @param {object[]} events The events to project
 * @param {object.<string, function>} projection The projection to run the
 * events through.
 * @param {function} projection.init A function returning the starting value
 * for the projection.  This property is not optional!
 * @returns {object} The result of projecting the events
 */
export const project = (events, projection) => {
  return events.reduce((entity, event) => {
    if (!projection[event.type]) {
      return entity
    }

    return projection[event.type](entity, event)
  }, projection.init())
}

/**
 * @description Returns the most recently written message in an entity stream.
 * This does not work on categories.
 * @param {string} stream The stream from which to read
 * @returns {Promise<object} A Promise resolving to the last message
 */
export const readLastMessage = async (db, streamName: string) => {
  const results = await db.query(getLastMessageSql, [streamName])
  return deserializeMessage(results.rows[0])
}

/**
 * @description Dispatches a read request to the correct reader function.
 * Which function to use is determined by the `streamName` parameter.  This
 * function supports category streams and the special `$all` stream and reads
 * `maxCount` messages starting from `fromPosition` within the stream.  `$all`
 * and category streams use the `id` column, and all other streams use
 * `position`.
 * @param {string} streamName The name of the stream to read from
 * @param {number} [fromPosition=0] The position in the stream to start
 * reading from
 * @param {number} [maxMessages=1000] Maximum number of messages to return.
 */
export const read = async (db, streamName, fromPosition = 0, maxMessages = 1000): Promise<Messages> => { // (2)
  let query: string | null = null // (3)
  let values: [number, number] | [string, number, number] | [] = []
  if (streamName === '$all') {
    query = getAllMessagesSql
    values = [
      fromPosition,
      maxMessages,
    ]
  } else if (streamName.includes('-')) { // (4)
    // Entity streams have a dash
    query = getStreamMessagesSql
    values = [
      streamName,
      fromPosition,
      maxMessages,
    ]
  } else { // (5)
    // Category streams do not have a dash
    query = getCategoryMessagesSql
    values = [
      streamName,
      fromPosition,
      maxMessages,
    ]
  }

  const results = await db.query(query, values)
  return map(results.rows, deserializeMessage)

}

/**
 * @description Fetches an entity from the store by loading the messages for
 * the given `streamName` and running them through the given `projection`.
 * @param {string} streamName The name of the stream to fetch
 * @param {Object} projection The projection to run it through
 * @param {Object} projection.init Starting state for the projection
 */
export const fetch = async (db, streamName, projection) => {
  const messages = await read(db, streamName)
  return project(messages, projection)
}
