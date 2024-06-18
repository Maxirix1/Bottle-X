import React, { useState, useEffect } from 'react'; 
import { useLocation } from "react-router-dom";
import axios from 'axios';

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
            <div className="content-manage">
                <h2>Manage Page</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>ID:</strong> {userData.ID}</p>
                </div>
            </div>
        </div>
    );
}

export default Manage;
