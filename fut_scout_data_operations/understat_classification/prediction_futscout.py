import json
import sys
import pandas as pd
import numpy as np
import keras
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

vals = [float(sys.argv[i+1]) for i in range(14)]
vals = [vals]

ann = keras.models.load_model(
    '../fut_scout_data_operations/understat_classification/model/model_sc_pca_batch_size_128.h5')

df = pd.read_csv('../fut_scout_data_operations/understat_classification/data/clustered_data.csv').drop(
    ['id', 'player_name', 'position', 'Unnamed: 0'], axis=1)

X = df.drop(['classes'], axis=1).values

X_new = np.append(X, vals, axis=0)

sc = StandardScaler()
X_new = sc.fit_transform(X_new)

pca = PCA(2)
X_new = pca.fit_transform(X_new)

y_pred = ann.predict(X_new)
y_pred = np.argmax(y_pred[-1])


js = {
    "vals": str(y_pred)
}

ret = json.dumps(js)
print(ret)
