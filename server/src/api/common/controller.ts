import express from 'express'

export abstract class Controller {
  public router = express.Router()
}