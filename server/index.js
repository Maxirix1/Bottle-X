const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // เพิ่ม jwt module
const StudentModel = require('./models/Student');
const existingStudents = require('./studentsData'); // Import existing student data

const app = express();
const secretKey = '@fteracdes921115!!!@@@'; // เพิ่ม secret key

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Student");

app.post('/signup', async (req, res) => {
    const { name, ID, password } = req.body;

    try {
        // Check if ID and name match the existing student data
        const studentMatch = existingStudents.find(student => student.ID === parseInt(ID) && student.name === name);

        if (!studentMatch) {
            return res.status(400).json({ message: 'ID และชื่อไม่ตรงกัน' });
        }

        const existingStudent = await StudentModel.findOne({ ID: ID });

        if (existingStudent) {
            return res.status(400).json({ message: 'Student ID นี้ถูกใช้แล้ว' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new StudentModel({ 
            name, 
            ID, 
            password: hashedPassword,
            totalPoint: 0,    
            behavior: 0,   
            volunteer: 0   
        });

        await newStudent.save();
        res.json(newStudent);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});

app.post('/login', async (req, res) => {
    const { ID, password } = req.body;

    try {
        const student = await StudentModel.findOne({ ID: ID });

        if (!student) {
            return res.status(400).json({ message: 'Student ID ไม่ถูกต้อง' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign({ ID: student.ID }, secretKey, { expiresIn: '1h' }); // สร้าง token
        res.json({ token, student });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'ไม่มี token ใน headers' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey); // ตรวจสอบ token
        const student = await StudentModel.findOne({ ID: id });

        if (!student) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
        }

        res.json(student);

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'token ไม่ถูกต้องหรือหมดอายุ' });
    }
});



app.listen(3001, () => {
    console.log("SERVER IS RUNNING!");
});
