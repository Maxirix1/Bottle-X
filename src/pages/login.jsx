import React from 'react';
import '../styles/login.css';
import '../styles/font.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="container">
            <div className="content-login">
                <h2>LOGIN</h2>
                <form action="" method="GET">
                    <div className="input-box">
                        <input type="number" placeholder="Student ID" required />
                        {/* <i className='bx bxs-user' ></i> */}
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password (6 Digits)" maxLength="6" required />
                        {/* <i className='bx bxs-lock-alt' ></i> */}
                    </div>

                    <a href="#"><button className="button-23" role="button" type="submit">LOGIN</button></a>
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
