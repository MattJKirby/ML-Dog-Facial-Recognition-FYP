import sys
from io import BufferedReader
from detection_service.model.detectionModel import DetectionModel
from PIL import Image
import io
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)


detectionModel = DetectionModel('./model/Tsinghua_train3_best.pt')


@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    return 'Detection service is running'

@app.route('/predict', methods=['POST'])
def predict():
  file = request.files['image']
  image = file.read()
  print(detectionModel.predict(image))
  return ""