
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: String, required: true },
    loanee: { type: String, required: true },
    dueDate : { type: Date, required: true },
    }, {
    timestamps: true // Optional: adds createdAt and updatedAt fields
});


module.exports = mongoose.model('Loan', loanSchema);