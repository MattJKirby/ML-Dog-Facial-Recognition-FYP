import axios from 'axios'
import express, { Request, Response } from 'express'
import multer from 'multer'
import { ProfileManager } from '../Profiles/ProfileManager'

export const ProfileRouter = express.Router()

const profileManger = new ProfileManager()

//Initialize File Storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },

  filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
  }
})

export const upload = multer({ storage: multerStorage });

/**
 * Post '/'
 * Returns a string
 * Can accept max 8 images
 */
ProfileRouter.post('/new',upload.array('image',8) , async (req:Request, res:Response): Promise<void> => {
  const {petName, firstName, lastName, breed, mobile} = req.body;
  if(req.files == undefined || req.files?.length < 1){
    throw new Error("Please provide at least 4 images")
  }

  try {
    const profile = await profileManger.NewProfile(petName, breed, firstName, lastName, mobile, Object.values(req.files))
    const response = axios.post('http://127.0.0.1:5000/loadProfile', {ProfileUid: profile.ProfileUid},{headers: {'Content-Type': 'multipart/form-data'}})
    res.json({image: req.files})
  } catch (error){
    res.json({error: 'Error uploading profile.'})
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