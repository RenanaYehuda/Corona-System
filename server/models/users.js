const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    ID: { type: Number, required: true, unique: true, minlength: 9, maxlength: 9 },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true, default: Date.now },
    phone: { type: String, required: true, minlength: 9, maxlength: 9 },
    mobilePhone: { type: String, required: true, minlength: 10, maxlength: 10 },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Users', usersSchema);