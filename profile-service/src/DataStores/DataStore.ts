import mongoose, { Model, Schema } from 'mongoose'

/**
 * Defines common datastore functionality
 */
export abstract class DataStore<T> {

  /**
   * Mongoose model pertaining to the datastore type
   */
   public Model: Model<any>

   constructor (modelName: string, schema: Schema) {
     this.Model = mongoose.model(modelName, schema)
   }

   /**
   * Finds a single item matching a given query
   * @param query
   * @returns
   */
    public GetItem = async (query: any): Promise<T | null> => {
      return await this.Model.findOne(query)
    }
}