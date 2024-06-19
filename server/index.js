const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const StudentModel = require('./models/Student');
const existingStudents = require('./studentsData'); // Import existing student data

const app = express();

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
        const newStudent = new StudentModel({ name, ID, password: hashedPassword });
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
        const student = await StudentModel.findOne({ ID: ID });

        if (!student) {
            return res.status(400).json({ message: 'Student ID หรือรหัสผ่านไม่ถูกต้อง' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Student ID หรือรหัสผ่านไม่ถูกต้อง' });
        }

        res.json({ message: 'Login successful', student: { name: student.name, ID: student.ID } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/user/:id', async (req, res) => {
    const userID = req.params.id;

    try {
        const user = await StudentModel.findOne({ ID: userID });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // ส่งข้อมูลผู้ใช้กลับไปยัง client
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} :)`);
});
