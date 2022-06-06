import keras
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.utils import to_categorical
import numpy as np
from keras import callbacks
import pandas as pd
from sklearn.model_selection import KFold
import random
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import MinMaxScaler

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


  model.compile(optimizer='adam', loss='categorical_crossentropy',
                metrics=['accuracy'])
  
  return model

df = pd.read_csv('fut_scout_data_operations/ood_classification/data/goalkeeper.csv').drop(['Unnamed: 0','Name', 'Position'], axis=1)
df_full = pd.read_csv('fut_scout_data_operations/ood_classification/data/goalkeeper.csv').drop(['Unnamed: 0'], axis=1)
X = df.drop(['Classes'], axis = 1).values
y = df['Classes']
sc = StandardScaler()
X = sc.fit_transform(X)


def kFold_ANN():

    k = 5
    iter = 1
    cm_array = []
    cv = KFold(n_splits=k, shuffle=True)


    for train_index, test_index in cv.split(X):
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]

        y_train = to_categorical(y_train)
        y_test = to_categorical(y_test)
        n_cols = len(np.unique(y))
        
        model = createModel(n_cols)

        early_stopping = callbacks.EarlyStopping(
                min_delta=0.00001,
                patience=6,
                restore_best_weights=True,
            )

        history = model.fit(X_train, y_train, batch_size=32, epochs=150, callbacks=[early_stopping], validation_split=0.2)

        plt.clf()
        plt.title('Loss')
        plt.plot(history.history['loss'], label='train')
        plt.plot(history.history['val_loss'], label='test')
        plt.legend()
        plt.savefig('fut_scout_data_operations/ood_classification/figures/' + str(iter) +'_midfielder_loss.png')

        plt.clf()
        plt.title('Accuracy')
        plt.plot(history.history['accuracy'], label='train')
        plt.plot(history.history['val_accuracy'], label='test')
        plt.legend()
        plt.savefig('fut_scout_data_operations/ood_classification/figures/' + str(iter) + '_midfielder_acc.png') 
        iter += 1

        tahmin = np.argmax(model.predict(X_test),axis=1)    
        y_test = np.argmax(y_test,axis=1)
        matrix = confusion_matrix(y_test, tahmin)
        cm_array.append(matrix)        
        FP = matrix.sum(axis=0) - np.diag(matrix)
        FN = matrix.sum(axis=1) - np.diag(matrix)
        TP = np.diag(matrix)
        TN = matrix.sum() - (FP + FN + TP)

    plt.clf()    
    om_vgg = np.array(cm_array).sum(axis=0)  
    plt.figure(figsize=(10,8))
    sns.heatmap(om_vgg, annot=True)
    plt.savefig('fut_scout_data_operations/ood_classification/figures/ANN midfielder overlapped matrix.png')

def kFold_KNN():

    k = 5    
    cm_array = []
    cv = KFold(n_splits=k, shuffle=True)
    knn = KNeighborsClassifier()

    for train_index, test_index in cv.split(X):
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]

        y_train = to_categorical(y_train)
        y_test = to_categorical(y_test)      
        
        knn.fit(X_train, y_train) 

        tahmin = np.argmax(knn.predict(X_test),axis=1)    
        y_test = np.argmax(y_test,axis=1)
        matrix = confusion_matrix(y_test, tahmin)
        cm_array.append(matrix)        
        FP = matrix.sum(axis=0) - np.diag(matrix)
        FN = matrix.sum(axis=1) - np.diag(matrix)
        TP = np.diag(matrix)
        TN = matrix.sum() - (FP + FN + TP)

    plt.clf()    
    om_vgg = np.array(cm_array).sum(axis=0)  
    plt.figure(figsize=(10,8))
    sns.heatmap(om_vgg, annot=True)
    plt.savefig('fut_scout_data_operations/ood_classification/figures/KNN goalkeeper overlapped matrix.png')

def kFold_DT():
    k = 5    
    cm_array = []
    cv = KFold(n_splits=k, shuffle=True)
    dt = DecisionTreeClassifier()

    for train_index, test_index in cv.split(X):
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]

        y_train = to_categorical(y_train)
        y_test = to_categorical(y_test)      
        
        dt.fit(X_train, y_train) 

        tahmin = np.argmax(dt.predict(X_test),axis=1)    
        y_test = np.argmax(y_test,axis=1)
        matrix = confusion_matrix(y_test, tahmin)
        cm_array.append(matrix)        
        FP = matrix.sum(axis=0) - np.diag(matrix)
        FN = matrix.sum(axis=1) - np.diag(matrix)
        TP = np.diag(matrix)
        TN = matrix.sum() - (FP + FN + TP)

    plt.clf()    
    om_vgg = np.array(cm_array).sum(axis=0)  
    plt.figure(figsize=(10,8))
    sns.heatmap(om_vgg, annot=True)
    plt.savefig('fut_scout_data_operations/ood_classification/figures/Decision Tree goalkeeper overlapped matrix.png')
