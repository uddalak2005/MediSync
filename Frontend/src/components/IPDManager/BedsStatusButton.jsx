import React from 'react';
import './BedsStatusButton.css'
import { useNavigate } from "react-router-dom";

function BedsStatusButton(props) {
    const navigate = useNavigate();

    function handleRedirect(){
        navigate('/IPDManagement/BedStatus')
    }

    return (
        <div className="PaymentsButton" onClick={handleRedirect} >
            <img src={props.lnk} alt="" style={{height: '1.5rem', width: '1.5rem'}}/>
            {props.name}
        </div>
    )
}

export default BedsStatusButton;