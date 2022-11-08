import { Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import ProfileDataStore from '../DataStores/ProfileDataStore';
import { IProfile } from './IProfile';
import { IStoredImage } from './IStoredImage';
import { ProfileImage } from './ProfileImage';


/**
 * Class For handling mass profile functionality
 */
export class ProfileManager {

  /**
   * Creates a new profile, checking if one with the same UID doesnt't already exist
   * @param name 
   * @param receivedFiles 
   */
  public NewProfile = async (name: string, receivedFiles: Express.Multer.File[] ): Promise<IProfile> => {
    const generatedUid = uuidv4()

    if(await ProfileDataStore.GetItem({ProfileUid: generatedUid}) !== null){
      throw new Error(`Error creating profile! profile with UID '${generatedUid}' already exists.`)
    }

    return await ProfileDataStore.addProfile(uuidv4(), name, this.generateProfileImages(receivedFiles, generatedUid))
  }

  /**
   * Method for generating a list of ProfileImages from the list of file received
   * @param fileArray 
   * @param assignedUid 
   */
  private generateProfileImages = (fileArray: Express.Multer.File[], assignedUid: string) => {
    return fileArray.map((file, index) => new ProfileImage(assignedUid, index, file.originalname, file.path))
  }
}