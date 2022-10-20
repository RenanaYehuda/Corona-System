const mongoose = require('mongoose');

const coronaSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    dateAndMaker: [{
        date: { type: Date, default: Date.now },
        maker: { type: String },
    }],
    datePositiveRes: { type: Date, default: Date.now },
    dateRecovery: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Corona', coronaSchema);