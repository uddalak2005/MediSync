import './InventoryManagement.css'
import './OPDManager.css'
import React, {useEffect, useState} from 'react'

import { Outlet , NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

import AllStocks from '../components/InventoryManeger/AllStocks.jsx';
import SidePannelInventory from '../components/InventoryManeger/SidePannelInventory.jsx';


function InventoryManagement() {

    const [isValidSize, setIsValidSize] = useState(true);

    const checkScreenSize = () => {
        setIsValidSize(window.innerWidth >= 1366);
    };
    const navigate = useNavigate();

    useEffect(() => {
        checkScreenSize(); // Check size on mount
        window.addEventListener('resize', checkScreenSize); // Check size on resize

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        // Navigate to the default route when the app is loaded
        navigate('/Inventory');
    }, [navigate]);

    useEffect(() => {
        document.title = "MediSync | Inventory Management" ;
    }, []);
    if(isValidSize){
        return (
            <div className="OPDManagerPage">
            <SidePannelInventory/>
            <Outlet/>
            </div>
    )
}
else {
    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Screen Size Not Supported</h1>
            <p>Your screen size is too small to display this application.</p>
            <p>Please use a device with a resolution of at least 1366 x 768 pixels.</p>
        </div>
    );
}
}

export default InventoryManagement;