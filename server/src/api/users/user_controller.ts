import {Controller} from '../common/controller'
import express from 'express'
import {v4 as uuid} from 'uuid'
import {get, isNil, times} from 'lodash'
import {MessageDb} from '../../message_db'
import {registerUser} from './register_user'
import * as utils from '../../utils'
import {Promise} from 'bluebird'
import {joinCompany} from './join_company'
import {logger} from '../../logger'

export class UserController extends Controller {
  public path = '/users'

  constructor(private db, private messageDb: MessageDb) {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/registerUser`, this.registerUser)
    this.router.post(`${this.path}/joinCompany`, this.joinCompany)
    this.router.post(`${this.path}/registerUsersBulk`, this.registerUsersBulk)
    this.router.get(`${this.path}/verifyEmail`, this.verifyEmail)
  }

  private verifyEmail = async (request: express.Request, response: express.Response) => {

    const userId = get(request, 'query.userId')
    const emailAddress = get(request, 'query.emailAddress')

    if (isNil(userId)) {
      return response.status(400).send('Invalid userId')
    }

    if (isNil(emailAddress)) {
      return response.status(400).send('Invalid emailAddress')
    }

    const traceId = uuid()
    const messageId = uuid()

    const streamName = `user:command-${userId}`

    const message = {
      id: messageId,
      type: 'VerifyEmail',
      metadata: {
        traceId,
        userId,
      },
      data: {
        userId,
        emailAddress,
      },
    }

    await this.messageDb.write(streamName, message)

    response.send({
      streamName,
      message,
    })
  }

  private registerUsersBulk = async (request: express.Request, response: express.Response) => {
    const promises = times(25, async () => registerUser(this.messageDb, {
      firstName: utils.randomName(),
      lastName: utils.randomName(),
      emailAddress: utils.randomEmail(),
    }))
    return response.send(await Promise.all(promises))

  }

  private joinCompany = async (request: express.Request, response: express.Response) => {
    try {
      response.send(await joinCompany(this.db, this.messageDb, request.body))
    } catch (error) {
      logger.error('not results', error)
      response.status(401).send(error.message)
    }

  }

  private registerUser = async (request: express.Request, response: express.Response) => response.send(
    await registerUser(this.messageDb, request.body))

}