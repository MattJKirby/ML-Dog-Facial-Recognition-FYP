import { IStoredImage } from "./IStoredImage";

export class ProfileImage implements IStoredImage {
  Name: string;
  FileName: string;
  FilePath: string;

  constructor(profileUid: string, imageIndex: number, fileName: string, filePath: string){
    this.Name = `${profileUid}_image_${imageIndex}`;
    this.FileName = fileName;
    this.FilePath = filePath;
  }

}