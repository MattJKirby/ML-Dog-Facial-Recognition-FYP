import base64
import sys
from urllib import response
from PIL import Image
from recognition_service.recognition.recognitionService import RecognitionService
from recognition_service.profileManager import ProfileManager
import numpy as np
from recognition_service.imageProcessor import ImageProcessor
from recognition_service.mongoConnector import MongoConnector
from recognition_service.datastores.profileDatastore import ProfileDatastore


from flask import Flask, request, jsonify


app = Flask(__name__)
db_connector = MongoConnector('localhost',27017)
profileManager = ProfileManager(db_connector)
recog = RecognitionService('./model/dog_face_model_00888_val_loss_weights.hdf5')



@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    db = db_connector.connect('db')
    db['test_collection'].insert_one({'test': 1234})
    return 'Hello, World!'

@app.route('/image', methods=['POST'])
def newProfile():
  formData = request.form

  print("Testing")
  
  try:
    profileManager.newProfile(formData.get('name'), formData.get('user'), request.files.getlist("image"))
  except Exception as e:
    return jsonify(str(e))
  
  

  image_processor = ImageProcessor()
  processed_images = image_processor.pre_process_images(request.files.getlist("image"))

  embeddings = recog.generate_image_embeddings(processed_images)

  print(embeddings.shape, file=sys.stderr)

  
  return 'This is a test route!'

