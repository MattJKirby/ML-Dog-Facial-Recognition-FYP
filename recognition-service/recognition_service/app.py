import base64
import json
import sys
from urllib import response
from PIL import Image
from recognition_service.recognition.recognitionService import RecognitionService
from recognition_service.profileManager import ProfileManager
import numpy as np
from recognition_service.imageProcessor import ImageProcessor
from recognition_service.mongoConnector import MongoConnector
from recognition_service.datastores.profileDatastore import ProfileDatastore
from recognition_service.recognition.nearestNeighbourClassifier import NearestNeighbourClassifier
from flask import Flask, request, jsonify

from flask_cors import CORS

app = Flask(__name__)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})


db_connector = MongoConnector('localhost',27017)
profileManager = ProfileManager(db_connector)
recog = RecognitionService('./model/dog_face_model_00888_val_loss_weights.hdf5')
knn = NearestNeighbourClassifier()
profileData = profileManager.loadProfiles()
image_processor = ImageProcessor()

knn.fitData(recog.generate_image_embeddings(profileData[1]), profileData[0])



@app.route('/status')
def statusCheck():
  return  {'message': 'Recognition service is running', 'statusCode': 200}

@app.route('/loadProfile', methods=['POST'])
def newProfile():
  profileUid = request.form.get('ProfileUid')
  profileData = profileManager.loadProfiles()
  knn.fitData(recog.generate_image_embeddings(profileData[1]), profileData[0])

  return 'This is a test route!'

@app.route('/predict', methods=['POST'])
def predict():
  print(request.files['target'])

  try:
    file = request.files['target']
    
    imgs = image_processor.pre_process_images([file])
    embeddings = recog.generate_image_embeddings(imgs)

    result = knn.predict(embeddings,3)[0]
    profileJsonData = profileManager.getProfilesByIndexArray(result)
    return profileJsonData
  except Exception as e:
    print(e)
    return {"error": e, "statusCoode": 400}
