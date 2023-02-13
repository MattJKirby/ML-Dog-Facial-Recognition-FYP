import mongoose, { Model, Schema } from 'mongoose'
import PetProfileSchema from '../Database/PetProfileSchema';
import { DataStore } from './DataStore';

/**
 * Contains actions pertaining to storing and accessing Profiles
 */
class ProfileDataStore extends DataStore<any>{

  public addProfile = async (uid: string, name: string, breed: string, ownerFName: string, ownerLName: string, ownerMob: string,imageArray: any[]) => {
    return await this.Model.create({
      ProfileUid: uid,
      PetName: name,
      Breed: breed,
      OwnerFirstName: ownerFName,
      OwnerLastName: ownerLName,
      OwnerMobileNumber: ownerMob,
      Images: imageArray
    })
  };

  /**
   * Store action for getting the latest n pet profiles.
   * @param itemCount 
   * @returns 
   */
  public getNLatest = async (itemCount: number) => {
    return await this.Model.find().limit(itemCount).sort({$natural: -1})
  }
  
}

export default new ProfileDataStore('Profile', PetProfileSchema)