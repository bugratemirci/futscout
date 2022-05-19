# Grafik ve veriyle alakalı kütüphaneler
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Sklearn kütüphaneleri
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics

# Keras ve Tensorflow kütüphaneleri
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam
from keras import callbacks
import tensorflow as tf
import keras

def createModel(n_cols):

    model = keras.Sequential([

        keras.layers.Dense(units=128, activation='relu'),
        keras.layers.Dense(units=128, activation='relu'),
        keras.layers.Dense(units=64, activation='relu'),
        keras.layers.Dropout(0.25),
        keras.layers.Dense(units=32, activation='relu'),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(units=8, activation='relu'),
        keras.layers.Dense(units=n_cols, activation='softmax'),
    ]
    )

    optim = Adam(lr=0.001)
    model.compile(optimizer=optim, loss='categorical_crossentropy',
                  metrics=['accuracy'])

    return model

def decision_tree(X_train, y_train, X_test, y_test):
        dt = DecisionTreeClassifier()
        dt.fit(X_train, y_train)

        y_pred = dt.predict(X_test)
        cnf_matrix = metrics.confusion_matrix(
                y_test.argmax(axis=1), y_pred.argmax(axis=1))
        p = sns.heatmap(pd.DataFrame(cnf_matrix),
                        annot=True, cmap="YlGnBu", fmt='g')
        plt.title('Confusion matrix', y=1.1)
        plt.ylabel('Actual label')
        plt.xlabel('Predicted label')

        plt.savefig('figures/decision_tree/cm_decision_tree.png')

def knn(X_train, y_train, X_test, y_test):
        dt = KNeighborsClassifier()
        dt.fit(X_train, y_train)

        y_pred = dt.predict(X_test)
        cnf_matrix = metrics.confusion_matrix(
                y_test.argmax(axis=1), y_pred.argmax(axis=1))
        p = sns.heatmap(pd.DataFrame(cnf_matrix),
                        annot=True, cmap="YlGnBu", fmt='g')
        plt.title('Confusion matrix', y=1.1)
        plt.ylabel('Actual label')
        plt.xlabel('Predicted label')

        plt.savefig('figures/decision_tree/cm_knn.png')

def ann_model(X_train, y_train, X_test, y_test):
        early_stopping = callbacks.EarlyStopping(
        min_delta=0.00001,
        patience=12,
        restore_best_weights=True)
        model = createModel(n_cols=n_cols)

        history = model.fit(X_train, y_train, batch_size=128, epochs=1000, callbacks=[
                        early_stopping], validation_split=0.2)
        model.save('model/model.h5')
        plt.subplot(211)
        plt.title('Loss')
        plt.plot(history.history['loss'], label='train')
        plt.plot(history.history['val_loss'], label='test')
        plt.legend()
        
        plt.subplot(212)
        plt.title('Accuracy')
        plt.plot(history.history['accuracy'], label='train')
        plt.plot(history.history['val_accuracy'], label='test')
        plt.legend()
        plt.savefig('figures/ann/acc_loss.png')
        plt.clf()
        y_pred = model.predict(X_test)
        cnf_matrix = metrics.confusion_matrix(
                y_test.argmax(axis=1), y_pred.argmax(axis=1))
        sns.heatmap(pd.DataFrame(cnf_matrix),
                        annot=True, cmap="YlGnBu", fmt='g')
        plt.title('Confusion matrix', y=1.1)
        plt.ylabel('Actual label')
        plt.xlabel('Predicted label')

        plt.savefig('figures/ann/cm_ann.png')



df = pd.read_csv('clustered_data.csv').drop(['id', 'player_name', 'position'], axis=1)
X = df.drop(['Classes'], axis = 1).values
y = df['Classes']
n_cols = len(np.unique(y))

sc = StandardScaler()
X = sc.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.36, random_state=14)

y_train = to_categorical(y_train)
y_test = to_categorical(y_test)


knn(X_train, y_train, X_test, y_test)
decision_tree(X_train, y_train, X_test, y_test)
ann_model(X_train, y_train, X_test, y_test)
