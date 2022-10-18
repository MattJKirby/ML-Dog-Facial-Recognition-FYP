import mongoose from "mongoose";

/**
 * Defned useful utilities for connection to a mongo database
 */
export class MongoConnectionProvider {

  /**
   * Mongo db name
   */
  public DatabaseName: string

  /**
   * Mongo db path
   */
  public DatabasePath: string

  /**
   * Mongo db port
   */
  public DatabasePort: number

  /**
   * Mongo db connection
   */
  public Connection: mongoose.Connection = mongoose.connection

  constructor(name: string, path: string, port: number) {
    this.DatabaseName = name;
    this.DatabasePath = path;
    this.DatabasePort = port;
  }

  /**
   * Defines connection event functionality
   * @param connectionUri 
   */
  private initializeConnectionEvents = (connectionUri: string) => {
    this.Connection
      .on('error', () => console.log(`Error connecting to database on: ${connectionUri}`))
      .once('open', () => console.log(`Successful connection to database on: ${connectionUri}`))
  }

  /**
   * Constructs the MongoDb connection URI
   * @returns 
   */
  public ConnectionUri = (): string => `mongodb://${this.DatabasePath}:${this.DatabasePort}/${this.DatabaseName}`

  /**
   * Initalises a new mongo connection. 
   */
  public Connect = async (): Promise<void> => {
    const connectionUri = this.ConnectionUri()
    this.initializeConnectionEvents(connectionUri)
    await mongoose.connect(connectionUri).catch((err) => {
      console.log(err)
    })
  }
}