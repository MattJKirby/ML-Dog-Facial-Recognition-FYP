import express, { Application } from 'express'
import { IndexRouter } from '../Routes'
import { ProfileRouter } from '../Routes/profiles'

/**
 * Load the application routes
 * @param app 
 */
export const initializeRoutes = (app: Application) => {
  app.use(express.json())

  // load index routes
  app.use('/', IndexRouter)
  app.use('/profiles', ProfileRouter)
}