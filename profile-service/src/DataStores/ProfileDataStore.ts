import mongoose, { Model, Schema } from 'mongoose'
import PetProfileSchema from '../Database/PetProfileSchema';
import { DataStore } from './DataStore';

/**
 * Contains actions pertaining to storing and accessing Profiles
 */
class ProfileDataStore extends DataStore<any>{

  public addProfile = async (uid: string, name: string, imageArray: any[]) => {
    return await this.Model.create({
      ProfileUid: uid,
      PetName: name,
      Images: imageArray
    })
  }
  
}

export default new ProfileDataStore('Profile', PetProfileSchema)