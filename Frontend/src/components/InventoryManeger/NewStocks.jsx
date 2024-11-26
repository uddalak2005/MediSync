import React, {useEffect, useState} from 'react';
import '../CommonComponents/FormTextInputs.css'
import '../CommonComponents/Forms.css'
import NextAndPrev from "./NextAndPrev.jsx";
import axios from "axios";

function NewStocks() {

    const [formData, setFormData] = useState({
        medicineid: null,
        medicinename: null,
        mfg_date: null,
        exp_date: null,
        disposeddepartment: null,
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };


    const handleSubmit = () => {
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);

        // Send the JSON data to the server using Axios
        axios.post('http://localhost:3000/addStock', jsonData)
            .then((response) => {
                console.log(response);
                // Clear the formData using setFormData
                setFormData({
                    medicineid: null,
                    medicinename: null,
                    mfg_date: null,
                    exp_date: null,
                    disposeddepartment: null,
                });
                // Redirect to the desired page
                window.location.href = '/Inventory/AllStocks';
            })
            .catch((error) => {
                console.error(error);
            });
    };


  return (
    <div className='formArea' style={{transform :'translateX(5vh)',marginTop:'13vh'}}>
            <div style={{padding:'10px', overflowY: 'auto', height: '70vh'}}>
                <div className="renderForm">
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '15px'}}>Medicine Details</p>
                    <div className="rows">
                        <div className="info">
                            <input
                                type="text"
                                name="medicineid"
                                value={formData.medicineid}
                                onChange={handleInputChange}
                                placeholder="Medicine Id"
                                className="formTextInput"
                            />
                        </div>
                        <div className="info">
                            <input
                                type="text"
                                name="medicinename"
                                value={formData.medicinename}
                                onChange={handleInputChange}
                                placeholder="Medicine Name"
                                className="formTextInput"
                            />
                        </div>
                        <div className="info">
                            <input
                                type="date"
                                name="mfg_date"
                                value={formData.mfg_date}
                                onChange={handleInputChange}
                                placeholder="Quantity"
                                className="formTextInput"
                            />
                        </div>
                        <div className="info">
                            <input
                                type="date"
                                name="exp_date"
                                value={formData.exp_date}
                                onChange={handleInputChange}
                                placeholder="Expiry Date"
                                className="formTextInput"
                            />
                        </div>
                    </div>

                    <div className="rows">
                        <div className="info">
                            <input
                                type="text"
                                name="disposeddepartment"
                                value={formData.disposeddepartment}
                                onChange={handleInputChange}
                                placeholder="Disposed Department"
                                className="formTextInput"
                            />
                        </div>
                    </div>
                    <NextAndPrev name='Add to Stock' onClick={handleSubmit}/>
                </div>
            </div>
    </div>
  )
}

export default NewStocks