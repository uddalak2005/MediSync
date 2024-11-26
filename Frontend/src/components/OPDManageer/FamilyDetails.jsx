import React from 'react';
import NextAndPrev from "./NextAndPrev.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '../CommonComponents/FormTextInputs.css'
import '../CommonComponents/Forms.css'


const FamilyDetails = ({ prevPage, nextPage }) => {

    const [formData, setFormData] = useState(() => {
        // Load from local storage if available.
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    });



    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        localStorage.setItem('formData', JSON.stringify(newFormData)); // Save to localStorage
    };


    return(
        <div className='formArea'>
            <div style={{padding: '10px', overflowY: 'auto', height: '70vh'}}>
                <div className="renderForm">
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '15px'}}>Family Member Details</p>
                    <div className="rows">
                        <div className="info">
                            <input type="text"
                                   name="FamilyfirstName"
                                   value={formData.familyFirstName}
                                   onChange={handleChange}
                                   placeholder="First Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="familyMiddleName"
                                   value={formData.familyMiddleName}
                                   onChange={handleChange}
                                   placeholder="Last Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="firstName"
                                   value={formData.familyLastName}
                                   onChange={handleChange}
                                   placeholder="First Name"
                                   className="formTextInput"/>
                        </div>
                            <div className="info">
                                <select name="gender" id="genderFamily" className="formTextInput">
                                    <option disabled selected>Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                        </div>
                    </div>
                    <div className="rows">
                        <div className="info">
                            <input type="text"
                                   name="ageFamily"
                                   value={formData.ageFamily}
                                   onChange={handleChange}
                                   placeholder="Age"
                                   className="formTextInput"/>
                        </div>
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Family Contact Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="mobNumFamily"
                                   value={formData.mobNumFamily}
                                   onChange={handleChange}
                                   placeholder="Mobile Number"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="altMobNumFamily"
                                   value={formData.altMobNumFamily}
                                   onChange={handleChange}
                                   placeholder="Alternate Mobile Number"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="email"
                                   name="emailFamily"
                                   value={formData.emailFamily}
                                   onChange={handleChange}
                                   placeholder="Email Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="relationFamily"
                                   value={formData.relationFamily}
                                   onChange={handleChange}
                                   placeholder="Relation"
                                   className="formTextInput"/>
                        </div>}

                    </div>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="relationNameFamily"
                                   value={formData.relationNameFamily}
                                   onChange={handleChange}
                                   placeholder="Relation Name"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="aadharFamily"
                                   value={formData.aadharFamily}
                                   onChange={handleChange}
                                   placeholder="Aadhar Number"
                                   className="formTextInput"/>
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Family Member Address Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="addressFamily"
                                   value={formData.addressFamily}
                                   onChange={handleChange}
                                   placeholder="Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="altAddressFamily"
                                   value={formData.altAddressFamily}
                                   onChange={handleChange}
                                   placeholder="Alternate Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="cityFamily"
                                   value={formData.cityFamily}
                                   onChange={handleChange}
                                   placeholder="City/Town"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="PincodeFamily"
                                   value={formData.PincodeFamily}
                                   onChange={handleChange}
                                   placeholder="Pincode"
                                   className="formTextInput"/>
                        </div>}

                    </div>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="districtFamily"
                                   value={formData.districtFamily}
                                   onChange={handleChange}
                                   placeholder="District"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="stateFamily"
                                   value={formData.stateFamily}
                                   onChange={handleChange}
                                   placeholder="State"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="countryFamily"
                                   value={formData.countryFamily}
                                   onChange={handleChange}
                                   placeholder="Country"
                                   className="formTextInput"/>
                        </div>}

                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Family Member Medical Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="heightFamily"
                                   value={formData.heightFamily}
                                   onChange={handleChange}
                                   placeholder="Height"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="weightFamily"
                                   value={formData.weightFamily}
                                   onChange={handleChange}
                                   placeholder="Weight"
                                   className="formTextInput"/>
                        </div>}
                        <div className="info">
                            <select name="Gender" id="bloodGroupFamily" className="formTextInput" value={formData.bloodGroupFamily}>
                                <option disabled selected>Blood Group</option>
                                <option value="Apos">A+</option>
                                <option value="Aneg">A-</option>
                                <option value="Bpos">B+</option>
                                <option value="Bneg">B-</option>
                                <option value="ABpos">AB+</option>
                                <option value="ABneg">AB-</option>
                                <option value="Opos">O+</option>
                                <option value="Oneg">O-</option>
                            </select>
                        </div>
                    </div>
            {/*    </div>*/}
            {/*</div>*/}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <NextAndPrev name="Previous" onClick={prevPage} />
                    <NextAndPrev name="Next" onClick={nextPage} />
                </div>
            </div>
        </div>
        </div>
    )
}

export default FamilyDetails;