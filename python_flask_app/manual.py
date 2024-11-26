import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

model_xgb = joblib.load('xgb_model.pkl')
le = LabelEncoder()

def get_feature_input(prompt):
    return input(prompt)
data = {}
data['Hospital_code'] = int(get_feature_input("Enter Hospital Code: "))
data['Hospital_type_code'] = get_feature_input("Enter Hospital Type Code: ")
data['City_Code_Hospital'] = int(get_feature_input("Enter City Code Hospital: "))
data['Available Extra Rooms in Hospital'] = int(get_feature_input("Enter Available Extra Rooms in Hospital: "))
data['Department'] = get_feature_input("Enter Department: ")
data['Ward_Type'] = get_feature_input("Enter Ward Type: ")
data['Bed Grade'] = int(get_feature_input("Enter Bed Grade: "))
data['City_Code_Patient'] = int(get_feature_input("Enter City Code Patient: "))
data['Type of Admission'] = get_feature_input("Enter Type of Admission: ")
data['Severity of Illness'] = get_feature_input("Enter Severity of Illness: ")
data['Visitors with Patient'] = int(get_feature_input("Enter Visitors with Patient: "))
data['Age'] = get_feature_input("Enter Age: ")
data['Admission_Deposit'] = float(get_feature_input("Enter Admission Deposit: "))

input_df = pd.DataFrame([data])

categorical_columns = ['Hospital_type_code', 'Department', 'Ward_Type', 
                       'Type of Admission', 'Severity of Illness', 'Age']

for col in categorical_columns:
    input_df[col] = le.fit_transform(input_df[col].astype(str))

prediction = model_xgb.predict(input_df)
label_mapping = {
    0: 'CategoryA', 1: 'CategoryB', 2: 'CategoryC', 3: 'CategoryD', 
    4: 'CategoryE', 5: 'CategoryF', 6: 'CategoryG', 7: 'CategoryH', 
    8: 'CategoryI', 9: 'CategoryJ', 10: 'CategoryK'
}

# Output the prediction
predicted_category = label_mapping[prediction[0]]
print(f"Predicted Hospital Stay Duration Category: {predicted_category}")
