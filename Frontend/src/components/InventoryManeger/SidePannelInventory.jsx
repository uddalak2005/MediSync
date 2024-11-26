import React from 'react'
import SidePanel from '../IPDManager/SidePanel'
import logo from '../../assets/file.png'
import '../OPDManageer/Payments.css'
import { useNavigate } from 'react-router-dom'

function SidePannelInventory() {

  const navigate = useNavigate();

  function handleRedirect(){
      navigate('/Inventory/NewStocks')
  }

  function handleRedirectMain(){
      navigate('/Inventory/AllStocks')
  }
  return (
      <div className="SidePanel">
          <div className="logo">
              <img src={logo} alt="" style={{height: '48px', width: '48px', padding: '0px', marginRight: '5px'}}/>
              <p style={{fontWeight: '600', textAlign: 'left'}}>MediSync Hospital</p>
          </div>
          <div className="PaymentsButton" style={{}} onClick={handleRedirect}>

              Add Stocks
          </div>
          <div className="PaymentsButton" style={{}} onClick={handleRedirectMain}>

              All Stocks
          </div>
      </div>
  )
}

export default SidePannelInventory