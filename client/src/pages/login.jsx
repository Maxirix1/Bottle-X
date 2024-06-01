import React, { useState } from 'react'; 
import '../styles/login.css';
import '../styles/font.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // รีเซ็ตข้อความข้อผิดพลาดก่อนการส่งฟอร์ม
        axios.post('http://localhost:3001/login', { ID, password })
        .then(result => {
            console.log(result);
            navigate('/dashboard');
        })
        .catch(err => {
            console.error(err);
            setErrorMessage('การเข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูลอีกครั้ง');
        });
    }

    return (
        <div className="container">
            <div className="content-login">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="number" 
                            placeholder="Student ID" 
                            required 
                            value={ID}
                            onChange={(e) => setID(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="รหัสผ่าน (6 ตัว)" 
                            maxLength="6" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>} 
                    
                    <button className="button-23" role="button" type="submit">LOGIN</button>
                    <div className="register-link">
                        <p>ยังไม่มีบัญชีใช่ไหม?<Link to="/signup"> สมัครสมาชิก</Link></p>
                        <Link to="/" className='link-home'>
                            <box-icon name='arrow-back' flip='vertical' color='#ffffff' size="lg"></box-icon>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
