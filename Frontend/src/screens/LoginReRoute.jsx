import React from 'react';
import {useEffect} from "react";
import "./LoginReRoute.css"
import Title from "../components/Desktop-2/Title.jsx";
import SubHeading from "../components/Desktop-2/SubHeading.jsx";
import OperationCard from "../components/Desktop-2/OperationCard.jsx"
import bedImage from '../assets/Bed.png';
import opd from '../assets/opd.png'
import inventory from '../assets/inventory.png'






const cards = [
    {
        title: "Bed Status Monitoring",
        description: "Instantaneous updates on patient bed status, ensuring accurate and timely information for optimal bed management and patient flow",
        image: bedImage,
        link: "/Login/BedStatusMonitoring",
    },
    {
        title: "Outpatient Department",
        description: "Optimize OPD operations with seamless scheduling, real-time updates, comprehensive patient records, and improved patient flow.",
        image: opd,
        link: "/Login/OPDManagement"
    },
    {
        title: "Inventory Management",
        description: "Efficiently track and manage hospital inventory with our system: real-time updates, automated alerts, and streamlined procurement for optimal resource use.",
        image: inventory,
        link: "/Login/InventoryManagement"
    },
];


function LoginReRoute() {



    useEffect(() => {
        document.title = "MediSync | Select Department";
    }, []);


    return(
        <div>
            <div className="backGround"></div>
            <div className="backGroundOverlay">
                <div className="LoginReRoute_Layer2">
                    <div className={"heading"}>
                        <Title/>
                    </div>
                    <div className="subHeading">
                        <SubHeading/>
                    </div>
                    <div className="card">
                        {
                            cards.map((card) => (
                                <OperationCard
                                    title={card.title}
                                    sub={card.description}
                                    imagePath={card.image}
                                    link={card.link}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginReRoute