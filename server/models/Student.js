const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ID: { type: Number, required: true, unique: true },
    password: { type: String, required: true }
});

const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
