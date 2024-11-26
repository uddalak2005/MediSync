import React, {useEffect, useState} from 'react';
import arrowIcon from '../../assets/right-arrow.png'
import './Appointments.css'
import calender from'../../assets/calendar.png'
import {NavLink, useNavigate} from 'react-router-dom'

function Appointments(){

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <button className="accordion-button" onClick={toggleAccordion}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={calender} alt="" style={{height: '1.5rem', width: '1.5rem'}}/>
                    Appointments
                </div>

                <img
                    src={arrowIcon}
                    alt="Toggle Icon"
                    className={`accordion-icon ${isOpen ? 'rotate' : ''}`}
                />
            </button>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <ul className='AppointmentOptions' style={{listStyleType: 'disc'}}>
                    <li><NavLink to='/OPDManagement/NewAppointments/PersonalDetails' style={{textDecoration: 'none'}}>New Appointments</NavLink></li>
                    <li><NavLink to='/OPDManagement/AllAppointments' style={{textDecoration: 'none'}}>Current Appointments</NavLink></li>
                    <li><NavLink to='/OPDManagement/History' style={{textDecoration: 'none'}}>Appointments History</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Appointments;