const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: String,
    bloodGroup: String,
    Country: {
        type: String,
        default: 'India'
    },
    district: String,
    email: String,
    emergency: Number,
    guardian: String,
    guardianName: String,
    idType: String,
    id: String,
    martialStatus: String,
    mobile: Number,
    nationality: String,
    occupation: String,
    pincode: Number,
    religion: String,
    state: String
})

module.exports = mongoose.model('Form', formSchema);