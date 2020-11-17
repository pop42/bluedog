import {Controller} from '../common/controller'
import express from 'express'
import {MessageDb} from '../../message_db'
import {addCompany} from './add_company'

export class CompanyController extends Controller {
  public path = '/companies'

  constructor(private db, private messageDb: MessageDb) {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/addCompany`, this.addCompany)
  }

  private addCompany = async (request: express.Request, response: express.Response) => response.send(
    await addCompany(this.messageDb, request.body))

}