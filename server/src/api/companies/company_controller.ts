import {Controller} from '../common/controller'
import express from 'express'
import {v4 as uuid} from 'uuid'
import {get} from 'lodash'
import {MessageDb} from '../../message_db'

export class CompanyController extends Controller {
  public path = '/companies'

  constructor(private db, private messageDb: MessageDb) {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/addCompany`, this.addCompany)
  }

  private addCompany = async (request: express.Request, response: express.Response) => {

    const body = get(request, 'body')

    const companyId = uuid()
    const traceId = uuid()
    const messageId = uuid()
    const userId = uuid()



    const streamName = `company:command-${companyId}`
    const message = {
      id: messageId,
      type: 'AddCompany',
      metadata: {
        traceId,
        userId,
      },
      data: {
        companyId,
        ...body,
      },
    }

    await this.messageDb.write(streamName, message)

    response.send({
      streamName,
      message,
    })
    
  }

}