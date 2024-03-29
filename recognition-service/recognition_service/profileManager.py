import io
import json
import requests
from PIL import Image
from recognition_service.imageProcessor import ImageProcessor
from recognition_service.datastores.profileDatastore import ProfileDatastore

class ProfileManager:

  def __init__(self, db_connector):
    self.profile_db = db_connector.connect('db')
    self.datastore = ProfileDatastore(self.profile_db)
    self.img_processor = ImageProcessor()
    
  def newProfile(self, profileUid):
    image_processor = ImageProcessor()
    imageList = []
    uidList = []
    for path in self.datastore.getProfileImagesByUid(profileUid):
      uidList.append(profileUid)
      imageList.append(self.convertPathToImage(path))
   
    return (uidList, image_processor.pre_process_images(imageList) )

  def loadProfiles(self):
    image_processor = ImageProcessor()
    profileDict = self.datastore.getAllProfiles()
    profileImages = []
    profileUids = []

    if len(profileDict) == 0:
      return

    for profile in profileDict:
      for path in profileDict[profile]:
        profileUids.append(profile)
        img = self.convertPathToImage(path)

        if(img != None):
          profileImages.append(img)

    if len(profileImages) == 0:
      return
    
    return(profileUids, image_processor.pre_process_images(profileImages))

  def convertPathToImage(self, path):
    serverPath = 'http://profile-service:3000/' + path.split('public/')[1]
    response = requests.get(serverPath, stream=True)

    if response.status_code != 404:
      return io.BytesIO(response.content)
    else:
      return None

  def getProfilesByIndexArray(self, indexes):
    profiles = self.datastore.getProfilesBySortedUidIndex(indexes)
    jsonProfiles = json.dumps([result for result in profiles], default=str)
    return jsonProfiles

  def getProfileByProfileUid(self, uid):
    profile = self.datastore.getprofileByUid(uid)

    jsonProfile = json.dumps(profile, default=str)
    return jsonProfile
