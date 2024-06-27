const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/dbStudents', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// สร้างโมเดล
const studentSchema = new mongoose.Schema({
  student_no: String,
  name: String,
  id_card: String,
  tel: String,
  race: String,
  religion: String,
  birthdateEN: String,
  birthdateTH: String,
  sex: String,
  picture: String,
  classroom_name: String,
  grade: Number,
  classroom: Number,
  parent: {
    name: String,
    tel: String,
  },
  semester: {
    year: Number,
    term: Number,
  },
  address: {
    full_address: String,
    addressNo: String,
    addressGroup: String,
    addressAlley: String,
    addressRoad: String,
    addressDistrict: String,
    addressSubDistrict: String,
    addressProvince: String,
    addressPostcode: String,
  }
});

const Student = mongoose.model('mainStudent', studentSchema);

// Route สำหรับการสมัครสมาชิก
app.post('/api/register', async (req, res) => {
  const { student_no, id_card, birthdateEN, password } = req.body;

  if (!student_no || !id_card || !birthdateEN || !password) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  try {
    // ตรวจสอบว่ามีนักเรียนที่มี student_no, id_card, และ birthdateEN ตรงกันทั้งหมดหรือไม่
    const existingStudent = await Student.findOne({ student_no, id_card, birthdateEN });

    if (existingStudent) {
      return res.status(400).json({ message: 'นักเรียนนี้ได้ลงทะเบียนแล้ว' });
    }

    // เพิ่มการเข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const newStudent = new Student({
      student_no,
      password: hashedPassword,
      // สามารถเพิ่มข้อมูลเพิ่มเติมของนักเรียนที่นี่ได้ตามต้องการ
    });

    await newStudent.save();

    res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ตั้งค่าให้เซิร์ฟเวอร์รับฟังการเชื่อมต่อที่ port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
