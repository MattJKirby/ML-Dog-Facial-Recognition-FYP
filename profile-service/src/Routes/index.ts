import express, { Request, Response } from 'express'

export const IndexRouter = express.Router()

/**
 * GET '/'
 * Returns a string
 */
IndexRouter.get('/', (req:Request, res:Response): void => {
  res.send('Service \'ProfileService\' is running')
})