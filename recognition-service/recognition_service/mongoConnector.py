import pymongo
from pymongo import MongoClient

class MongoConnector:

  def __init__(self, host, port):
    self.host = host
    self.port = port
    self.db_client = MongoClient(host=self.host, port=self.port)


  def connect(self, db_name):
    return self.db_client[db_name]