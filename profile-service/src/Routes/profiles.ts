import express, { Request, Response } from 'express'
import multer from 'multer'

export const ProfileRouter = express.Router()

//Initialize File Storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
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
  const image = req.files

  res.json({image: image})
})

ProfileRouter.get('/new', async (req:Request, res:Response): Promise<void> => {

  res.send("This works")
})