const mongoose = require('mongoose');

const coronaSchema = new mongoose.Schema({
    ID: { type: Number, required: true, unique: true, minlength: 9, maxlength: 9 },
    dateAndMaker: [{
        date: { type: Date },
        maker: { type: String, enum: ['פייזר', 'מודרנה', 'אסטרהזניקה', 'נובהווקס'] },
    }],
    datePositiveRes: { type: Date },
    dateRecovery: { type: Date }
});



module.exports = mongoose.model('Corona', coronaSchema);