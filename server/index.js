const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const StudentModel = require('./models/Student');
const existingStudents = require('./studentsData');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Student");

app.post('/signup', async (req, res) => {
    const { name, ID, password } = req.body;

    try {
        const studentData = existingStudents.find(student => student.ID === parseInt(ID) && student.name === name);
        
        if (!studentData) {
            return res.status(400).json({ message: 'ชื่อและ Student ID ไม่ตรงกัน' });
        }

        const existingStudent = await StudentModel.findOne({ ID: ID });

        if (existingStudent) {
            return res.status(400).json({ message: 'Student ID นี้ถูกใช้แล้ว' });
        }

        const newStudent = new StudentModel({ name, ID, password });
        await newStudent.save();
        res.json(newStudent);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { ID, password } = req.body;

    try {
        const student = await StudentModel.findOne({ ID: ID, password: password });
        
        if (!student) {
            return res.status(400).json({ message: 'Student ID หรือรหัสผ่านไม่ถูกต้อง' });
        }
        
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
