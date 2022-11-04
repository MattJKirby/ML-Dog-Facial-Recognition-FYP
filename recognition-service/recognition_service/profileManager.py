import io
import requests
from PIL import Image
from recognition_service.imageProcessor import ImageProcessor
from recognition_service.datastores.profileDatastore import ProfileDatastore

class ProfileManager:

  def __init__(self, db_connector):
    self.profile_db = db_connector.connect('db')
    self.datastore = ProfileDatastore(self.profile_db)
    self.img_processor = ImageProcessor()
    
  def newProfile(self, name, user, files):
    
    if len(files) < 2 or len(files) > 8:
      raise Exception(f'Error uploading files: (Found {len(files)}, require between 4 and 8)')

    for img in files:
      try:
        self.img_processor.validate_image_format(img)
      except Exception as e:
        raise Exception(f'{e}')
        
    if name == None or len(name) < 1:
      raise Exception(f'Invalid name: \'{name}\'')

    if user == None or len(user) < 1:
      raise Exception(f'Invalid user: \'{user}\'')

    self.datastore.save_profile(name, user, files)

  def loadProfiles(self):
    image_processor = ImageProcessor()
    profileDict = self.datastore.getAllProfiles()
    profileImages = []
    profileUids = []

    for profile in profileDict:
      for path in profileDict[profile]:
        profileUids.append(profile)
        serverPath = 'http://localhost:5002/' + path.split('public/')[1]
        response = requests.get(serverPath, stream=True)
        img = io.BytesIO(response.content)
        profileImages.append(img)


    return(profileUids, image_processor.pre_process_images(profileImages))
  
   
