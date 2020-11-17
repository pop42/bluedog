import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {Controller} from './common/controller'

export class Api {
  public app: express.Application

  constructor(controllers: Controller[], private baseRoute: string = '/api') {
    this.app = express()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares = () => {
    this.app.use(bodyParser.json())
    this.app.use(cors({origin: true}))
  }

  private initializeControllers = (controllers: Controller[])  => {
    controllers.forEach(controller => {
      this.app.use(this.baseRoute, controller.router)
    })

    // TODO: add in default route for ApiNotFoundException
  }

  // TODO: add in error handling
  private initializeErrorHandling = () => {
    // do nothing
  }
}