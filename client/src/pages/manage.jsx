import React, { useState, useEffect } from 'react'; 
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Logo from '../assets/Wat_Suthiwararam_School_Crest.png'
import '../styles/responsive.css'
import '../styles/manage.css';
import 'boxicons'


function Manage() {
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const userID = location.state ? location.state.userID : null;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userID) {
                    const response = await axios.get(`http://localhost:3001/user/${userID}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 404) {
                    setUserData({ name: 'User not found', ID: 'Not available' });
                } else {
                    setUserData({ name: 'Error', ID: 'Error' });
                }
            }
        };

        fetchUserData();
    }, [userID]);

    return (
        <div className="container">
            
                {/* <h2>Manage Page</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>ID:</strong> {userData.ID}</p>
                </div> */}

            <header id="home">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <input type="checkbox" id="nav_check" hidden />
                <nav>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul>
                        <li><a href="#">home</a></li>
                        <li><a href="#about">about</a></li>
                        <li><a href="#">manual</a></li>
                        <li><a href="#">manual</a></li>
                        <li><box-icon name='log-out' flip='vertical' color='#ffffff' ></box-icon></li>
                    </ul>
                </nav>
                <label htmlFor="nav_check" className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
            </header>

            </div>
    );
}

export default Manage;
