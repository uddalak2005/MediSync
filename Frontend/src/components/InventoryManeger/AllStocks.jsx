import '../CommonComponents/FormTextInputs.css'
import '../CommonComponents/Forms.css'
import React, {useEffect, useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import {FaCheckCircle} from 'react-icons/fa';
import axios from "axios";




function AllStocks() {


    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        // Fetch data from the server when the component mounts
        axios.get('http://localhost:3000/getStock')
            .then(response => {
                setStockData(response.data.data); // Update the stockData state with the fetched data
            })
            .catch(error => {
                console.error(error);
            });
    }, []);



    return (
    <div className='formArea' style={{transform :'translateX(5vh)',marginTop:'13vh'}}>
        <div className='renderForm'>
        <p style={{fontSize: '20px', fontWeight: '600', padding: '15px'}}>All Stocks</p>
        <div style={{
                            border: '1px solid black',
                            height: '65vh',
                            borderBottomRightRadius: '15px',
                            borderBottomLeftRadius: '15px', backgroundColor: '#e1e1e1', fontSize: '12px'
                        }}>
                            <div style={{
                                height: '50px',
                                backgroundColor: '#e1e1e1',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingLeft: '20px',
                                paddingRight: `35px`
                            }}>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>No.
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Medicine Name
                                </div>
                                <div style={{width: '120px', textAlign: 'center', fontWeight: '600', color: 'blue'}}>Medicine ID</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Date of Manufacturing</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Date of Expiry</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Disposed Department</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Status</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Action</div>
                                </div>
                                <div style={{paddingBottom: '10px', overflowY: 'scroll', height: '52vh' , backgroundColor: '#e1e1e1'}}>
                                <div>
                                    {stockData.map(item => (
                                        <li key={item.medicineid}>
                                            <p>Medicine ID: {item.medicineid}</p>
                                            <p>Medicine Name: {item.medicinename}</p>
                                            <p>MFG Date: {item.mfg_date}</p>
                                            <p>EXP Date: {item.exp_date}</p>
                                            <p>Disposed Department: {item.disposeddepartment}</p>
                                        </li>
                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

        
  )
}

export default AllStocks