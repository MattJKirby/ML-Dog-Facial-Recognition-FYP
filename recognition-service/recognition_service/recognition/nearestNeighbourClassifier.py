import array
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import f1_score, accuracy_score
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import numpy as np

class NearestNeighbourClassifier:

  def __init__(self):
    self.knn = KNeighborsClassifier(n_neighbors=4, metric='euclidean')

  def fitData(self, data, labels):
    print(data.shape)
    data_2d = data.reshape(len(data),-1)

    print(data_2d.shape, len(labels))

    embedded = TSNE(n_components=2, perplexity=(len(labels) * 0.1), random_state=50).fit_transform(data_2d)
    # embedded = PCA(n_components=2).fit_transform(data_2d)

    print(embedded.shape, len(labels))
    colorMap = {}

    for label in set(labels):
      colorMap[label] = np.random.rand(3,)


    for i in range(len(data_2d)):
      print(embedded[:, 0][i], embedded[:, 1][i], labels[i])
      plt.scatter(embedded[:, 0][i], embedded[:, 1][i], c=colorMap[labels[i]], label=labels[i] if i == 0 else "")
 
    markers = [plt.Line2D([0,0],[0,0],color=colorMap[label], marker='o', linestyle='') for label in set(labels)]
    plt.legend(markers, set(labels), loc='center left', bbox_to_anchor=(1, 0.5))

    plt.savefig('plot.png', bbox_inches='tight')

    self.knn.fit(data_2d, labels)
    print(self.knn.n_samples_fit_)

  def predict(self, img, no):
    data_2d = img.reshape(1,-1)

    probas = self.knn.predict_proba(data_2d)

    result = probas.argsort()[-no:][::-1]

    return result