import React, {useCallback, useEffect, useState} from 'react';
import '../OPDManageer/NewAppointments.css';
import axios from "axios";
import { FaSearch } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import {FaCheckCircle} from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

function BedStatusMonitor() {

    const navigate = useNavigate();

    const [patientDetails, setPatientDetails] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const [universalSearch, setUniversalSearch] = useState(''); // Add a search state
    const [buttonsDisabled, setButtonsDisabled] = useState({});
    const [bookedCount, setBookedCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [checkedOutCount, setCheckedOutCount] = useState(0);
    const [isBooked, setIsBooked] = useState(true);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isCheckedOut, setIsCheckedOut] = useState(true);
    const [filterDate, setFilterDate] = useState('');
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('http://localhost:3001/fetchPatientIPD')
            .then(response => {
                setPatientDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleCheckOut = useCallback((bedID) => {
        axios.delete(`http://localhost:3000/checkOutBedPatient/${bedID}`)
            .then(response => {
                console.log('Patient checked out successfully');
                setUpdate(true); // Update the state to trigger a re-fetch of the data
                setButtonsDisabled((prevDisabled) => ({ ...prevDisabled, [bedID]: true }));
            })
            .catch(error => {
                console.error('Error checking out patient:', error);
                setError('Error checking out patient');
            });
    }, []);




    const countPatientStatuses = (patients) => {
        const bookedCount = beds.filter((bed) => bed.bedStatus === 'unoccupied').length;
        const checkedOutCount = beds.filter((bed) => bed.bedStatus === 'occupied').length;

        return {
            bookedCount,
            checkedOutCount
        };
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const [occupied, setOccupied] = useState(false);
    const [unoccupied, setUnoccupied] = useState(false);



    const handleOccupiedChange = () => {
        setOccupied(!occupied);
    };

    const handleUnoccupiedChange = () => {
        setUnoccupied(!unoccupied);
    };





    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPatients = patientDetails.filter((patient) => {
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
        const bedNumber = patient.bedId;

        const searchTermMatch =
            patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mobileNumber.includes(searchTerm)

        const dateMatch = selectedDate ? patient.date === selectedDate : true;

        return searchTermMatch  && dateMatch;
    });




    useEffect(() => {
        axios.get('http://localhost:3000/fetchBeds')
            .then(response => {
                console.log('Received data:', response.data);
                if (Array.isArray(response.data)) {
                    const patientStatusCounts = countPatientStatuses(response.data);
                    setBeds(response.data);
                    setBookedCount(patientStatusCounts.bookedCount);
                    setCheckedOutCount(patientStatusCounts.checkedOutCount);
                } else {
                    setError('Received invalid data from API');
                }
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
                setError('Error fetching patient details');
            });
    }, [update, {}]);

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


    useEffect(() => {
        axios.get('http://localhost:3000/fetchPatientIPD')
            .then(response => {
                setPatientDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);


    const handleAddPatient = (bedId) => {
        axios.post('http://localhost:3000/updateBedStatus', {
            bedId,
            status: 'occupied',
        })
            .then((response) => {
                if (response.data.success) {
                    // Disable the button


                    // Store the bedId in localStorage
                    localStorage.setItem('selectedBed', JSON.stringify({ bedId }));

                    // Navigate to the next page
                    navigate('/IPDManagement/AddPatient/PersonalDetails', { replace: true });
                    setIsButtonDisabled(true);
                } else {
                    console.error('Failed to update bed status');
                }
            })
            .catch((error) => {
                console.error('Error updating bed status:', error);
            });
    };




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
                Bed Status Monitor
                <button onClick={handleUpdate} className='update'>Update Data</button>


            </div>
            <div className='formArea' style={{height: '78vh'}}>
                <div className="appStatus" style={{height: '30px', display: 'flex', gap: '30px', paddingLeft: '10px', fontSize: '14px', fontWeight: '600'}}>
                    <p>Unoccupied: {bookedCount}</p>
                    <p>Occupied: {checkedOutCount}</p>
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
                                height: '25px'
                            }}>
                                <FaSearch style={{fontSize: '18px', marginRight: '10px', color: 'blue'}}/>
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search by patient name, doctor name, mobile number, or bed number"
                                    style={{border: 'none', borderRadius: '5px', width: '310px'}}
                                />
                            </div>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                placeholder="Select a date"
                                style={{
                                    border: 'none',
                                    backgroundColor: '#ffffff',
                                    padding: '7px',
                                    width: '150px',
                                    borderRadius: '20px',
                                }}
                            />

                            <div style={{display: 'flex', gap: '30px', fontWeight: '600', fontSize: '12px'}}>
                                <input
                                    type="checkbox"
                                    id="occupied"
                                    checked={occupied}
                                    onChange={handleOccupiedChange}
                                />
                                <label htmlFor="occupied">Occupied</label>

                                <input
                                    type="checkbox"
                                    id="unoccupied"
                                    checked={unoccupied}
                                    onChange={handleUnoccupiedChange}
                                />
                                <label htmlFor="unoccupied">Unoccupied</label>
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
                                }}>Room No.
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Bed No.
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Status
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Registration ID
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Doctor Name
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Contact
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Admission Date
                                </div>
                                <div style={{
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'blue'
                                }}>Action
                                </div>
                            </div>
                            <div style={{
                                paddingBottom: '10px',
                                overflowY: 'scroll',
                                height: '52vh', backgroundColor: '#e1e1e1'
                            }}>
                                <div>
                                    {beds.filter((bed) => {
                                        if (occupied && unoccupied) return true; // Show all beds if both checkboxes are checked
                                        if (occupied) return bed.bedStatus === 'occupied';
                                        if (unoccupied) return bed.bedStatus === 'unoccupied';
                                        return true; // Show all beds if no checkboxes are checked
                                    }).map((bed) => {
                                        const patient = filteredPatients.find((patient) => patient.bedId === bed.bedID);
                                        return (
                                            <div style={{
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                backgroundColor: '#ffffff',
                                                margin: '10px',
                                                fontSize: '12px'
                                            }}>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>{bed.roomNo}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600',
                                                }}>{bed.bedID}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>{bed.bedStatus}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600',
                                                }}>
                                                    {patient ? (patient.patientMiddleName === null ? `${patient.patientFirstName} ${patient.patientLastName}` : `${patient.patientFirstName} ${patient.patientMiddleName} ${patient.patientLastName}`) : 'N.A'}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>
                                                    {patient ? `${patient.doctorName}` : 'N.A'}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>{patient ? `${patient.patientMobileNo}` : 'N.A'}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>{patient ? `${patient.date}` : 'N.A'}
                                                </div>
                                                <div style={{
                                                    width: '120px',
                                                    textAlign: 'center',
                                                    fontWeight: '600'
                                                }}>
                                                    <FaPlusCircle
                                                        style={{
                                                            fontSize: '18px',
                                                            marginRight: '10px',
                                                            color: 'green',
                                                            cursor: bed.bedStatus === 'occupied' ? 'not-allowed' : 'pointer', // Change cursor style when disabled
                                                            opacity: bed.bedStatus === 'occupied' ? 0.5 : 1 // Grey out the button when disabled
                                                        }}
                                                        onClick={() => {
                                                            if (bed.bedStatus !== 'occupied') {
                                                                handleAddPatient(bed.bedID);
                                                            }
                                                        }}
                                                    />
                                                    <FaCheckCircle
                                                        style={{
                                                            fontSize: '18px',
                                                            marginRight: '10px',
                                                            color: 'green',
                                                            cursor: bed.bedStatus !== 'occupied' ? 'not-allowed' : 'pointer', // Change cursor style when disabled
                                                            opacity: bed.bedStatus !== 'occupied' ? 0.5 : 1 // Grey out the button when disabled
                                                        }}
                                                        onClick={() => {
                                                            if (bed.bedStatus === 'occupied') {
                                                                handleCheckOut(bed.bedID);
                                                                const updatedPatientDetails = patientDetails.filter((p) => p.bedId !== bed.bedID);
                                                                setPatientDetails(updatedPatientDetails);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default BedStatusMonitor;