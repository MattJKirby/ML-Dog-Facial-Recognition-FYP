import base64
import sys
from PIL import Image
import numpy as np
from recognition_service.imageProcessor import ImageProcessor


from flask import Flask, request


app = Flask(__name__)



@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    return 'Hello, World!'

@app.route('/image', methods=['POST'])
def image():
  if 'image' not in request.files:
    return 'No files received!'

  file = request.files['image']
  image_processor = ImageProcessor()
  processed_image = image_processor.pre_process_image(file)

  print(processed_image, file=sys.stderr)

  
  return 'This is a test route!'