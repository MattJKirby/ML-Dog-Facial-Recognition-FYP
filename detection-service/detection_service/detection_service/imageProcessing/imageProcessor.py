from PIL import Image, ImageOps
import io
from base64 import encodebytes

class ImageProcessor():

  def __init__(self, minOutputResolution):
    self.minimumOutputResolution = minOutputResolution

  def isolateDetection(self, img, bbox_parameters):
    img = Image.open(io.BytesIO(img))
    croppedImg = ImageOps.crop(img, bbox_parameters)
    width, height = croppedImg.size

    if(width < self.minimumOutputResolution or height < self.minimumOutputResolution):
      print(width, height)
      raise Exception('Could not detect face. Please upload a new image.')

    return croppedImg

  def encode_pil_image(self, img):
    img_io = io.BytesIO()
    img.save(img_io, 'JPEG', quality=100)
    return encodebytes(img_io.getvalue()).decode('ascii')
