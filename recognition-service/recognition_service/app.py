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
profileManager.loadProfiles()


@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    db = db_connector.connect('db')
    db['test_collection'].insert_one({'test': 1234})
    return 'Hello, World!'

@app.route('/loadProfile', methods=['POST'])
def newProfile():
  profileUid = request.form.get('ProfileUid')
  profileManager.newProfile(profileUid)

  return 'This is a test route!'

