import '../CommonComponents/FormTextInputs.css'
import '../CommonComponents/Forms.css'
import './SidePanel.css'
import './Bill.css'
import React, {useEffect, useState} from 'react';
import axios from "axios";





function Bill() {
    const [billData, setbillData] = useState({
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
        date: null,
        DoctorName: null,
        Department:null,
        Quantity:null,
        TotalAmount:null,
        Discount:null,
        PaymentMethod:null,
        NetAmount:null,
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
        const savedData = JSON.parse(localStorage.getItem('billData'));
        if (savedData) {
            setbillData(savedData);
        }
    }, []);

    const handleSubmit = () => {
        console.log("Sending request to server...");

        axios.post('http://localhost:3000/billingDetails', billData, { responseType: 'blob' })
            .then((response) => {
                // Create a URL for the blob object returned by the server
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'PatientDetails.pdf'); // The file name to be used for the downloaded file

                // Append the link to the document and trigger the download
                document.body.appendChild(link);
                link.click();

                // Cleanup: remove the link after the download is triggered
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Error downloading the PDF:', error);
            });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        const newbillData = { ...billData, [name]: value };
        setbillData(newbillData);
        localStorage.setItem('billData', JSON.stringify(newbillData)); // Save to localStorage
    };
    return (


        <div className='formArea' style={{marginTop:'15vh', transform:'translateX(5vh)'}}>
            <p style={{fontSize: '25px', fontWeight: '600', padding: '15px', transform: 'translateY(-12vh)'}}>Payments System</p>
            <div style={{padding:'10px', overflowY: 'auto', height: '65vh',transform: 'translateY(-10vh)'}}>
                <div className="renderForm">
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '15px'}}>Basic Details</p>
                    <div className="rows">
                        <div className="info">
                            <input type="text"
                                   name="firstName"
                                   value={billData.firstName}

                                   placeholder="First Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="middleName"
                                   value={billData.middleName}
                                   onChange={handleChange}
                                   placeholder="Middle Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="text"
                                   name="lastName"
                                   value={billData.lastName}
                                   onChange={handleChange}
                                   placeholder="Last Name"
                                   className="formTextInput"/>
                        </div>
                        <div className="info">
                            <input type="number"
                                   name="age"
                                   value={billData.age}
                                   onChange={handleChange}
                                   placeholder="Age"
                                   className="formTextInput"/>
                        </div>
                    </div>


                    <div className="rows">
                        <div className="info">
                            <select name="gender"
                                    value={billData.gender}
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
                                   value={billData.dob}
                                   onChange={handleChange}
                                   placeholder="Date of Birth"
                                   className="formTextInput"/>
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Contact Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input type="number"
                                   name="mobNum"
                                   value={billData.mobNum}
                                   onChange={handleChange}
                                   placeholder="Mobile Number"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="number"
                                   name="altMobNum"
                                   value={billData.altmobNum}
                                   onChange={handleChange}
                                   placeholder="Alternate Mobile Number"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="email"
                                   name="email"
                                   value={billData.email}
                                   onChange={handleChange}
                                   placeholder="Email Address"
                                   className="formTextInput"/>
                        </div>}
                        {<div className="info">
                            <input type="number"
                                   name="aadhar"
                                   value={billData.aadhar}
                                   onChange={handleChange}
                                   placeholder="Aadhar Number"
                                   className="formTextInput"
                            />
                        </div>}
                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Appointment Details</p>
                    <div className="rows">
                        {<div className="info">
                            <input
                                name="date"
                                type="date"
                                id="calender"
                                value={billData.date}
                                onChange={handleChange}
                                min={minDate}
                                max={maxDate}
                                className="formTextInput"
                            />

                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="DoctorName"
                                   value={billData.DoctorName}
                                   onChange={handleChange}
                                   placeholder="Doctor's Name"
                                   className="formTextInput"
                            />
                        </div>}
                        <div className="info">
                            <select name="Department"
                                    value={billData.Department}
                                    onChange={handleChange} className="formTextInput">
                                <option disabled selected>Service</option>
                                <option value="R">Radiology</option>
                                <option value="C">Cardiology</option>
                                <option value="D">Dentistry</option>
                                <option value="CS">Clinical Services</option>
                                <option value="G">Gastroenterology</option>
                                <option value="N">Nephrology</option>
                                <option value="P">Pediatrics</option>
                                <option value="SS">Surgical services</option>

                            </select>
                        </div>

                    </div>
                    <p style={{fontSize: '20px', fontWeight: '600', padding: '10px'}}>Billing Details</p>
                    <div className="rows">
                        <div className="info">
                            <select name="Department"
                                    value={billData.Department}
                                    onChange={handleChange} className="formTextInput">
                                <option disabled selected>Service</option>
                                <option value="R">Radiology</option>
                                <option value="C">Cardiology</option>
                                <option value="D">Dentistry</option>
                                <option value="CS">Clinical Services</option>
                                <option value="G">Gastroenterology</option>
                                <option value="N">Nephrology</option>
                                <option value="P">Pediatrics</option>
                                <option value="SS">Surgical services</option>

                            </select>
                        </div>
                        {<div className="info">
                            <input type="text"
                                   name="Quantity"
                                   value={billData.Quantity}
                                   onChange={handleChange}
                                   placeholder="Service Quantity"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="TotalAmount"
                                   value={billData.TotalAmount}
                                   onChange={handleChange}
                                   placeholder="TotalAmount"
                                   className="formTextInput"
                            />
                        </div>}
                        {<div className="info">
                            <input type="text"
                                   name="Discount"
                                   value={billData.Discount}
                                   onChange={handleChange}
                                   placeholder="Discounted Amount"
                                   className="formTextInput"
                            />
                        </div>}
                    </div>
                    <div className="rows">
                        {<div className="info">
                            <input type="text"
                                   name="NetAmount"
                                   value={billData.NetAmount}
                                   onChange={handleChange}
                                   placeholder="Net Amount"
                                   className="formTextInput"
                            />
                        </div>}
                        <div className="info">
                            <select name="Payment Method"
                                    value={billData.PaymentMethod}
                                    onChange={handleChange} className="formTextInput">
                                <option disabled selected>Payment Method</option>
                                <option value="U">UPI</option>
                                <option value="CC">Credit Card</option>
                                <option value="DC">Debit Card</option>
                                <option value="C">Cash</option>
                            </select>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start',transform:'translateX(-3vh)'
                    }}>
                        <button className='PrintButton' onClick={handleSubmit}>Print</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Bill