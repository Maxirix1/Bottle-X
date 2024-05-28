import React from 'react';
import '../styles/signup.css';
import '../styles/font.css';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="container">
            <div className="content-regis">
                <h2>Signup</h2>
                <form action="" method="GET">
                    <div className="input-box">
                        <input type="text" placeholder="ชื่อ-นามสกุล (ไทย)" required />
                    </div>

                    <div className="input-box">
                        <input type="number" placeholder="Student ID" maxLength="5" required />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="ตั้งรหัสผ่าน (เลข 6 ตัว)" maxLength="6" required />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="ยืนยันรหัสผ่าน (เลข 6 ตัว)" maxLength="6" required />
                    </div>

                    <a href="#"><button className="button-23" role="button" type="submit">SIGNUP</button></a>
                    <div className="register-link">
                        <p>มีบัญชีแล้วใช่ไหม?<Link to="/login"> เข้าสู่ระบบ</Link></p>

                        <Link to="/" className='link-home'>
                            <box-icon name='arrow-back' flip='vertical' color='#ffffff' size="lg"></box-icon>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
