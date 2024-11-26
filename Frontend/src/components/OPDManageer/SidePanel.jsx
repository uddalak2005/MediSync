import React from 'react';
import logo from '../../assets/file.png'
import './SidePanel.css'
import Appointments from "./Appointments.jsx";
import Payments from "./Payments.jsx";

function SidePanel() {
    return(
        <div className="SidePanel">
            <div className="logo">
                <img src={logo} alt="" style={{height: '48px', width: '48px', padding:'0px', marginRight:'5px'}}/>
                <p style={{fontWeight: '600', textAlign:'left'}}>MediSync Hospital</p>
            </div>
            <Appointments />
            <Payments />
        </div>
    )
}

export default SidePanel;