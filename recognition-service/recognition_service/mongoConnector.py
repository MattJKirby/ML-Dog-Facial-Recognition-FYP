import pymongo
from pymongo import MongoClient

class MongoConnector:

  def __init__(self, host, port):
    self.host = host
    self.port = port
    self.db_client = MongoClient('mongodb://mongodb:27017/')


  def connect(self, db_name):
    return self.db_client[db_name]