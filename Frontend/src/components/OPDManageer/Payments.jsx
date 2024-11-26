import React from 'react';
import payments from "../../assets/credit-card.png";
import './Payments.css'
import { useNavigate } from "react-router-dom";

function Payments() {
    const navigate = useNavigate();

    function handleRedirect(){
        navigate('/OPDManagement/Bill')
    }

    return (
        <div className="PaymentsButton" onClick={handleRedirect}>
            <img src={payments} alt="" style={{height: '1.5rem', width: '1.5rem'}}/>
            Payments
        </div>
    )
}

export default Payments;