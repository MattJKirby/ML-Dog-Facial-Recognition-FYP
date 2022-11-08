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
  if(req.files == undefined || req.files?.length < 1){
    throw new Error("Please provide at least 4 images")
  }
  const profile = await profileManger.NewProfile(req.body.petName, Object.values(req.files))
  const response = axios.post('http://127.0.0.1:5000/loadProfile', {ProfileUid: profile.ProfileUid},{headers: {'Content-Type': 'multipart/form-data'}})

  res.json({image: req.files})
})

ProfileRouter.get('/new', async (req:Request, res:Response): Promise<void> => {

  res.send("This works")
})