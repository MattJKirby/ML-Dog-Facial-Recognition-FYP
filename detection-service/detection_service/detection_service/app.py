import sys
from io import BufferedReader
from detection_service.model.detectionModel import DetectionModel
from detection_service.imageProcessing.imageProcessor import ImageProcessor
from PIL import Image
import io
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
import json

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})


detectionModel = DetectionModel('./model/Tsinghua_train3_best.pt')
imageProcessor = ImageProcessor(minOutputResolution=00)


@app.route('/status')
def statusCheck():
  return  {'message': 'Detection service is running', 'statusCode': 200}

@app.route('/predict', methods=['POST'])
def predict():

  results = []

  for file in request.files:
    file = request.files[file]
    image = file.read()
    bbox_parameters, prediction = detectionModel.predict(image)
  
    try:
      if prediction['confidence'] < 0.30:
        raise Exception(f"Detection in image, {file.filename}, does not match the required confidence threshold.")

      detection = imageProcessor.encode_pil_image(imageProcessor.isolateDetection(image, bbox_parameters))
      results.append({'name': file.filename,'confidence': prediction['confidence'], "bbox": bbox_parameters})
    
    except Exception as e:
      results.append({'name': file.filename, 'error': str(e),'confidence': prediction['confidence'] })

  return{"statusCode": 200, 'results': results}