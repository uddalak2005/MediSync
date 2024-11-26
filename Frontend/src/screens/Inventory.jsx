import React, {useEffect} from 'react'
import LoginPage from "../components/Desktop-3/LoginPage.jsx";

function Inventory(){

    useEffect(() => {
        document.title = "MediSync | Inventory Management System" ;
    }, []);

    return (
        <LoginPage heading="Inventory Management " post="http://localhost:3000/Inventorylogin" link="/Inventory"/>
    )
}

export default Inventory;