const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    ID: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true, default: Date.now },
    phone: { type: String, required: true },
    mobilePhone: { type: String, required: true },
});

module.exports = mongoose.model('Users', usersSchema);