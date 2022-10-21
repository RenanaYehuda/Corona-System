const mongoose = require('mongoose');

const coronaSchema = new mongoose.Schema({
    ID: { type: Number, required: true, unique: true },
    dateAndMaker: [{
        date: { type: Date },
        maker: { type: String },
    }],
    datePositiveRes: { type: Date },
    dateRecovery: { type: Date }
});



module.exports = mongoose.model('Corona', coronaSchema);