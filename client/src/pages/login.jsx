import React, { useState } from 'react';
import '../styles/login.css';
import '../styles/font.css';
import '../styles/system.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {


    return (
        <div className="container">
            <div className="content-login">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="number" 
                            placeholder="Student ID"
                            maxLength="5" 
                            required 
                            onChange={(e) => setID(e.target.value)} 
                        />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="รหัสผ่าน (6 ตัว)" 
                            maxLength="6" 
                            required 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>} 
                    
                    <button className="button-23" role="button" type="submit" onClick={handleClick}>LOGIN</button>
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
