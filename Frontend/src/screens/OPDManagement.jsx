import React, {useEffect} from 'react'
import LoginPage from "../components/Desktop-3/LoginPage.jsx";

function OPDManagement(){

    useEffect(() => {
        document.title = "MediSync | OPD Management Login" ;
    }, []);

    return (
        <LoginPage heading="OPD Management Login" post="http://localhost:3000/OPDlogin" link="/OPDManagement"/>
    )
}

export default OPDManagement