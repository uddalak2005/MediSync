import React from 'react'
import add from '../../assets/add.png'
import './AddStocks.css'


function AddStocks() {



  return (
    <div className="AddStocksButton">
        <img src={add} alt="" style={{height: '1.5rem', width: '1.5rem',padding: '0px',paddingRight: '10px'}}/>
        Add stocks

    </div>
  )
}

export default AddStocks