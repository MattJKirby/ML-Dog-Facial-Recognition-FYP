import express, { Application } from "express";
import { initializeRoutes } from "./src/Startup/routes";
import { MongoConnectionProvider } from "./src/Database/Utility/MongoConnectionProvider";
import cors from "cors";

// Server configuration
const server: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
};

server.use(cors(corsOptions));

// Configure static resources
server.use(express.static("/app" + "/public"));

// InitaliseRoutes
initializeRoutes(server);

// Database configuration
export const MongoClient = new MongoConnectionProvider("db", "mongodb", 27017);
MongoClient.Connect();

server.listen(3000, (): void => {
  console.log("Service: Running here 👉 https://localhost:3000");
});
