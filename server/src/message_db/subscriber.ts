import {Promise} from 'bluebird'
import {v4 as uuidv4} from 'uuid'
import {get} from 'lodash'

import {category} from './category'
import {logger} from '../logger'
import {Message, Messages} from './index'

export class Subscriber {
  private streamName!: string
  private handlers
  private messagesPerTick!: number
  private subscriberId!: string
  private positionUpdateInterval!: number
  private originStreamName?: string | null
  private tickIntervalMs!: number
  private subscriberStreamName!: string
  private isSubscribed = false
  private currentPosition = 0
  private messagesSinceLastPositionWrite = 0
  private isPolling = true

  constructor(private readonly read: Promise<Messages>, private readonly readLastMessage: Promise<Message>, private readonly write) {
  }

  subscribe = (args: {
    streamName: string
    handlers
    subscriberId: string
    messagesPerTick?: number
    positionUpdateInterval?: number
    originStreamName?: string
    tickIntervalMs?: number
  }) => {
    this.streamName = args.streamName
    this.handlers = args.handlers
    this.messagesPerTick = args.messagesPerTick || 100
    this.subscriberId = args.subscriberId
    this.positionUpdateInterval = args.positionUpdateInterval || 100
    this.originStreamName = args.originStreamName || null
    this.tickIntervalMs = args.tickIntervalMs || 100
    this.subscriberStreamName = `subscriberPosition-${args.subscriberId}`
    this.isSubscribed = true
    return this
  }

  loadPosition = async () => {
    const message = await this.readLastMessage(this.subscriberStreamName)
    return this.currentPosition = message ? message.data.position : 0
  }

  start = async () => {
    if (this.isSubscribed) {
      return this.poll()
    }

  }

  /**
   * @description - Generally not called from the outside.  This function is
   *   called on each of the timeouts to see if there are new events that need
   *   processing.
   */
  tick = async () => {
    try {
      const messages = await this.getNextBatchOfMessages()
      return await this.processBatch(messages)
    } catch (error) {
      logger.error('Error processing batch', error)
      this.stop()
    }
  }

  stop = () => {
    logger.warn(`Stopped ${this.subscriberId}`)
    this.isPolling = false
  }

  /**
   * @description - Writes the subscription's read position
   */
  writePosition = async (position) => {
    const positionEvent = {
      id: uuidv4(),
      type: 'Read',
      data: {position},
    }

    return this.write(this.subscriberStreamName, positionEvent)
  }

  private poll = async () => {
    await this.loadPosition()
    while (this.isPolling) {
      const messagesProcessed = await this.tick()

      if (messagesProcessed === 0) {
        await Promise.delay(this.tickIntervalMs)
      }
    }
  }

  private updateReadPosition = async (position) => {
    this.currentPosition = position
    this.messagesSinceLastPositionWrite += 1

    if (this.messagesSinceLastPositionWrite === this.positionUpdateInterval) {
      this.messagesSinceLastPositionWrite = 0

      return this.writePosition(position)
    }

    return true
  }

  private handleMessage = async (message) => {
    const handler = this.handlers[message.type] || this.handlers.$any
    return handler ? handler(message) : true
  }

  private processBatch = async (messages) => {
    for (const message of messages) {
      try {
        await this.handleMessage(message)
        await this.updateReadPosition(message.globalPosition)
      } catch (error) {
        this.logError(message, error)
        throw error
      }
    }
    return messages.length

  }

  private logError = (lastMessage, error) => logger.error('error processing: ', {
    subscriberId: this.subscriberId,
    lastMessageId: lastMessage.id,
    error,
  })

  private filterOnOriginMatch = (messages) => {
    if (!this.originStreamName) {
      return messages
    }

    return messages.filter(message => this.originStreamName === category(get(message, 'metadata.originStreamName')))
  }

  private getNextBatchOfMessages = async () => {
    const messages = await this.read(this.streamName, this.currentPosition + 1, this.messagesPerTick)
    return this.filterOnOriginMatch(messages)
  }
}

