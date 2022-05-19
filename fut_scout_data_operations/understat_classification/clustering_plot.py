import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from scipy.cluster.hierarchy import dendrogram
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import AgglomerativeClustering, KMeans
from sklearn.decomposition import PCA

df = pd.read_csv(r'data\total_statistics_by_player.csv').drop(['Unnamed: 0'], axis = 1)

df_nongk = df['position'] != 'GK'
df_nongk2 = df['position'] != 'GK S'

df_last = df[df_nongk]
df_last2 = df_last[df_nongk2]


df_last_val = df_last2.drop(['id', 'player_name', 'position'], axis=1)

pca = PCA(2)
model = KMeans(n_clusters= 10)

df_last_val = pca.fit_transform(df_last_val)
classes = model.fit_predict(df_last_val)
df_last2['classes'] = classes.reshape(-1,1)
u_labels = np.unique(classes)
centroids = model.cluster_centers_

for i in u_labels:
    plt.scatter(df_last_val[classes == i , 0] , df_last_val[classes == i , 1] , label = i)
plt.scatter(centroids[:,0] , centroids[:,1] , s = 80, color = 'k')

plt.legend()
plt.show()