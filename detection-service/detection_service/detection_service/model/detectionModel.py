import torch
from PIL import Image, ImageDraw
import io
import matplotlib.pyplot as plt

class DetectionModel():

  def __init__(self, modelPath):
    self.model = torch.hub.load("WongKinYiu/yolov7", 'custom',modelPath)
    self.model.eval()


  def predict(self, img):
    img = Image.open(io.BytesIO(img))
    width, height = img.size
    result = self.model(img,width,height)
    dataFrame = result.pandas().xyxy[0]

    row = dataFrame.iloc[dataFrame['confidence'].idxmax()].to_dict()

    bbox_parameters = (row['xmin'], row['ymin'], row['xmax'], row['ymax'])

    self.predictImg(img,bbox_parameters)
    return row


  def predictImg(self,img, bbox_parameters):
    img1 = ImageDraw.Draw(img)  
    img1.rectangle(bbox_parameters, outline ="red")
    plt.imshow(img)
    plt.savefig('plot.png', bbox_inches='tight')