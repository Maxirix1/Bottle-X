import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Wat_Suthiwararam_School_Crest.png'
import '../styles/responsive.css'
import '../styles/manage.css';
import 'boxicons'
import Swal from 'sweetalert2'

function Manage() {
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const userID = location.state ? location.state.userID : null;

    const navigate = useNavigate();

    const handleClick = () => {
        let timerInterval;
        Swal.fire({
          title: "Loading...",
          html: "",
          timer: 2000,
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 20);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {

          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            navigate('/'); // พาผู้ใช้ไปยังเส้นทางที่กำหนดหลังจาก popup ปิด
          }

        });

        
    };

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
        <div className="container-manage">
            
                {/* <h2>Manage Page</h2>
                <div className="user-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>ID:</strong> {userData.ID}</p>
                </div> */}

            <header id="home-manage">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt="" />
                    </Link>
                </div>
                <input type="checkbox" id="nav_check" hidden />
                <nav>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul>
                        <li><a href="#">home</a></li>
                        <li><a href="#about">about</a></li>
                        <li><Link to="/manage">manage</Link></li>
                        <li><a href="#">manual</a></li>
                        <li className='active'><Link onClick={handleClick}>Logout</Link></li>
                    </ul>
                </nav>

                <label htmlFor="nav_check" className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>

            </header>
            <div className="dataMain">
                <p><strong>ชื่อ-สกุล : </strong>{userData.name}</p>
                <p><strong>เลขประจำตัว : </strong>{userData.ID}</p>
            </div>

            <div className="content-main">
                <div className="totalPoint">
                    <p>All your point.</p>
                    <div className="bottomContent">

                        <img src={Logo} alt="" />

                    </div>

                    <div className="showPoint">
                          <h1>{userData.totalPoint}<strong> Pt</strong></h1>
                        </div>

                        <div className="pointMain">
                            <p><strong>คะแนนพฤติกรรม : </strong> {userData.behavior}<strong> Pt</strong></p>
                            <p><strong>คะแนนจิตอาสา : </strong> {userData.volunteer}<strong> Pt</strong></p>
                        </div>
                        
                    <div className="condition">
                    <p><span>*</span>คะแนนที่แสดง ณ ที่นี้จะไม่ได้แสดงคะแนนที่รวมกับระบบโรงเรียน</p>
                    </div>
                </div>
                

            </div>
            <div className="buttonExchange">
                    <button className="button-1"><span>แลกคะแนน</span><h1>พฤติกรรม</h1></button>
                    <button className="button-2"><span>แลกคะแนน</span><h1>จิตอาสา</h1></button>
                </div>


            </div>
    );
}

export default Manage;
