from recognition_service.datastores.profileDatastore import ProfileDatastore

class ProfileManager:

  def __init__(self, db_connector):
    self.profile_db = db_connector.connect('db')
    self.datastore = ProfileDatastore(self.profile_db)
    
  def newProfile(self, name, user, img_arr):
  
    if name == None or len(name) < 1:
      raise Exception(f'Invalid name: \'{name}\'')

    if user == None or len(user) < 1:
      raise Exception(f'Invalid user: \'{user}\'')

    self.datastore.save_profile(name, user, img_arr)
