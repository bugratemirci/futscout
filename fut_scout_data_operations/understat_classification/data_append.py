# Kütüphaneler
import pandas as pd
import numpy as np

# Sezonluk istatistiklerin toplanıp oyuncuların 1 sezonluk verilerinin alınıp kaydedilmesi

names = np.load('data/unique_names.npy', allow_pickle=True)
df = pd.DataFrame()
csv_path = r'data/player_csv/'
arr_sum = []
df_sum = pd.DataFrame()
np_sum = []
j = 0
for i in names:
    print(i)
    df = pd.read_csv(csv_path + i.replace(' ', '_') + '.csv').drop(
        ['Unnamed: 0', 'id', 'player_name', 'team_title', 'position'], axis=1)
    df_2 = pd.read_csv(csv_path + i.replace(' ', '_') + '.csv').drop(
        ['Unnamed: 0','team_title'], axis=1)
    name = i
    id = df_2['id'][0]

    position = df_2['position'][0]
    np_sum.append([id, name, position, (df['games'].sum() / len(df_2['id'])), (df['time'].sum() / len(df_2['id'])), (df['goals'].sum()/ len(df_2['id'])), (df['xG'].sum()/ len(df_2['id'])), 
    (df['assists'].sum()/ len(df_2['id'])), (df['xA'].sum()/ len(df_2['id'])), 
    (df['shots'].sum()/len(df_2['id'])), (df['key_passes'].sum()/ len(df_2['id'])), (df['yellow_cards'].sum()/len(df_2['id'])), (df['red_cards'].sum()/ len(df_2['id'])), 
    (df['npg'].sum()/ len(df_2['id'])), (df['npxG'].sum()/ len(df_2['id'])),
    (df['xGChain'].sum()/len(df_2['id'])), (df['xGBuildup'].sum()/len(df_2['id']))])
    

np_sum = np.array(np_sum)
df_sum = pd.DataFrame(np_sum, columns=['id', 'player_name', 'position','games', 'time', 'goals', 'xG', 'assists',
    'xA', 'shots', 'key_passes', 'yellow_cards', 'red_cards', 'npg', 'npxG', 'xGChain', 'xGBuildup'])
df_sum.to_csv('total_statistics_by_player.csv')
