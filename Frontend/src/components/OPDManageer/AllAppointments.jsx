import React, {useCallback, useEffect, useState} from 'react';
import './NewAppointments.css';
import axios from "axios";
import './NewAppointments.css'
import { FaSearch } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import {FaCheckCircle} from 'react-icons/fa';

function AllAppointments() {

    const [patientDetails, setPatientDetails] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const [universalSearch, setUniversalSearch] = useState(''); // Add a search state
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState({});
    const [bookedCount, setBookedCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [checkedOutCount, setCheckedOutCount] = useState(0);
    const [isBooked, setIsBooked] = useState(true);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isCheckedOut, setIsCheckedOut] = useState(true);

    const handleCheckOut = useCallback((patientRegID) => {
        axios.delete(`http://localhost:3000/checkOutPatient/${patientRegID}`)
            .then(response => {
                console.log('Patient deleted successfully');
                setUpdate(true); // Update the state to trigger a re-fetch of the data
                setButtonsDisabled((prevDisabled) => ({ ...prevDisabled, [patientRegID]: true }));
            })
            .catch(error => {
                console.error('Error deleting patient:', error);
                setError('Error deleting patient');
            });
    }, []);

    const handleDelete = useCallback((patientRegID) => {
        axios.delete(`http://localhost:3000/deletePatient/${patientRegID}`)
            .then(response => {
                console.log('Patient deleted successfully');
                setUpdate(true); // Update the state to trigger a re-fetch of the data
                setButtonsDisabled((prevDisabled) => ({ ...prevDisabled, [patientRegID]: true }));
            })
            .catch(error => {
                console.error('Error deleting patient:', error);
                setError('Error deleting patient');
            });
    }, []);


    const countPatientStatuses = (patients) => {
        const bookedCount = patients.filter((patient) => patient.patientStatus === 'booked').length;
        const cancelledCount = patients.filter((patient) => patient.patientStatus === 'cancelled').length;
        const checkedOutCount = patients.filter((patient) => patient.patientStatus === 'checked-out').length;

        return {
            bookedCount,
            cancelledCount,
            checkedOutCount
        };
    };


    const handleUniversalSearch = useCallback((event) => {
        setUniversalSearch(event.target.value);
    }, []);

    const filteredPatientDetails = patientDetails.filter(patient => {

        let patientName = '';
        let doctorName = '';
        if (patient.patientFirstName) {
            patientName += patient.patientFirstName;
        }
        if (patient.patientMiddleName) {
            patientName += ` ${patient.patientMiddleName}`;
        }
        if (patient.patientLastName) {
            patientName += ` ${patient.patientLastName}`;
        }

        if (patient.doctorName) {
            doctorName = patient.doctorName;
        }

        const mobileNumber = patient.patientMobile ? patient.patientMobile : '';

        const searchCondition = (
            patientName.toLowerCase().includes(universalSearch.toLowerCase()) ||
            doctorName.toLowerCase().includes(universalSearch.toLowerCase()) ||
            mobileNumber.includes(universalSearch)
        );

        const statusCondition = (
            (isBooked && patient.patientStatus === 'booked') ||
            (isCancelled && patient.patientStatus === 'cancelled') ||
            (isCheckedOut && patient.patientStatus === 'checked-out')
        );

        return searchCondition && statusCondition;
    });



    useEffect(() => {
        axios.get('http://localhost:3000/fetchPatientDetails')
            .then(response => {
                console.log('Received data:', response.data);
                if (Array.isArray(response.data)) {
                    const patientStatusCounts = countPatientStatuses(response.data);
                    setPatientDetails(response.data);
                    setBookedCount(patientStatusCounts.bookedCount);
                    setCancelledCount(patientStatusCounts.cancelledCount);
                    setCheckedOutCount(patientStatusCounts.checkedOutCount);
                } else {
                    setError('Received invalid data from API');
                }
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
                setError('Error fetching patient details');
            });
    }, [update, {}]); // Add an empty object to the dependency array// Add the update state to the dependency array

    const handleUpdate = useCallback(() => {
        axios.get('http://localhost:3000/fetchPatientDetails')
            .then(response => {
                console.log('Received data:', response.data);
                if (Array.isArray(response.data)) {
                    setPatientDetails(response.data);
                } else {
                    setError('Received invalid data from API');
                }
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
                setError('Error fetching patient details');
            });
    }, []);

    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;



    return(

        <div style={{padding: '30px'}}>
            <div style={{
                fontSize: '22px',
                fontWeight: '600',
                paddingBottom: '10px',
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px'
            }}>
                Current Appointments
                <button onClick={handleUpdate} className='update'>Update Data</button>


            </div>
            <div className='formArea' style={{height: '78vh'}}>
                <div className="appStatus" style={{height: '30px', display: 'flex', gap: '30px', paddingLeft: '10px', fontSize: '14px', fontWeight: '600'}}>
                    <p>Booked: {bookedCount}</p>
                    <p>Cancelled: {cancelledCount}</p>
                    <p>Checked-out: {checkedOutCount}</p>
                </div>
                <hr></hr>
                <div style={{padding: '10px', height: '75vh'}}>
                    <div style={{width: '71vw', borderRadius: '15px'}}>
                    <div style={{
                            height: '10vh',
                            backgroundColor: '#E5F2FF',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '5px',
                                borderRadius: '25px',
                                backgroundColor: '#ffffff',
                                width: '350px',
                                paddingLeft: '20px',
                                height: '30px'
                            }}>
                                <FaSearch style={{fontSize: '18px', marginRight: '10px', color: 'blue'}}/>
                                <input type="search" value={universalSearch} onChange={handleUniversalSearch}
                                       placeholder="Search by patient name, doctor name, registration ID, or mobile number"
                                       style={{
                                           width: '310px',
                                           padding: '10px',
                                           border: 'none',
                                           borderRadius: '5px',
                                           backgroundColor: '#ffffff',
                                       }}/>
                            </div>
                        <div style={{display:'flex',gap:'30px',fontWeight:'600',fontSize:'12px'}}>
                            <label style={{display:'flex', justifyContent: 'space-between', alignItems:'center', gap: '5px'}}>
                                <input
                                    type="checkbox"
                                    checked={isBooked}
                                    onChange={() => setIsBooked(!isBooked)}
                                />
                                Booked
                            </label>
                            <label  style={{display:'flex', justifyContent: 'space-between', alignItems:'center', gap: '5px'}}>
                                <input
                                    type="checkbox"
                                    checked={isCancelled}
                                    onChange={() => setIsCancelled(!isCancelled)}
                                />
                                Cancelled
                            </label>
                            <label  style={{display:'flex', justifyContent: 'space-between', alignItems:'center', gap: '5px'}}>
                                <input
                                    type="checkbox"
                                    checked={isCheckedOut}
                                    onChange={() => setIsCheckedOut(!isCheckedOut)}
                                />
                                Checked-out
                            </label>
                        </div>

                    </div>
                        <div style={{
                            border: '1px solid black',
                            height: '60vh',
                            borderBottomRightRadius: '15px',
                            borderBottomLeftRadius: '15px', backgroundColor: '#e1e1e1', fontSize: '12px'
                        }}>
                            <div style={{
                                height: '30px',
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
                                }}>Token No.
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Patient Name
                                </div>
                                <div style={{width: '120px', textAlign: 'center', fontWeight: '600', color: 'blue'}}>Registration ID</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Date</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Doctor's Name</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Mobile Number</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Status</div>
                                <div style={{width: '120px', textAlign:'center', fontWeight: '600', color: 'blue'}}>Action</div>
                            </div>
                            <div style={{paddingBottom: '10px', overflowY: 'scroll', height: '52vh' , backgroundColor: '#e1e1e1'}}>
                                <div>
                                    {filteredPatientDetails.map((patient, index) => (
                                        <div style={{
                                            height: '30px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            backgroundColor:'#ffffff',
                                            margin:'10px',
                                            fontSize:'12px'
                                        }}>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                            }}>{index+1}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                            }}>{patient.patientFirstName} {patient.patientMiddleName} {patient.patientLastName}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{patient.patientRegID}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{patient.date}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{patient.doctorName}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{patient.patientMobileNo}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{patient.patientStatus}
                                            </div>
                                            <div style={{
                                                width: '120px',
                                                textAlign: 'center',
                                                fontWeight: '600'
                                            }}>{(patient.patientStatus === 'cancelled' || patient.patientStatus === 'checked-out') ? <div>
                                                <FaCheckCircle
                                                    style={{
                                                        fontSize: '18px',
                                                        marginRight: '10px',
                                                        color: 'green',
                                                        cursor: 'not-allowed', // Change cursor style when disabled
                                                        opacity: 0.5 // Grey out the button when disabled
                                                    }}
                                                />
                                                <FaTimesCircle
                                                    style={{
                                                        fontSize: '18px',
                                                        marginRight: '10px',
                                                        color: 'red',
                                                        cursor: 'not-allowed', // Change cursor style when disabled
                                                        opacity:0.5// Grey out the button when disabled
                                                    }}
                                                />
                                                </div>
                                                : <div>
                                                    <FaCheckCircle
                                                        style={{
                                                            fontSize: '18px',
                                                            marginRight: '10px',
                                                            color: 'green',
                                                            cursor: buttonsDisabled[patient.patientRegID] ? 'not-allowed' : 'pointer', // Change cursor style when disabled
                                                            opacity: buttonsDisabled[patient.patientRegID] ? 0.5 : 1 // Grey out the button when disabled
                                                        }}
                                                        onClick={() => handleCheckOut(patient.patientRegID)}
                                                        disabled={buttonsDisabled[patient.patientRegID]} // Disable the button when `buttonsDisabled` is true
                                                    />
                                                    <FaTimesCircle
                                                        style={{
                                                            fontSize: '18px',
                                                            marginRight: '10px',
                                                            color: 'red',
                                                            cursor: buttonsDisabled[patient.patientRegID] ? 'not-allowed' : 'pointer', // Change cursor style when disabled
                                                            opacity: buttonsDisabled[patient.patientRegID] ? 0.5 : 1 // Grey out the button when disabled
                                                        }}
                                                        onClick={() => handleDelete(patient.patientRegID)}
                                                        disabled={buttonsDisabled[patient.patientRegID]} // Disable the button when `buttonsDisabled` is true
                                                    />
                                            </div>}

                                            </div>
                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default AllAppointments;