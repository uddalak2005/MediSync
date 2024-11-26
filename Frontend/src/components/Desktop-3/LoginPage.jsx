import React, { useState, useRef } from 'react';
import './LoginPage.css';
import userImage from '../../assets/user.png';
import passImage from '../../assets/padlock.png';
import hideIcon from '../../assets/hideIcon.png';
import showIcon from '../../assets/showIcon.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const passwordInputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { username, password };

        if (username === '' || password === '') {
            toast.error('Please enter a valid username and password');
            return;
        }

        const url=props.post

        axios.post(url, userData)
            .then((response) => {
                if (response.status === 200) {

                    window.location.href = props.link; // Redirect on success
                } else {
                    toast.error('Invalid username or password'); // Show error notification
                }
            })
            .catch((error) => {
                toast.error('Invalid username or password');
                console.error('An error occurred during login:', error);
            });
    };

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
        if (passwordInputRef.current.type === 'password'){
            passwordInputRef.current.type = 'text';
        } else {
            passwordInputRef.current.type = 'password';
        }
    };

    return (
        <div className="loginBackGround">
            <div className="blueBox"></div>
            <div className="LoginContainer">
                <div className="Layer1">
                    <div className="blueLine"></div>
                </div>
                <div className="Layer2">
                    <ToastContainer />
                    <div className="main">
                        <div className="head">
                            <p className="Loginheader">{props.heading}</p>
                            <p style={{ color: '#000F99', fontWeight: '600', fontSize: '28px' }}>ADMIN LOGIN</p>
                            <p style={{ color: '#616161', fontSize: '20px' }}>Sign in to start your session</p>
                        </div>
                        <div className="userCreds">
                            <form
                                onSubmit={handleSubmit}
                                style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="userId">
                                    <img src={userImage} alt=""
                                         style={{ width: '32px', height: '32px', paddingRight: '30px' }} />
                                    <input type="text"
                                           placeholder="User Reference ID"
                                           className="LoginInput" value={username}
                                           onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="pass">
                                    <img src={passImage} alt=""
                                         style={{ width: '32px', height: '32px', paddingRight: '30px' }} />
                                    <input
                                        type={isVisible ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        ref={passwordInputRef}
                                        placeholder="Password"
                                        className="LoginInput" />
                                    <img
                                        src={isVisible ? hideIcon : showIcon}
                                        alt={isVisible ? 'Hide Password' : 'Show Password'}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                                    />
                                </div>
                                <button className="submit" type='submit'>Login</button>
                            </form>
                            <a href="" className="forgetPassword" style={{ fontSize: '18px' ,display: 'flex', margin: 'auto'}}>Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
             {/* Add ToastContainer to render notifications */}
        </div>
    );
}

export default LoginPage;
