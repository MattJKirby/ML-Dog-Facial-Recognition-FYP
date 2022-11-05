import numpy as np
import json
import io
from PIL import Image
from recognition_service.imageProcessor import ImageProcessor

class ProfileDatastore:

  def __init__(self, database):
    self.database = database
    self.collection = 'profiles'

  # def save_profile(self, name, user, img_arr):
  #   images = []
  #   for image in img_arr:
  #     img = Image.open(image)
  #     image_bytes = io.BytesIO()
  #     img.save(image_bytes, format='PNG')
  #     images.append(image_bytes.getvalue())


  #   self.database[self.collection].insert_one({'name': name, 'images': images})

  def getProfileImagesByUid(self, profileUid):
    profile = self.database[self.collection].find_one({'ProfileUid': profileUid})
    imageList = []
    for image in profile['Images']:
      imageList.append(image['filePath'])
    return imageList

  def getAllProfiles(self):
    profileList = list(self.database[self.collection].find({}, {'_id': 0, 'ProfileUid': 1 ,'Images.filePath': 1}))
    profiles = {}

    for profile in profileList:
      imagePathList = []
      for image in profile['Images']:
        imagePathList.append(image['filePath'])
      profiles[profile['ProfileUid']] = imagePathList

    return profiles