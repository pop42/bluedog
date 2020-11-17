import {MessageDb} from '../../message_db'
import {adminStreams} from './admin_streams'
import {adminTraceIds} from './admin_traceIds'

export const adminAggregator = (viewDb, messageDb: MessageDb) => Promise.all([
  messageDb.subscribe({
    streamName: '$all',
    handlers: {$any: adminStreams(viewDb)},
    subscriberId: 'aggregator:admin:adminStreams',
  }).start(),
  messageDb.subscribe({
    streamName: '$all',
    handlers: {$any: adminTraceIds(viewDb)},
    subscriberId: 'aggregator:admin:adminTraceIds',
  }).start(),
])
