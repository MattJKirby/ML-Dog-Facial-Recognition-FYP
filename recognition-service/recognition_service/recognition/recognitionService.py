import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import applications
from tensorflow.keras.applications.inception_v3 import InceptionV3

from keras.models import Model, Sequential
from keras.layers import Dense, Dropout,Input

class RecognitionService:
  def __init__(self, weights_path):
    self.model = self.init_model(224,224,3)
    self.model.load_weights(weights_path)

  def init_model(self, img_width, img_height, channels):
    input = tf.keras.Input((img_width, img_height, channels))
    base_model = self.embedding_model(img_width, img_height, channels)
    model = base_model(input)
    return tf.keras.Model(inputs=input, outputs=model)


  def embedding_model(self, img_width, img_height, channels):
    InceptionV3 = applications.InceptionV3(include_top= False, input_shape= (img_width, img_height, channels), weights= 'imagenet')
    model = Sequential()

    for layer in InceptionV3.layers:
        layer.trainable= False
    #     print(layer,layer.trainable)
      
    model.add(InceptionV3)
    model.add(Dropout(0.7))
    model.add(Dense(2048, activation='sigmoid'))
    return model

  def generate_image_embeddings(self, image_array):
    print(tf.version.VERSION)
    return self.model.predict(image_array)
