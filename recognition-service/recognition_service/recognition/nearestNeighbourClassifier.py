from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import f1_score, accuracy_score
from sklearn.manifold import TSNE

class NearestNeighbourClassifier:

  def __init__(self):
    self.knn = KNeighborsClassifier(n_neighbors=4, metric='euclidean')

  def fitData(self, data, labels):
    data_2d = data.reshape(len(data), 5 * 5 * 2048)
    self.knn.fit(data_2d, labels)
    print(self.knn.classes_)