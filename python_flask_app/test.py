import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

test = pd.read_csv("test.csv")

model_xgb = joblib.load('xgb_model.pkl')

test['Bed Grade'] = test['Bed Grade'].fillna(test['Bed Grade'].mode()[0])
test['City_Code_Patient'] = test['City_Code_Patient'].fillna(test['City_Code_Patient'].mode()[0])

categorical_columns = ['Hospital_type_code', 'Hospital_region_code', 'Department', 
                       'Ward_Type', 'Ward_Facility_Code', 'Type of Admission', 
                       'Severity of Illness', 'Age']
le = LabelEncoder()
for col in categorical_columns:
    test[col] = le.fit_transform(test[col].astype(str))

columns_to_remove = ['patientid', 'Hospital_region_code', 'Ward_Facility_Code']
test1 = test.drop(columns=[col for col in columns_to_remove if col in test.columns], axis=1)
pred_xgb = model_xgb.predict(test1.drop(columns=['case_id']))

# Organize the prediction results
result_xgb = pd.DataFrame()
result_xgb['case_id'] = test1['case_id']
result_xgb['Stay'] = pred_xgb
label_mapping = {0: 'CategoryA', 1: 'CategoryB', 2: 'CategoryC', 3: 'CategoryD', 4: 'CategoryE', 5: 'CategoryF', 6: 'CategoryG', 7: 'CategoryH', 8: 'CategoryI', 9: 'CategoryJ', 10: 'CategoryK', 11: 'CategoryL', 12: 'CategoryM', 13: 'CategoryN', 14: 'CategoryO'}
result_xgb['Stay'] = result_xgb['Stay'].replace(label_mapping)

print(result_xgb)
result_xgb.groupby('Stay')['case_id'].nunique()

# Save the results to a CSV file
print("***")
result_xgb.to_csv('test_predictions.csv', index=False)
print(result_xgb.groupby('Stay')['case_id'].nunique())