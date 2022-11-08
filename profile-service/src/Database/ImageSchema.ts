import mongoose, { Schema } from 'mongoose'

/**
 * Schema for storing an image
 */
const ImageSchema = new Schema({
  Name: {
    type: String,
    required : true
  },
  FileName: {
    type: String,
    required: true
  },
  FilePath: { 
    type: String,
    required: true
  }
})

export default ImageSchema;