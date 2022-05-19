# Kütüphaneler
import glob
import pandas as pd
import numpy as np

# Verilerin oyuncu isimlerine göre sıralanıp birleştirilmesi ve aynı zamanda her oyuncu için ayrı ayrı
# csv dosyalarının kaydedilmesi

def test():
    epl_path = r'data\epl\\'
    epl_csvs = glob.glob(epl_path + '*.csv')
    epl_csvs = [x.replace('\\', '/') for x in epl_csvs]
    df = pd.DataFrame()

    for i in epl_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    bundesliga_path = r'data\bundesliga\\'
    bundesliga_csvs = glob.glob(bundesliga_path + '*.csv')
    bundesliga_csvs = [x.replace('\\', '/') for x in bundesliga_csvs]

    for i in bundesliga_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    la_liga_path = r'data\la_liga\\'
    la_liga_csvs = glob.glob(la_liga_path + '*.csv')
    la_liga_csvs = [x.replace('\\', '/') for x in la_liga_csvs]

    for i in la_liga_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    ligue_1_path = r'data\ligue_1\\'
    ligue_1_csvs = glob.glob(ligue_1_path + '*.csv')
    ligue_1_csvs = [x.replace('\\', '/') for x in ligue_1_csvs]

    for i in ligue_1_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    rfpl_path = r'data\rfpl\\'
    rfpl_csvs = glob.glob(rfpl_path + '*.csv')
    rfpl_csvs = [x.replace('\\', '/') for x in rfpl_csvs]

    for i in rfpl_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    serie_a_path = r'data\serie_a\\'
    serie_a_csvs = glob.glob(serie_a_path + '*.csv')
    serie_a_csvs = [x.replace('\\', '/') for x in serie_a_csvs]

    for i in serie_a_csvs:
        df = df.append(pd.read_csv(i), ignore_index=True)

    cols = ['id', 'player_name', 'team_title', 'position', 'games', 'time', 'goals', 'xG', 'assists',
            'xA', 'shots', 'key_passes', 'yellow_cards', 'red_cards', 'npg', 'npxG', 'xGChain', 'xGBuildup']
    df_sorted = df[cols]
    df_sorted = df_sorted.sort_values(by=['player_name'], ascending=True)
    df_sorted.to_csv('full_data.csv')


def main():

    df = pd.read_csv('full_data.csv').drop(['Unnamed: 0'], axis=1)
    players = df['player_name'].values
    unique_player_names = np.unique(players)

    for i in unique_player_names:
        player_stats = df['player_name'] == i
        player_stats = df[player_stats]
        player_stats.to_csv(i.replace(' ', '_') + '.csv')


if __name__ == "__main__":

    main()
