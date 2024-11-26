import {Link} from 'react-router-dom';
import './App.css'
import logo from './assets/file.png'
import hospital from './assets/file (1).png'


import React, {useEffect, useState} from "react";

// Create the router with the routes

function App() {

    useEffect(() => {
        document.title = "MediSync | Home";
    }, []);


    const [isValidSize, setIsValidSize] = useState(true);

    const checkScreenSize = () => {
        setIsValidSize(window.innerWidth >= 1366);
    };

    // This effect runs on component mount and when the window resizes
    useEffect(() => {
        checkScreenSize(); // Check size on mount
        window.addEventListener('resize', checkScreenSize); // Check size on resize

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    // The return statement must always render the same structure
    if (!isValidSize) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h1>Screen Size Not Supported</h1>
                <p>Your screen size is too small to display this application.</p>
                <p>Please use a device with a resolution of at least 1366 x 768 pixels.</p>
            </div>
        );
    }





    return (
        <div className="launch-page">
            <header className="launch-page-inner">
                <div className="main-content-parent">
                    <div className="main-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img
                            className="hospital-image-icon"
                            loading="lazy"
                            alt=""
                            src={logo}
                            style={{padding:'0px'}}
                        />

                        <div className="medisync-hospitals">MediSync Hospitals</div>
                    </div>
                    <div className="navigation">
                        <div className="menu-container-parent">
                            <nav className="menu-container">
                                <nav className="menu">
                                    <Link to='/' className="home">Home</Link>
                                    <Link to='/About' className="about">About</Link>
                                    <Link to='/Services' className="services">Services</Link>
                                    <Link to='/Hospitals' className="hospitals">Hospitals</Link>
                                    <a href='http://127.0.0.1:5000/'className='ai-f'>AI Forecast</a>
                                </nav>
                            </nav>
                            <button className="rectangle-parent" style={{display:'flex',justifyContent:'center', alignItems:'center',paddingBottom:'10px'}}>
                                <Link to='/Login' className="login" >Login</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <section className="hero-content-parent">
                <div className="hero-content">
                    <div className="hero-title-parent">
                        <div className="hero-title">
                            <h1 className="manage-hospital-never-container">
                                <p className="manage-hospital-one">Manage Hospital </p>
                                <p className="manage-hospital-two">Never
                                    Before</p>
                            </h1>
                            <div className="experience-hospital-management">
                                Experience hospital management like never before with our
                                system: unparalleled efficiency, seamless integration, and
                                cutting-edge features that redefine healthcare operations.
                            </div>
                        </div>
                        <div className="call-to-action">
                            <button className="buttons" style={{display:'flex',justifyContent:'center', alignItems:'center', padding:'10px'}}>
                                <div className="sign-up" style={{display:'flex',justifyContent:'center', alignItems:'center', paddingTop:'5px'}}>Sign Up</div>
                            </button>
                            <button className="buttons1" style={{display:'flex',justifyContent:'center', alignItems:'center', padding:'10px'}}>
                                <div className="contact-us" style={{display:'flex',justifyContent:'center', alignItems:'center', paddingTop:'5px'}}>Contact Us</div>
                            </button>
                        </div>
                    </div>
                </div>
                <img
                    className="hero-background-icon"
                    loading="lazy"
                    alt=""
                    src={hospital}
                    style={{ width: '650px', height: '450px' }}
                />
            </section>
        </div>

)
    ;
}

export default App;