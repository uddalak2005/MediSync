import React, {useEffect, useState} from 'react';
import './NewAppointments.css';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import PersonalDetails from "./PersonalDetails.jsx";
import Attachments from "./Attachments.jsx";
import FamilyDetails from "./FamilyDetails.jsx";

function NewAppointments() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        // Load from local storage if available
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    });



    const [page, setPage] = useState(1);
    const nextPage = () => {
        navigate('/OPDManagement/NewAppointments/PersonalDetails');
    };
    const prevPage = () => setPage(page - 1);

    useEffect(() => {
        // Navigate to the default route when the app is loaded
        navigate('/OPDManagement/NewAppointments/PersonalDetails');
    }, [navigate]);

    // Example function to clear data from local storage
    const clearAllFields = () => {
        setFormData({}); // Reset form data
        localStorage.removeItem('formData'); // Clear localStorage
        // Optionally reload the page
        window.location.reload();
    };


    return (
        <div style={{ padding: '30px' }}>
            <div style={{ fontSize: '22px', fontWeight: '600', paddingBottom: '10px', paddingLeft: '10px' ,display:'flex', justifyContent: 'space-between' ,alignItems:'center',height: '40px'}}>
                New Appointments
                <button onClick={clearAllFields}  className={"cancel"}>Cancel Appointment</button>
            </div>
            <div className="options">
                <ul className="NewRegOptions">
                    <li>
                        <NavLink
                            to="/OPDManagement/NewAppointments/PersonalDetails"
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            Personal Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/OPDManagement/NewAppointments/FamilyDetails"
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            Family Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/OPDManagement/NewAppointments/Attachments"
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            Attachments
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path="/PersonalDetails" element={<PersonalDetails nextPage={() => navigate('/OPDManagement/NewAppointments/FamilyDetails')} />} />
                <Route path="/FamilyDetails" element={<FamilyDetails nextPage={() => navigate('/OPDManagement/NewAppointments/Attachments')} prevPage={() => navigate('/OPDManagement/NewAppointments/PersonalDetails')} />} />
                <Route path="/Attachments" element={<Attachments prevPage={() => navigate('/OPDManagement/NewAppointments/FamilyDetails')} />} />
            </Routes>
        </div>
    );
}

export default NewAppointments;