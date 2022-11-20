import torch
from PIL import Image
import io

class DetectionModel():

  def __init__(self, modelPath):
    self.model = torch.hub.load("WongKinYiu/yolov7", 'custom',modelPath)
    self.model.eval()


  def predict(self, img):
    img = Image.open(io.BytesIO(img))  # batched list of images
    print(img)
    results = self.model(img) 
    print(True, results.pandas().xyxy[0]) 

    return results