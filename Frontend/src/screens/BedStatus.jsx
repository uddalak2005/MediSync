import React, {useEffect} from 'react'
import LoginPage from "../components/Desktop-3/LoginPage.jsx";

function BedStatus(){

    useEffect(() => {
        document.title = "MediSync | Bed Status Monitoring" ;
    }, []);

    return (
        <LoginPage heading="Bed Status Monitoring" post="http://localhost:3000/IPDlogin" link="/IPDManagement"/>
    )
}

export default BedStatus;