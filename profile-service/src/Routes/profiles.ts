import express, { Request, Response } from 'express'
import multer from 'multer'
import { register } from 'ts-node'
import PetProfileSchema from '../Database/PetProfileSchema'
import ProfileDataStore from '../DataStores/ProfileDataStore'
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


  profileManger.NewProfile(req.body.petName, Object.values(req.files))

  res.json({image: req.files})
})

ProfileRouter.get('/new', async (req:Request, res:Response): Promise<void> => {

  res.send("This works")
})