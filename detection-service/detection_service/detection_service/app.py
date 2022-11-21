import sys
from io import BufferedReader
from detection_service.model.detectionModel import DetectionModel
from detection_service.imageProcessing.imageProcessor import ImageProcessor
from PIL import Image
import io
from flask import Flask, request, jsonify, send_file
import torch

app = Flask(__name__)


detectionModel = DetectionModel('./model/Tsinghua_train3_best.pt')
imageProcessor = ImageProcessor(minOutputResolution=00)


@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    return 'Detection service is running'

@app.route('/predict', methods=['POST'])
def predict():
  file = request.files['image']
  image = file.read()
  bbox_parameters, prediction = detectionModel.predict(image)

  
  try:
    if prediction['confidence'] < 0.85:
      raise Exception("Detection does not match confidence constraints.")

    return {
      "confidence": prediction['confidence'],
      "detection": imageProcessor.encode_pil_image(imageProcessor.isolateDetection(image, bbox_parameters))
     }
  except Exception as e:
    print(e)
    return {'error': 'Error detecting dog face. Please upload a different image.'}