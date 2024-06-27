import React, { useState } from 'react';
import '../styles/signup.css';
import '../styles/font.css';
import '../styles/system.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [studentNo, setStudentNo] = useState('');
  const [idCard, setIdCard] = useState('');
  const [birthdateEN, setBirthdateEN] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูลที่กรอก
    if (password !== confirmPassword) {
      setErrorMessage('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        student_no: studentNo,
        id_card: idCard,
        birthdateEN: birthdateEN,
        password: password,
      });

      alert(response.data.message);
      navigate('/login'); // เปลี่ยนเส้นทางไปยังหน้า login หลังจากสมัครสำเร็จ
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'ข้อมูลไม่ถูกต้อง');
    }
  };

  return (
    <div className="container">
      <div className="content-regis">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="number"
              placeholder="Student ID"
              required
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="number"
              placeholder="เลขบัตรประชาชน 13 หลัก"
              required
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="วันเดือนปีเกิด (YYYY-MM-DD)"
              required
              value={birthdateEN}
              onChange={(e) => setBirthdateEN(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="ตั้งรหัสผ่าน (6 ตัว)"
              maxLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="ยืนยันรหัสผ่าน (6 ตัว)"
              maxLength="6"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="button-23" type="submit">SIGNUP</button>
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
