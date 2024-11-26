# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
for dirname, _, filenames in os.walk(''):
    for filename in filenames:
        print(os.path.join(dirname, filename))

print("ok")

# You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All" 
# You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session

train = pd.read_csv('train.csv')
train.head()
test = pd.read_csv("test.csv")
test.head()

train.isnull().sum()
test.isnull().sum()

train['Bed Grade'] = train['Bed Grade'].fillna(train['Bed Grade'].mode()[0])
train['City_Code_Patient'] = train['City_Code_Patient'].fillna(train['City_Code_Patient'].mode()[0])

test['Bed Grade'] = test['Bed Grade'].fillna(test['Bed Grade'].mode()[0])
test['City_Code_Patient'] = test['City_Code_Patient'].fillna(test['City_Code_Patient'].mode()[0])

from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()

train['Stay'] = le.fit_transform(train['Stay'].astype('str'))
test['Stay'] = -1
df = pd.concat([train, test], ignore_index=True)

# List of categorical column names
categorical_columns = ['Hospital_type_code', 'Hospital_region_code', 'Department', 
                       'Ward_Type', 'Ward_Facility_Code', 'Type of Admission', 
                       'Severity of Illness', 'Age']

# Iterating through each categorical column and apply label encoding
for col in categorical_columns:
    df[col] = le.fit_transform(df[col].astype(str))

# Creating a new DataFrame 'train' by filtering rows where 'Stay' is not equal to -1
train = df[df['Stay'] != -1]

# Creating a new DataFrame 'test' by filtering rows where 'Stay' is equal to -1
test = df[df['Stay'] == -1]

columns_to_remove = ['Stay', 'patientid', 'Hospital_region_code', 'Ward_Facility_Code']

# Creating a new DataFrame 'test1' by removing specified columns from 'test'
test1 = test.drop(columns=columns_to_remove, axis=1)

columns_to_remove_train = ['case_id', 'patientid', 'Hospital_region_code', 'Ward_Facility_Code']

# Creating a new DataFrame 'train1' by removing specified columns from 'train'
train1 = train.drop(columns=columns_to_remove_train, axis=1)

from sklearn.model_selection import train_test_split

X1 = train1.drop(columns=['Stay'], axis=1)

y1 = train1['Stay']

X_train, X_test, y_train, y_test = train_test_split(X1, y1, test_size=0.2, random_state=100)

print("Shape of X_train:", X_train.shape)
print("Shape of X_test:", X_test.shape)
print("Shape of y_train:", y_train.shape)
print("Shape of y_test:", y_test.shape)

#model

import xgboost as xgb
from sklearn.metrics import accuracy_score

# Creating an XGBoost classifier
classifier_xgb = xgb.XGBClassifier(
    max_depth=4,
    learning_rate=0.1,
    n_estimators=1000,
    objective='multi:softmax',
    reg_alpha=0.5,
    reg_lambda=1.5,
    booster='gbtree',
    n_jobs=4,
    min_child_weight=2,
    base_score=0.75
)


model_xgb = classifier_xgb.fit(X_train, y_train)


prediction_xgb = model_xgb.predict(X_test)

# Calculate\ing accuracy of the XGBoost model's predictions
acc_score_xgb = accuracy_score(y_test, prediction_xgb)

# Rounding the accuracy score to two decimal places
acc_score_xgb = round(acc_score_xgb, 2)

print("Accuracy Score of XGBoost Model:", acc_score_xgb)


pred_xgb = classifier_xgb.predict(test1.drop(columns=['case_id']))

# Creating a new DataFrame 'result_xgb' to organize prediction results
result_xgb = pd.DataFrame()

# Adding the 'case_id' column to 'result_xgb'
result_xgb['case_id'] = test1['case_id']

result_xgb['Stay'] = pred_xgb

# Reordering columns in 'result_xgb'
result_xgb = result_xgb[['case_id', 'Stay']]

# # Replacing numeric labels in 'Stay' column with meaningful categories
label_mapping = {0: 'CategoryA', 1: 'CategoryB', 2: 'CategoryC', 3: 'CategoryD', 4: 'CategoryE', 5: 'CategoryF', 6: 'CategoryG', 7: 'CategoryH', 8: 'CategoryI', 9: 'CategoryJ', 10: 'CategoryK', 11: 'CategoryL', 12: 'CategoryM', 13: 'CategoryN', 14: 'CategoryO'}
result_xgb['Stay'] = result_xgb['Stay'].replace(label_mapping)

print(result_xgb)

# Grouping the data by unique 'Stay' values and count the unique 'case_id' values
result_xgb.groupby('Stay')['case_id'].nunique()




