const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const StudentModel = require('./models/Student');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Student");

app.post("/login", (req, res) => {
    const { ID, password } = req.body;
    StudentModel.findOne({ ID: ID })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("รหัสผ่านไม่ถูกต้อง");
                }
            } else {
                res.json("ไม่ข้อมูลในระบบ");
            }
        })
        .catch(err => res.json(err));
});

app.post('/signup', async (req, res) => {
    const { name, ID, password } = req.body;

    try {
        const existingName = await StudentModel.findOne({ name: name });
        const existingID = await StudentModel.findOne({ ID: ID });

        if (existingName && existingID) {
            return res.status(400).json({ message: 'ชื่อและ Student ID นี้ถูกใช้แล้ว' });
        } else if (existingName) {
            return res.status(400).json({ message: 'ชื่อนี้ถูกใช้แล้ว' });
        } else if (existingID) {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
