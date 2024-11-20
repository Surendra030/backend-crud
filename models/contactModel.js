const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);
