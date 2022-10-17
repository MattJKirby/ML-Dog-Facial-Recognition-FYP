import express, { Application } from 'express'
import { initializeRoutes } from './src/Startup/routes'
import multer from 'multer'

// Server configuration
const server:Application = express()

// InitaliseRoutes
initializeRoutes(server)


server.listen(5002, ():void => {
  console.log('Service: Running here 👉 https://localhost:')
})