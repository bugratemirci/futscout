# Kütüphaneler
import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.preprocessing import MinMaxScaler

# Clustering uygulanması ve kalecilerin veri seti dışında bırakılması

df = pd.read_csv('total_statistics_by_player.csv').drop(['Unnamed: 0'], axis = 1)

df_nongk = df['position'] != 'GK'
df_nongk2 = df['position'] != 'GK S'

df_last = df[df_nongk]
df_last2 = df_last[df_nongk2]



df_last_val = df_last2.drop(['id', 'player_name', 'position'], axis=1)

classes = AgglomerativeClustering(n_clusters=8).fit_predict(df_last_val)
df_last2['Classes'] = classes.reshape(-1,1)
df_last2.to_csv('clustered_data.csv')