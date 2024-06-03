const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    ID: Number,
    password: Number
});

const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
