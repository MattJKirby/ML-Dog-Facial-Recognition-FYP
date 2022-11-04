import express, { Application } from 'express'
import { initializeRoutes } from './src/Startup/routes'
import { MongoConnectionProvider } from './src/Database/Utility/MongoConnectionProvider'

// Server configuration
const server:Application = express()

// Configure static resources
server.use(express.static(__dirname + '/public'));

// InitaliseRoutes
initializeRoutes(server)

// Database configuration
export const MongoClient = new MongoConnectionProvider('db','localhost', 27017)
MongoClient.Connect()


server.listen(5002, ():void => {
  console.log('Service: Running here 👉 https://localhost:')
})