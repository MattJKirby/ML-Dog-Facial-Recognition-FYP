import torch

class DetectionModel():

  def __init__(self, modelPath):
    self.model = torch.hub.load("WongKinYiu/yolov7", 'custom',modelPath)
    self.model.eval()