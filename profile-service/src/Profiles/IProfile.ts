import { IStoredImage } from "./IStoredImage";

/**
 * Defines the structure of a Profile object
 */
export interface IProfile {
  ProfileUid: string,
  PetName: string,
  Images: IStoredImage[]
}