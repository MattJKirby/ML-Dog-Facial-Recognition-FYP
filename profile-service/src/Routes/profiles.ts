import axios from 'axios'
import express, { Request, Response } from 'express'
import multer from 'multer'
import { ProfileManager } from '../Profiles/ProfileManager'
import { v4 as uuidv4 } from 'uuid';

export const ProfileRouter = express.Router()

const profileManger = new ProfileManager()

//Initialize File Storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },

  filename: function (req: any, file: any, cb: any) {
      const imgUid = uuidv4()
      cb(null, `${imgUid}_${file.originalname}`)
  }
})

export const upload = multer({ storage: multerStorage });

/**
 * Post '/'
 * Returns a string
 * Can accept max 8 images
 */
ProfileRouter.post('/new',upload.array('image',8) , async (req:Request, res:Response): Promise<void> => {
  const {dogName, ownerfName, ownerlName, breed, phoneNumber} = req.body;
  if(req.files == undefined || req.files?.length < 1){
    throw new Error("Please provide at least 4 images")
  }

  try {
    const profile = await profileManger.NewProfile(dogName, breed, ownerfName, ownerlName, phoneNumber, Object.values(req.files))
    const response = axios.post('http://127.0.0.1:5001/loadProfile', {ProfileUid: profile.ProfileUid},{headers: {'Content-Type': 'multipart/form-data'}})
    res.json({image: req.files})
  } catch (error){
    res.json({error: 'Error uploading profile.', statusCode: 200})
  };
})

ProfileRouter.post('/latest', async (req:Request, res:Response): Promise<void> => {
  const count = req.body.latestCount;

  if(count === undefined || count < 1 || count > 10){
    throw new Error("Invalid latest post value")
    res.json({message: 'Invalid latest post value', httpCode: 400})
  };

  const profiles = await profileManger.GetLatestProfiles(count)

  res.json({profiles: profiles, statusCode: 200});
})
