import React, {useEffect, useState} from 'react';
import NextAndPrev from "./NextAndPrev.jsx";
import {useNavigate} from "react-router-dom";
import '../CommonComponents/FormTextInputs.css'
import '../CommonComponents/Forms.css'

const PersonalDetails = ({ nextPage }) => {

    const [formData, setFormData] = useState({
        middleName: null,
        lastName: null,
        firstName:null,
        age:null,
        dob:null,
        birthAddress:null,
        time:null,
        gender: null,
        mobNum:null,
        altmobNum:null,
        email:null,
        aadhar:null,
        address:null,
        altAddress:null,
        city:null,
        Pincode:null,
        district:null,
        state:null,
        country:null,
        height:null,
        weight:null,
        bloodGroup:null,
        familyFirstName: null,
        familyMiddleName: null,
        familyLastName: null,
        ageFamily:null,
        mobNumFamily:null,
        altMobNumFamily:null,
        emailFamily:null,
        relationFamily:null,
        relationNameFamily:null,
        aadharFamily:null,
        altAddressFamily:null,
        cityFamily:null,
        PincodeFamily:null,
        districtFamily:null,
        stateFamily:null,
        countryFamily:null,
        heightFamily:null,
        weightFamily:null,
        bloodGroupFamily:null,
        date: null,
        DoctorName: null,

    });
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        setMinDate(today.toISOString().split('T')[0]);
        setMaxDate(oneMonthFromNow.toISOString().split('T')[0]);
    }, []);

    // Load data from localStorage when the component mounts
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
            <div style={{padding:'10px', overflowY: 'auto', height: '70vh'}}>
                <div className="renderForm">
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '15px'}}>Basic Details</p>
                    <div className="rows">
                        <div className="info">
                            <input type="text"
                                   name="firstName"
                                   value={formData.firstName}
                                   onChange={handleChange}
                                   placeholder="First Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="middleName"
                                   value={formData.middleName}
                                   onChange={handleChange}
                                   placeholder="Middle Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="lastName"
                                   value={formData.lastName}
                                   onChange={handleChange}
                                   placeholder="Last Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="number"
                                   name="age"
                                   value={formData.age}
                                   onChange={handleChange}
                                   placeholder="Age"
                                   className="formTextInput"/>
                        </div>
                    </div>


                    <div className="rows">
                        <div className="info">
                            <select name="gender"
                                    value={formData.gender}
                                    onChange={handleChange} className="formTextInput">
                                <option disabled selected>Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                        </div>
                        {<div className="info">
                            <input type="date"
                                   name="dob"
                                   value={formData.dob}
                                   onChange={handleChange}
                                   placeholder="Date of Birth"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="birthAddress"
                                   value={formData.birthAddress}
                                   onChange={handleChange}
                                   placeholder="Birth Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="time"
                                   name="time"
                                   value={formData.time}
                                   onChange={handleChange}
                                   placeholder="Time of Birth"
                                   className="formTextInput"/>
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Contact Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="number"
                                   name="mobNum"
                                   value={formData.mobNum}
                                   onChange={handleChange}
                                   placeholder="Mobile Number"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="number"
                                   name="altMobNum"
                                   value={formData.altmobNum}
                                   onChange={handleChange}
                                   placeholder="Alternate Mobile Number"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="Email Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="number"
                                   name="aadhar"
                                   value={formData.aadhar}
                                   onChange={handleChange}
                                   placeholder="Aadhar Number"
                                   className="formTextInput"
                            />
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Address Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="address"
                                   value={formData.address}
                                   onChange={handleChange}
                                   placeholder="Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="altAddress"
                                   value={formData.altAddress}
                                   onChange={handleChange}
                                   placeholder="Alternate Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="city"
                                   value={formData.city}
                                   onChange={handleChange}
                                   placeholder="City/Town"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="number"
                                   name="Pincode"
                                   value={formData.Pincode}
                                   onChange={handleChange}
                                   placeholder="Pincode"
                                   className="formTextInput"
                            />
                        </div>}
                    </div>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="district"
                                   value={formData.district}
                                   onChange={handleChange}
                                   placeholder="District"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="state"
                                   value={formData.state}
                                   onChange={handleChange}
                                   placeholder="State"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="country"
                                   value={formData.country}
                                   onChange={handleChange}
                                   placeholder="Country"
                                   className="formTextInput"/>
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Medical Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="height"
                                   value={formData.height}
                                   onChange={handleChange}
                                   placeholder="Height"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="weight"
                                   value={formData.weight}
                                   onChange={handleChange}
                                   placeholder="Weight"
                                   className="formTextInput"/>
                        </div>}
                        <div className="info">
                            <select name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange} className="formTextInput">
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
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Appointment Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input
                                name="date"
                                type="date"
                                id="calender"
                                value={formData.date}
                                onChange={handleChange}
                                min={minDate}
                                max={maxDate}
                                className="formTextInput"
                            />

                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="DoctorName"
                                   value={formData.DoctorName}
                                   onChange={handleChange}
                                   placeholder="Doctor's Name"
                                   className="formTextInput"
                            />
                        </div>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <NextAndPrev name="Next" onClick={nextPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails;