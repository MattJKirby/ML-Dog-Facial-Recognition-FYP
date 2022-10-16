import sys
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

class ImageProcessor:

  def pre_process_image(self, path):

    print(path, file=sys.stderr)

     # Load RGB image 
    img = Image.open(path).convert("RGB")

    # Resize image to specified image dimensions
    img = img.resize((224,224),Image.ANTIALIAS)

    # Rescale the image
    img = np.array(img)/255

    # Convert tensor to 4D
    img = np.expand_dims(img, 0)

    return img