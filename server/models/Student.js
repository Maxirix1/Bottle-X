const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true 
    },
    ID: {
        type: Number,
        unique: true 
    },
    password: Number
})

const StudentModel = mongoose.model("Students", StudentSchema)
module.exports = StudentModel
