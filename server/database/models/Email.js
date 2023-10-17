const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    jobCompany:{
        type: String,
        required: true
    },
    date:{
        type: Date
    }

});

const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;