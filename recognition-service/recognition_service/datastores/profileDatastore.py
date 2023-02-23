import numpy as np
import json
import io
from PIL import Image
from recognition_service.imageProcessor import ImageProcessor

class ProfileDatastore:

  def __init__(self, database):
    self.database = database
    self.collection = 'profiles'


  def getProfileImagesByUid(self, profileUid):
    profile = self.database[self.collection].find_one({'ProfileUid': profileUid})
    imageList = []
    for image in profile['Images']:
      imageList.append(image['FilePath'])
    return imageList

  def getprofileByUid(self, profileUid):
    profile = self.database[self.collection].find_one({'ProfileUid': profileUid})
    return profile

  def getAllProfiles(self):
    profileList = list(self.database[self.collection].find({}, {'_id': 0, 'ProfileUid': 1 ,'Images.FilePath': 1}))
    profiles = {}

    for profile in profileList:
      imagePathList = []
      for image in profile['Images']:
        imagePathList.append(image['FilePath'])
      profiles[profile['ProfileUid']] = imagePathList

    return profiles

  def getProfilesBySortedUidIndex(self, indexes):
    profiles = []
    profileList = list(self.database[self.collection].find({}, {'_id': 0}).sort('ProfileUid', 1))

    for i in indexes:
      profiles.append(profileList[i])


    return profiles