from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

app = Flask(__name__)

model_xgb = joblib.load('xgb_model.pkl')

le = LabelEncoder()
def get_feature_input(prompt):
    return request.form[prompt]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Collect input from user
    data = {}
    data['Hospital_code'] = 21
    data['Hospital_type_code'] = 'c'
    data['City_Code_Hospital'] = 3
    data['Available Extra Rooms in Hospital'] = 2
    data['Department'] = get_feature_input("Department")
    data['Ward_Type'] = get_feature_input("Ward Type")
    data['Bed Grade'] = int(get_feature_input("Bed Grade"))
    data['City_Code_Patient'] = int(get_feature_input("City Code Patient"))
    data['Type of Admission'] = get_feature_input("Type of Admission")
    data['Severity of Illness'] = get_feature_input("Severity of Illness")
    data['Visitors with Patient'] = int(get_feature_input("Visitors with Patient"))
    data['Age'] = get_feature_input("Age")
    data['Admission_Deposit'] = 5000.00

    # Convert the dictionary to a DataFrame
    input_df = pd.DataFrame([data])
    categorical_columns = ['Hospital_type_code', 'Department', 'Ward_Type', 
                           'Type of Admission', 'Severity of Illness', 'Age']

    for col in categorical_columns:
        input_df[col] = le.fit_transform(input_df[col].astype(str))

    # Make prediction
    prediction = model_xgb.predict(input_df)
    label_mapping = {
        0: 'CategoryA (0-10 days)', 1: 'CategoryB (11-20 days)', 2: 'CategoryC (21-30 days)', 3: 'CategoryD (31-40 days)', 
        4: 'CategoryE (41-50 days)', 5: 'CategoryF (51-60 days)', 6: 'CategoryG (61-70 days)', 7: 'CategoryH (71-80 days)', 
        8: 'CategoryI (81-90 days)', 9: 'CategoryJ (91-100 days)', 10: 'CategoryK (100+ days)'
    }
    predicted_category = label_mapping[prediction[0]]
    return render_template('predict.html', predicted_category=predicted_category)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
