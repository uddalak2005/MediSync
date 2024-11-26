# train_model.py

import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import xgboost as xgb
from sklearn.metrics import accuracy_score

train = pd.read_csv('train.csv')
train['Bed Grade'] = train['Bed Grade'].fillna(train['Bed Grade'].mode()[0])
train['City_Code_Patient'] = train['City_Code_Patient'].fillna(train['City_Code_Patient'].mode()[0])

# Encode the target variable 'Stay'
le = LabelEncoder()
train['Stay'] = le.fit_transform(train['Stay'].astype('str'))
categorical_columns = ['Hospital_type_code', 'Hospital_region_code', 'Department', 
                       'Ward_Type', 'Ward_Facility_Code', 'Type of Admission', 
                       'Severity of Illness', 'Age']

for col in categorical_columns:
    train[col] = le.fit_transform(train[col].astype(str))
columns_to_remove_train = ['case_id', 'patientid', 'Hospital_region_code', 'Ward_Facility_Code']
train1 = train.drop(columns=columns_to_remove_train, axis=1)

train1.to_csv('processed_train.csv', index=False)

X1 = train1.drop(columns=['Stay'], axis=1)
y1 = train1['Stay']

X_train, X_test, y_train, y_test = train_test_split(X1, y1, test_size=0.2, random_state=100)

classifier_xgb = xgb.XGBClassifier(
    max_depth=4,
    learning_rate=0.1,
    n_estimators=5000,
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
acc_score_xgb = round(accuracy_score(y_test, prediction_xgb), 2)

print("Accuracy Score of XGBoost Model:", acc_score_xgb)

# Save the trained model for later use
import joblib
joblib.dump(model_xgb, 'xgb_model.pkl')
