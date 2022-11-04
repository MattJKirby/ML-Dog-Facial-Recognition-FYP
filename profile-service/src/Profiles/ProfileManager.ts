import { v4 as uuidv4 } from 'uuid';
import ProfileDataStore from '../DataStores/ProfileDataStore';
import { IProfile } from './IProfile';
import { IStoredImage } from './IStoredImage';


/**
 * Class For handling mass profile functionality
 */
export class ProfileManager {

  /**
   * Creates a new profile, checking if one with the same UID doesnt't already exist
   * @param name 
   * @param imageArray 
   */
  public NewProfile = async (name: string, imageArray: IStoredImage[] ): Promise<IProfile> => {
    const generatedUid = uuidv4()

    if(await ProfileDataStore.GetItem({ProfileUid: generatedUid}) !== null){
      throw new Error(`Error creating profile! profile with UID '${generatedUid}' already exists.`)
    }
    return await ProfileDataStore.addProfile(uuidv4(), name, imageArray)
  }
}