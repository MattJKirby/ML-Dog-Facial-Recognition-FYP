import mongoose, { Schema } from 'mongoose'
import ImageSchema from './ImageSchema';

/**
 * Schema for defining a pet profile
 */
const PetProfileSchema = new Schema({
  ProfileUid: {
    type: String,
    required: true
  },
  
  PetName: {
    type: String,
    required: true
  },

  PetBreed: {
    type: String,
    required: true
  },

  OwnerFirstName: {
    type: String,
    required: true
  },

  OwnerLastName: {
    type: String,
    required: true
  },

  OwnerMobileNumber: {
    type: String,
    required: true
  },

  // PetAge: {
  //   type: Number,
  //   required: true,
  //   min: [0, 'Cannot be less than 0, got {VALUE}'],
  //   max: 25
  // },

  Images: {
    type: [ImageSchema],
    required: true,
    minLength: 4,
    maxLength: 8
  }  
})

export default PetProfileSchema;