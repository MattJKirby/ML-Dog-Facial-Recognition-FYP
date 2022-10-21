from PIL import Image
import numpy as np

class ImageProcessor:

  def __init__(self):
    self.accepted_formats = ['.jpg', '.png']
  
  def validate_image_format(self, file):
    ext = f'.{file.filename.split(".")[-1]}'

    if not ext in self.accepted_formats:
      raise Exception(f'Invalid image format: \'{ext}\'. Allowed formats are: {",".join(self.accepted_formats)}')

  
  
  def pre_process_image(self, path):

     # Load RGB image 
    img = Image.open(path).convert("RGB")

    # Resize image to specified image dimensions
    img = img.resize((224,224),Image.ANTIALIAS)

    # Rescale the image
    img = np.array(img)/255

    # Convert tensor to 4D
    img = np.expand_dims(img, 0)

    return img