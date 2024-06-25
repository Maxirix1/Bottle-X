const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_no: String,
    name: String,
    id_card: String,
    tel: Number,
    race: String,
    religion: String,
    birthdateEN: String,
    birthdateTH: String,
    sex: String,
    picture: String,
    classroom_name: String,
    grade: Number,
    classroom: Number
});

const parentSchema = new mongoose.Schema({
    name: String,
    tel: Number
});

const semesterSchema = new mongoose.Schema({
    year: Number,
    term: Number
});

const addressSchema = new mongoose.Schema({
    full_address: String,
    addressNo: String,
    addressGroup: String,
    addressAlley: String,
    addressRoad: String,
    addressDistrict: String,
    addressSubDistrict: String,
    addressProvince: String,
    addressPostcode: String
});

const studentInfoSchema = new mongoose.Schema({
    student: studentSchema,
    parent: parentSchema,
    semester: semesterSchema,
    address: addressSchema
});

module.exports = mongoose.model('ExistingStudent', studentInfoSchema);
