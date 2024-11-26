import React, {useEffect, useState} from 'react';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import PersonalDetailsIPD from "./PersonalDetailsIPD.jsx";
import FamilyDetailsIPD from "./FamilyDetailsIPD.jsx";
import AttachIPD from "./AttachIPD.jsx";
import './AddPatient.css'
import axios from "axios";




function AddPatient() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        // Load from local storage if available
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    });



    const [page, setPage] = useState(1);
    const nextPage = () => {
        navigate('/IPDManagement/AddPatient/PersonalDetails');
    };
    const prevPage = () => setPage(page - 1);

    const [storedBedId, setStoredBedId] = useState(null);

    useEffect(() => {
        const storedBed = localStorage.getItem('selectedBed');
        if (storedBed) {
            setStoredBedId(JSON.parse(storedBed).bedId);
        }
    }, []);

    useEffect(() => {
        // Navigate to the default route when the app is loaded
        navigate('/IPDManagement/AddPatient/PersonalDetails');
    }, [navigate]);

    // Example function to clear data from local storage
    const clearAllFields = () => {
        axios.post('http://localhost:3000/updateBedStatusBack', {
            bedId: storedBedId,
            status: 'unoccupied',
        })
            .then((response) => {
                if (response.data.success) {
                    // Disable the button
                    setFormData({}); // Reset form data
                    localStorage.removeItem('formData'); // Clear localStorage

                    // Navigate to the next page
                    navigate('/IPDManagement/BedStatus', { replace: true });
                    setIsButtonDisabled(true);
                } else {
                    console.error('Failed to update bed status');
                }
            })
            .catch((error) => {
                console.error('Error updating bed status:', error);
            });
    };

    return (
        <div style={{padding: '30px'}}>
            <div style={{
                fontSize: '22px',
                fontWeight: '600',
                paddingBottom: '10px',
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px',
                // width: '70vw',
                // margin: 'auto'
            }}>

                <div>Bed Selected : {storedBedId}</div>
                <button onClick={clearAllFields} className={"cancel"}>Cancel Appointment</button>
            </div>
            <div className="options">
                <ul className="NewRegOptions">
                    <li>
                        <NavLink
                            to="/IPDManagement/AddPatient/PersonalDetails"
                            style={{textDecoration: 'none', color: 'black'}}
                        >
                            Personal Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/IPDManagement/AddPatient/FamilyDetails"
                            style={{textDecoration: 'none', color: 'black'}}
                        >
                            Family Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/IPDManagement/AddPatient/Attachments"
                            style={{textDecoration: 'none', color: 'black'}}
                        >
                            Attachments
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path="/PersonalDetails"
                       element={<PersonalDetailsIPD nextPage={() => navigate('/IPDManagement/AddPatient/FamilyDetails')}
                       />}/>
                <Route path="/FamilyDetails"
                       element={<FamilyDetailsIPD nextPage={() => navigate('/IPDManagement/AddPatient/Attachments')}
                                                  prevPage={() => navigate('/IPDManagement/AddPatient/PersonalDetails')}
                       />}/>
                <Route path="/Attachments"
                       element={<AttachIPD prevPage={() => navigate('/IPDManagement/AddPatient/FamilyDetails')}
                       />}/>

            </Routes>
        </div>
    )

}

export default AddPatient;