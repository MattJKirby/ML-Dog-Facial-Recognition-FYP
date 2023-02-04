import sys
from io import BufferedReader
from detection_service.model.detectionModel import DetectionModel
from detection_service.imageProcessing.imageProcessor import ImageProcessor
from PIL import Image
import io
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch

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
  file = request.files['image']
  image = file.read()
  bbox_parameters, prediction = detectionModel.predict(image)
  
  try:
    if prediction['confidence'] < 0.80:
      raise Exception("Detection does not match the required confidence threshold.")

    detection = imageProcessor.encode_pil_image(imageProcessor.isolateDetection(image, bbox_parameters))
    return {"confidence": prediction['confidence'], "boundingBoxCoordinates": bbox_parameters}
  
  except Exception as e:
    return {'error': 'Error detecting dog face: ' + e}