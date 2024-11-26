import React from 'react';
import payments from "../../assets/sleeping.png";
import { useNavigate } from "react-router-dom";

function BedsStatusButton() {
    const navigate = useNavigate();

    function handleRedirect(){
        navigate('/IPDManagement')
    }

    return (
        <div className="PaymentsButton" onClick={handleRedirect}>
            <img src={payments} alt="" style={{height: '1.5rem', width: '1.5rem'}}/>
            Bed Status
        </div>
    )
}

export default BedsStatusButton;