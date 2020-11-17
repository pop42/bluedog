import * as reader from './reader'
import * as writer from './writer'
import {Client} from 'pg'
import {getClient} from './client'
import {isNil} from 'lodash'
import {Subscriber} from './subscriber'
import {logger} from '../logger'
import {category} from './category'

export interface Event {
  id: string
  type: string
  metadata: Record<string, unknown> & { traceId: string, originStreamName?: string }
  data: Record<string, unknown>
}

export type Messages = (Message | null)[]

export type Message = Event & {
  streamName: string
  position: number
  globalPosition: number
  time: string
}

export class MessageDb {

  private db!: Client

  constructor(private connectionString: string) {
  }

  init = async () => {
    if (isNil(this.db)) {
      this.db = await getClient(this.connectionString)
    }
    logger.info('The messageDb is initialized')

  }

  write = async (streamName: string, message: Event, expectedVersion?: number) => writer.write(this.db, streamName,
    message, expectedVersion)

  read = async (streamName: string, fromPosition?: number, maxMessages?: number) => reader.read(this.db, streamName,
    fromPosition, maxMessages)

  readLastMessage = async (streamName: string) => reader.readLastMessage(this.db, streamName)

  fetch = async (streamName: string, projection: Record<string, unknown>) => reader.fetch(this.db, streamName,
    projection)

  stop = () => this.db?.end()

  subscribe = ({
                 streamName, handlers, subscriberId, originStreamName,
               }: {
    streamName: string
    handlers: Record<string, unknown>
    subscriberId: string
    originStreamName?: string
  }) => new Subscriber(this.read, this.readLastMessage, this.write).subscribe({
    streamName,
    handlers,
    subscriberId,
    originStreamName,
  })

  streamNameToId = (streamName?: string) => (streamName || '').split(/-(.+)/)[1]
  streamNameToCategory = (streamName: string) => category(streamName)
}