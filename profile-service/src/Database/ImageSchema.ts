import mongoose, { Schema } from 'mongoose'

/**
 * Schema for storing an image
 */
const ImageSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  fileName: {
    type: String,
    required: true
  },
  image: { 
    data: Buffer,
    contentType: String 
  }
})

export default ImageSchema;