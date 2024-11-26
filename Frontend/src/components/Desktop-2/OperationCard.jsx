import React from 'react';
import './OperationCard.css'
import {useNavigate} from "react-router-dom";




function OperationCard(props) {
    const navigate = useNavigate();

    const handleCardClick = (link) => {
        navigate(link);
    };

    return(
        <div className="OperationCard" onClick={() => handleCardClick(props.link)}>
            <img src={props.imagePath} alt={props.title} />
            <p className="cardTitle">{props.title}</p>
            <p className="cardSubHeading">{props.sub}</p>
        </div>
    )
}

export default OperationCard;