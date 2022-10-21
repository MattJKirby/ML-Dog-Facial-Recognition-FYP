import numpy as np
import io
from PIL import Image
from recognition_service.imageProcessor import ImageProcessor

class ProfileDatastore:

  def __init__(self, database):
    self.database = database
    self.collection = 'profiles'

  def save_profile(self, name, user, img_arr):
    images = []
    for image in img_arr:
      img = Image.open(image)
      image_bytes = io.BytesIO()
      img.save(image_bytes, format='PNG')
      images.append(image_bytes.getvalue())


    self.database[self.collection].insert_one({'name': name, 'images': images})