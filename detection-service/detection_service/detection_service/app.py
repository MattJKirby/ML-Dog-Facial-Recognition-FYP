import sys
from detection_service.model.detectionModel import DetectionModel
from flask import Flask, request, jsonify

app = Flask(__name__)

detectionModel = DetectionModel('./model/Tsinghua_train3_best.pt')

def get_prediction(img_bytes):
    img = Image.open(io.BytesIO(img_bytes))
    imgs = [img]  # batched list of images
# Inference
    results = model(imgs, size=640)  # includes NMS
    return results

@app.route('/')
def hello():
    print("Hello", file=sys.stderr)
    return 'Detection service is running'

@app.route('/predict', methods=['POST'])
def predict():
