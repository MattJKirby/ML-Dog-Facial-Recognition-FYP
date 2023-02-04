import express, { Request, Response } from 'express'

export const IndexRouter = express.Router()

/**
 * GET '/'
 * Returns a string
 */
IndexRouter.get('/status', (req:Request, res:Response): void => {
  res.json({'message': 'Service \'ProfileService\' is running', statusCode: 200})
})