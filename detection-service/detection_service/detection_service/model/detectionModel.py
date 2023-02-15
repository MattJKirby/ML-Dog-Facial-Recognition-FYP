import torch
from PIL import Image, ImageDraw
import io
import matplotlib.pyplot as plt

class DetectionModel():

  def __init__(self, modelPath):
    self.model = torch.hub.load("WongKinYiu/yolov7", 'custom',modelPath)
    self.model.eval()


  def predict(self, img):
    img = Image.open(io.BytesIO(img)).convert('RGB') 

    print(img.mode)
    if img.mode in ("RGBA", "P"): 
      img = img.convert("RGB")

    
    width, height = img.size
    img.resize((640,640))
    result = self.model(img,640,640)
    dataFrame = result.pandas().xyxy[0]

    row = dataFrame.iloc[dataFrame['confidence'].idxmax()].to_dict()

    bbox_parameters = (row['xmin'], row['ymin'], row['xmax'], row['ymax'])

    self.drawPrediction(img,bbox_parameters)
    return (bbox_parameters, row)


  def drawPrediction(self,img, bbox_parameters):
    img = img.convert("RGBA")
    boundingLayer = Image.new('RGBA', img.size, (255, 255, 255, 0))

    img1 = ImageDraw.Draw(boundingLayer)
    img1.rectangle(bbox_parameters, outline ="red", width=3, fill=(255, 0, 0, 0))

    output = Image.alpha_composite(img, boundingLayer)
    plt.imshow(output)
    plt.savefig('plot.png', bbox_inches='tight')