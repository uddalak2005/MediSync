import React from 'react';
import logo from '../../assets/file.png'
import './SidePanel.css'
import { useEffect } from 'react';
import BedsStatusButton from "./BedsStatusButton.jsx";
import forecastButton from "./forecastButton.jsx";
import bed from '../../assets/sleeping.png'
import ai from '../../assets/artificial-intelligence.png'


function SidePanel() {

    /*const StaffCounter = () => {
        const [staffPresent, setStaffPresent] = useState(0);

        useEffect(() => {
          // Call from database to retrieve the number of staff present
          fetch('/staff-present')
            .then(response => response.json())
            .then(data => setStaffPresent(data.staffPresent));
        }, []);
    }*/

    /*const AvailableBeds = () => {
        const [availableBeds, setAvailableBeds] = useState(0);

        useEffect(() => {
          // Call from database to retrieve the available beds
          fetch('/available-beds')
            .then(response => response.json())
            .then(data => setAvailableBeds(data.availableBeds));
        }, []);
      */


    return(
        <div className="SidePanel">
            <div className="logo">
                <img src={logo} alt="" style={{height: '48px', width: '48px', padding:'0px', marginRight:'5px'}}/>
                <p style={{fontWeight: '600', textAlign:'left'}}>MediSync Hospital</p>
            </div>
            <div style={{marginTop:'30px'}}>
                <BedsStatusButton name="Bed Status" lnk={bed}/>
                <BedsStatusButton name="AI Forecast" lnk={ai}/>
            </div>

        </div>
    )
}

export default SidePanel;