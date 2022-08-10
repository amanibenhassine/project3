const mongoose = require("mongoose");

const resettokenSchema = new mongoose.Schema({
    email: { type: String, required: true},
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});


module.exports = mongoose.model('passwordResetToken', resettokenSchema);