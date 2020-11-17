import {Controller} from '../common/controller'
import express from 'express'
import {MessageDb} from '../../message_db'
import {addVehicle} from './add_vehicle'

export class AssetController extends Controller {
  public path = '/assets'

  constructor(private db, private messageDb: MessageDb) {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/addVehicle`, this.addVehicle)
  }

  private addVehicle = async (request: express.Request, response: express.Response) => response.send(
    await addVehicle(this.messageDb, request.body))

}