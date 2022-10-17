import mongoose, { Schema } from 'mongoose'

/**
 * Schema for storing an image
 */
const ImageSchema = new Schema({
  image: { 
    data: Buffer,
    contentType: String 
  }
})

export default ImageSchema;